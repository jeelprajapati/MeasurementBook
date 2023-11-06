import React, { useEffect, useState } from "react";
import "./Projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../../component/popup/Popup";
import useFetch from "../../hooks/useFetch";
import Projectcard from "../../component/projectCard/Projectcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [popUp, setPopUp] = useState(false);
  const [change, setChange] = useState(0);
  const token = localStorage.getItem("token");
  const [array, setArray] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  
  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  });
  const { loding, data } = useFetch({
    url: `/Project?page=1&pageSize=100&organizationId=${Id}`,
    change,
  });

  useEffect(() => {
    setLoad(true);
    setArray(data?.items.slice(0)?.reverse());
    setLoad(false);
  }, [data, loding]);

  const handlePopUp = (e) => {
    e.preventDefault();
    setPopUp(true);
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
      <div className="pro-container">
        <div className="pro-left">
          <Sidebar id={2} />
        </div>
        <div className="pro-right">
          <div className="project-top">
            <div className={`${popUp ? "path blur" : "path"}`}>Projects/</div>
            <div className="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                type="text"
                placeholder="Search By Project Name.."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="project-main">
            <div
              className={`${popUp ? "box-container blur" : "box-container"}`}
            >
              <div className="add-box" onClick={handlePopUp}>
                <div className="plus">+</div>
              </div>
              {!load && array?.filter((item)=>(item?.projectName?.toUpperCase().includes(search?.toUpperCase())))?.map((item)=>(<Projectcard item={item} key={item?.id}/>))}
                
            </div>
          </div>
          {popUp && (
            <div className="popup">
              <Popup
                setPopUp={setPopUp}
                input={{
                  contractNo: "",
                  contractDate: "",
                  loiNo: "",
                  loiDate: "",
                  projectName: "",
                  contractValidity: "",
                  clientId: "",
                }}
                setChange={setChange}
                change={change}
                update={update}
                setUpdate={setUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
