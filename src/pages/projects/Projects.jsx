import React, { useEffect, useState } from "react";
import "./Projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import Popup from "../../component/popup/Popup";
import useFetch from "../../hooks/useFetch";
import Search from "../../image/search.svg";
import Pagination from "../../component/pagination/Pagination";
import Projectcard from "../../component/projectCard/Projectcard";

const Projects = () => {
  const [popUp, setPopUp] = useState(false);
  const [change, setChange] = useState(0);
  const token = localStorage.getItem("token");
  const [array, setArray] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [allPage, setAllPage] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterArr, setFilterArr] = useState([]);
  
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
    setFilterArr(data?.items.slice(0)?.reverse());
    setAllPage(Math.ceil((data?.items?.length + 1) / 21));
    setLoad(false);
  }, [data, loding]);

  useEffect(() => {
    setLoad(true);
    setFilterArr(
      array?.filter((e) =>
        e?.projectName.toUpperCase().includes(search.toUpperCase())
      )
    );
    setAllPage(
      Math.ceil(
        (array?.filter((e) =>
          e?.projectName.toUpperCase().includes(search.toUpperCase())
        ).length +
          1) /
          21
      )
    );
    setLoad(false);
  }, [search, array]);
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

  console.log(filterArr, search);
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
              <img src={Search} style={{ padding: "0 6px" }} alt="" />
              <input
                type="text"
                placeholder="Search"
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
              {!load &&
                (page === 1
                  ? filterArr
                      ?.slice(0, page * 9)
                      .map((item) => <Projectcard key={item?.id} item={item} />)
                  : filterArr
                      ?.slice((page - 1) * 10, page * 10)
                      ?.map((item) => (
                        <Projectcard key={item?.id} item={item} />
                      )))}
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
          <div className="pagination">
            <Pagination page={page} setPage={setPage} allPage={allPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
