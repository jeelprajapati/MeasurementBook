import React, { useContext, useState } from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLayerGroup,
  faUsers,
  faBook,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";

const Sidebar = ({ id }) => {
  const { state, toggle } = useContext(Context);
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("organizationId");
    navigate("/login");
  };

  const menuItems = [
    { id: 1, icon: faHome, text: "Dashboard", path: "/" },
    { id: 2, icon: faLayerGroup, text: "Projects", path: "/project" },
    { id: 3, icon: faUsers, text: "Clients", path: "/client" },
    { id: 4, icon: faBook, text: "Tutorials", path: "/" },
  ];

  return (
    <div
      className={`sidebar-main-container ${
        state ? "side-container" : "side-less-container"
      }`}
    >
      <div className="sidebar-toggle" onClick={toggle}>
        <span className="sidebar-toggle-icon">
          <FontAwesomeIcon icon={state ? faTimes : faBars} />
        </span>
      </div>
      <ul className={`sidebar-ul ${state ? "centered" : ""}`}>
        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} className="link">
            <li className={`${id === item.id ? "lightGray" : "hover-li"}`}>
              <span className={`sidebar-svg ${id === item.id && "selected"}`}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span
                className={`${state ? "sidebar-name" : "d-none"} ${
                  id === item.id && "selected"
                }`}
              >
                {state && item.text}
              </span>
              {!state && <span className="hover-show-name ">{item.text}</span>}
            </li>
          </Link>
        ))}
      </ul>
      {token && (
        <div className="logout-container">
          <div className="logout" onClick={handleLogout}>
            <span className="sidebar-svg">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
            <span className={`${state ? "sidebar-name" : "d-none"}`}>
              {state && "LogOut"}
            </span>
            {!state && <span className="hover-show-name ">LogOut</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
