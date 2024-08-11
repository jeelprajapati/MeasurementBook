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
import { getCountry, getState } from "../../actions/standard.js";

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
  const [reload, setReload] = useState(0);
  const [blur, setBlur] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  useRedirect();

  const [type, setType] = useState(1);

  useEffect(() => {
    getOrganization(localStorage.getItem("token"), (data) => {
      setData(data);
    });
  }, [reload]);

  useEffect(() => {
    getCountry((data) => {
      setCountry(data);
    });
    getState((data) => {
      setState(data);
    });
  }, []);

  const handleType=(id)=>{
    setType(id);
    setBlur(false);
  }

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
          <div className={`profileTitle ${blur && "profileBlur"}`}>
            <span>Settings</span>
          </div>
          <div className="profileWrapper">
            <div className={`profileList ${blur && "profileBlur"}`}>
              {listItems.map((item) => (
                <div
                  key={item.id}
                  className={`profileItem ${
                    type === item.id
                      ? "profileListSelected"
                      : "profileItemHover"
                  }`}
                  onClick={() => handleType(item.id)}
                >
                  <span className="profileLabelIcon">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span className="profileLabel">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="profileComponent">
              {type === 1 && (
                <Account
                  data={data}
                  setReload={setReload}
                  setBlur={setBlur}
                  country={country}
                  state={state}
                  blur={blur}
                />
              )}
              {type === 2 && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
