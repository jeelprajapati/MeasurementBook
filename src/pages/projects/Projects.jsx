import React, { useEffect, useState } from "react";
import "./projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../../component/popup/Popup";
import Projectcard from "../../component/projectCard/ProjectCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import makeRequesInstance from "../../utils/makeRequest.js";
import { useAlert } from "react-alert";

const initialState = {
  id: "00000000-0000-0000-0000-000000000000",
  contractNo: "",
  contractDate: "",
  loiNo: "",
  loiDate: "",
  projectName: "",
  contractValidity: "",
  clientId: "",
  projectValue: 0,
  executedValue: 0,
};

const Projects = () => {
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [initialValues, setInitialValues] = useState(initialState);
  const [change, setChange] = useState(0);
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const alert=useAlert();

  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const getData = async () => {
      const makeRequest = makeRequesInstance(localStorage.getItem("token"));
      try {
        const res = await makeRequest.get(
          `/Project?page=1&pageSize=${page*7}&organizationId=${Id}`
        );
        if (res.status === 200) {
          setData(res.data.items);
        }
      } catch (error) {
        alert.show("something went wrong!", { type: "info" });
      }
    };
    getData();
  }, [alert, page, Id,change]);

  const handleInfinityScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight <= clientHeight + scrollTop + 1) {
      setPage((prev) => prev + 1);
    }
  };


  // const handleDelete=async(id)=>{
  //   try {
  //     const res=await makeRequest.delete(`/Project/${id}?organizationId=${Id}`);
  //     if(res.status===200){
  //       alert('Project Deleted Sucessfully',{type:'sucess'})
  //     }
  //   } catch (error) {
  //      alert('First Delete This project related data',{type:'info'})
  //   }
  // }

  return (
    <div>
      <div className="projectContainer">
        <div className="projectLeft">
          <Sidebar id={2} />
        </div>
        <div className="projectRight" onScroll={handleInfinityScroll}>
          <div className="projectContentWrapper">
            <div className="projectTop">
              <div className={`${inputType.credential ? "path blur" : "path"}`}>
                Projects/
              </div>
              <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                  type="text"
                  placeholder="Search By Project Name .."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="projectMain">
              {
                <div
                  className={`boxContainer ${
                    data?.length >= 3 ? "grid" : "flexbox"
                  } ${inputType.credential && "blur"}`}
                >
                  <div
                    className="addBox"
                    onClick={() =>
                      setInputType({ type: "ADD", credential: true })
                    }
                  >
                    <div className="plus">+</div>
                  </div>
                  {data
                    ?.filter((item) =>
                      item?.projectName
                        ?.toUpperCase()
                        .includes(search?.toUpperCase())
                    )
                    ?.map((item) => (
                      <Projectcard
                        item={item}
                        key={item?.id}
                        setInitialValues={setInitialValues}
                        setInputType={setInputType}
                      />
                    ))}
                </div>
              }
            </div>
          </div>
          {inputType.credential && (
            <Popup
              setInputType={setInputType}
              initialState={initialState}
              setChange={setChange}
              change={change}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              inputType={inputType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
