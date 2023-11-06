import React, { useState } from "react";
import "./Sidebar.css";
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
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/slice/sidebarSlice";

const Sidebar = ({ id }) => {
  const open = useSelector((state) => state.sidebar.open);
  const dispatch=useDispatch();
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
    <div className={`sidebar-main-container ${open ? "side-container" : "side-less-container"}`}>
      <div className="sidebar-toggle" onClick={()=>dispatch(setOpen())}>
        <span className="sidebar-toggle-icon">
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </span>
      </div>
      <ul className={`sidebar-ul ${open ? "centered" : ""}`}>
        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} className="link">
            <li className={`${id === item.id ? "lightGray" : "hover-li"}`}>
              <span className={`sidebar-svg ${id === item.id && "selected"}`}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className={`${open ? "sidebar-name" : "d-none"} ${id === item.id && "selected"}`}>
                {open && item.text}
              </span>
              {!open && <span className="hover-show-name ">{item.text}</span>}
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
            <span className={`${open ? "sidebar-name" : "d-none"}`}>
              {open && 'LogOut'}
            </span>
            {!open && <span className="hover-show-name ">LogOut</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
