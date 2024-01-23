import React, { useEffect, useState } from "react";
import "./bills.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Billpopup from "../../component/billPopup/BillPopup.jsx";
import { Link, useLocation } from "react-router-dom";
import Billcard from "../../component/billCard/BillCard.jsx";
import makeRequesInstance from "../../utils/makeRequest.js";
import { useAlert } from "react-alert";
const initialState = {
  id: "00000000-0000-0000-0000-000000000000",
  invoiceNo: "INV-2023080428",
  name: "",
  invoiceDate: "",
  typeBill: "",
  status: "",
  invoiceValue: 0,
};

const Bills = () => {
  const search = new URLSearchParams(useLocation()?.search);
  const projectId = search?.get("projectid");
  const [data, setData] = useState([]);
  const projectName = search?.get("projectname");
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [initialValues, setInitialValues] = useState(initialState);
  const [page, setPage] = useState(1);
  const [change, setChange] = useState(0);
  const alert = useAlert();

  useEffect(() => {
    const getData = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      try {
        const res = await makeRequest.get(
          `/Bill/GetByProjectId?page=${1}&pageSize=${
            page * 7
          }&projectId=${projectId}`
        );
        if (res.status === 200) {
          setData(res.data.items);
        }
      } catch (error) {
        alert.show("something went wrong!", { type: "info" });
      }
    };
    getData();
  }, [alert, page, projectId,change]);

  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= clientHeight + scrollTop + 1) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className="billMainContainer">
        <div className="billLeft">
          <Sidebar id={2} />
        </div>
        <div className="billRight" onScroll={handleInfinityScroll}>
          <div className="rightContentWrapper">
            <div className={`billTop ${inputType?.credential && "blur"}`}>
              <div className="billPath">
                <Link to={`/project`} className="billLink">
                  Projects
                </Link>
                /
                <Link to={`/project/${projectId}`} className="billLink">
                  {projectName[0]?.toUpperCase() + projectName?.slice(1)} /{" "}
                </Link>{" "}
                <span>Bills</span>
              </div>
            </div>

            {
              <div className={`billMiddle ${inputType?.credential && "blur"}`}>
                <div
                  className={`billWrapper  ${
                    data?.length >= 3 ? "grid" : "flexbox"
                  }`}
                >
                  <div
                    className="addCard"
                    onClick={() =>
                      setInputType({ type: "ADD", credential: true })
                    }
                  >
                    +
                  </div>
                  {data?.map((item) => (
                    <Billcard
                      key={item?.id}
                      setInputType={setInputType}
                      setInitialValues={setInitialValues}
                      item={item}
                      projectName={projectName}
                      projectId={projectId}
                    />
                  ))}
                </div>
              </div>
            }
          </div>

          {inputType?.credential && (
            <Billpopup
              setInputType={setInputType}
              setInitialValues={setInitialValues}
              initialValues={initialValues}
              initialState={initialState}
              setChange={setChange}
              change={change}
              inputType={inputType}
              projectId={projectId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;
