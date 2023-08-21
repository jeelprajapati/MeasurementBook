import React, { useEffect, useState } from "react";
import "./Projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../component/popup/Popup";
import useFetch from "../../hooks/useFetch";
// import makeRequesInstance from "../../makeRequest";
// import { useAlert } from "react-alert";

const Projects = () => {
  const [popUp, setPopUp] = useState(false);
  const [change, setChange] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const makeRequest=makeRequesInstance(localStorage.getItem('token'));
  // const alert=useAlert();
  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  });
  const { loding, error, data } = useFetch({
    url: `/Project?page=1&pageSize=100&organizationId=${Id}`,
    change,
  });
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
          <div className={`${popUp ? "path blur" : "path"}`}>PROJECT/</div>
          <h3 className={`${popUp ? "pro-title blur" : "pro-title"}`}>
            Projects
          </h3>
          <div className={`${popUp ? "box-container blur" : "box-container"}`}>
            <div className="add-box" onClick={handlePopUp}>
              <div className="plus">+</div>
            </div>
            {!loding &&
              data?.items.map((item, index) => (
                <Link to={`/project/${item.id}`} className="link">
                  <div className={`${index === 0 ? "box green" : "box"}`}>
                    <div className="c-name">{item.projectName}</div>
                  </div>
                </Link>
              ))}
          </div>

          {popUp && (
            <div className="popup">
              <Popup
                setPopUp={setPopUp}
                input={{contractNo:'',contractDate:'',loiNo:'',loiDate:'',projectName:'',contractValidity:'',workCompletion:'',clientId:''}}
                setChange={setChange}
                change={change}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
