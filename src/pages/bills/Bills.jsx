import React, { useEffect, useState } from "react";
import "./bills.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Billpopup from "../../component/billPopup/BillPopup.jsx";
import { useLocation } from "react-router-dom";
import Billcard from "../../component/billCard/BillCard.jsx";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import { billInitialState } from "../../constants/initialState.js";
import { getBills } from "../../actions/bill.js";
import useRedirect from "../../hooks/useRedirect.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";

const Bills = () => {
  const search = new URLSearchParams(useLocation()?.search);
  const projectId = search?.get("projectId");
  const [data, setData] = useState([]);
  const projectName = search?.get("projectName");
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [initialValues, setInitialValues] = useState(billInitialState);
  const [change, setChange] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { handleInfinityScroll, page } = useInfinityScroll();
  //redirect to login when token and organizationId is Not exist
  useRedirect();

  useEffect(() => {
    getBills(page, projectId, (data) => {
      setData(data.items);
      if (data.items?.length < data?.totalCount) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  }, [page, projectId, change]);

  return (
    <div>
      <div className="billMainContainer">
        <div className="billLeft">
          <Sidebar id={2} />
        </div>
        <div
          className="billRight"
          onScroll={(e) => hasMore && handleInfinityScroll(e)}
        >
          <div className="rightContentWrapper">
            <div className={`billTop ${inputType?.credential && "blur"}`}>
              <BreadCrumbs type={"bill"} />
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
              initialState={billInitialState}
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
