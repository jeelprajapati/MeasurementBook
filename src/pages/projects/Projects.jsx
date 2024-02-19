import React, { useEffect, useState } from "react";
import "./projects.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import Popup from "../../component/popup/Popup";
import Projectcard from "../../component/projectCard/ProjectCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import { projectInitialState } from "../../constants/initialState.js";
import { getProjects } from "../../actions/project.js";
import useRedirect from "../../hooks/useRedirect.js";
import useInfinityScroll from "../../hooks/useInfinityScroll.js";

const Projects = () => {
  const [inputType, setInputType] = useState({ type: "", credential: false });
  const [initialValues, setInitialValues] = useState(projectInitialState);
  const [change, setChange] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const Id = localStorage.getItem("organizationId");
  const { handleInfinityScroll, page } = useInfinityScroll();
  //redirect to login when token and organizationId is Not exist
  useRedirect();

  useEffect(() => {
    getProjects(Id, page, (data) => {
      setData(data.items);
      if (data.items?.length < data?.totalCount) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  }, [page, Id, change]);

  return (
    <div>
      <div className="projectContainer">
        <div className="projectLeft">
          <Sidebar id={2} />
        </div>
        <div
          className="projectRight"
          onScroll={(e) => hasMore && handleInfinityScroll(e)}
        >
          <div className="projectContentWrapper">
            <div className="projectTop">
              <BreadCrumbs type={"project"} />
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
              initialState={projectInitialState}
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
