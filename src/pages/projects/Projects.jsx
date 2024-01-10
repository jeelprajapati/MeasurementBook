import React, { useEffect, useState } from "react";
import "./projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../../component/popup/Popup";
import useFetch from "../../hooks/useFetch";
import Projectcard from "../../component/projectCard/ProjectCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
  const [array, setArray] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const Id = localStorage.getItem("organizationId");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  });
  const { loding, data } = useFetch({
    url: `/Project?page=1&pageSize=50000&organizationId=${Id}`,
    change,
  });

  useEffect(() => {
    setLoad(true);
    setArray(data?.items.slice(0)?.reverse());
    setLoad(false);
  }, [data, loding]);

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
          <div className="rigth-content-wrapper">
            <div className="project-top">
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
            <div className="project-main">
              {!load && (
                <div
                  className={`box-container ${
                    array?.length >= 3 ? "grid" : "flexbox"
                  } ${inputType.credential && "blur"}`}
                >
                  <div
                    className="add-box"
                    onClick={() =>
                      setInputType({ type: "ADD", credential: true })
                    }
                  >
                    <div className="plus">+</div>
                  </div>
                  {array
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
              )}
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
