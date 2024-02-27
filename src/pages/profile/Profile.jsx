import React, { useEffect, useState } from "react";
import "./profile.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import useRedirect from "../../hooks/useRedirect.js";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import Account from "../../component/account/Account.jsx";
import ChangePassword from "../../component/changePassword/ChangePassword.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingNgo,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getOrganization } from "../../actions/account.js";

const listItems = [
  {
    id: 1,
    label: "Your Account",
    icon: faUser,
  },
  {
    id: 2,
    label: "Change Password",
    icon: faLock,
  },
  {
    id: 3,
    label: "Your Organization",
    icon: faBuildingNgo,
  },
];

const Profile = () => {
  const [data, setData] = useState({});
  const [reload,setReload]=useState(0);
  useRedirect();

  const [type, setType] = useState(1);

  useEffect(() => {
    getOrganization(localStorage.getItem("token"), (data) => {
      setData(data);
    });
  }, [reload]);

  return (
    <div className="profileContainer">
      <div className="profileLeft">
        <Sidebar id={5} />
      </div>
      <div className="profileRight">
        <div className="profileTop">
          <BreadCrumbs type={"profile"} />
        </div>
        <div className="profileFooter">
          <div className="profileTitle">
            <span>Settings</span>
          </div>
          <div className="profileWrapper">
            <div className="profileList">
              {listItems.map((item) => (
                <div
                  className={`profileItem ${
                    type === item.id
                      ? "profileListSelected"
                      : "profileItemHover"
                  }`}
                  onClick={() => setType(item.id)}
                  key={item.id}
                >
                  <span className="profileLabelIcon">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span className="profileLabel">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="profileComponent">
              {type === 1 && <Account data={data} setReload={setReload} />}
              {type === 2 && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
