import React, { useEffect, useState } from "react";
import "./client.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import ClientTable from "../../component/clientTable/ClientTable.jsx";
import ClientPopUp from "../../component/clientPopup/ClientPopup.jsx";
import BreadCrumbs from "../../component/breadCrumbs/BreadCrumbs.jsx";
import { clientInitialState } from "../../constants/initialState.js";
import { getCountry, getState } from "../../actions/standard.js";
import useRedirect from "../../hooks/useRedirect.js";

const Client = () => {
  const [input, setInput] = useState({ type: "", credential: false });
  const [item, setItem] = useState(clientInitialState);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [change, setChange] = useState(0);
  //redirect to login when token and organizationId is Not exist
  useRedirect();

  useEffect(() => {
    getCountry((data)=>{
      setCountry(data);
    })
    getState((data)=>{
      setState(data);
    })
  }, []);

  return (
    <div>
      <div className="clientMainContainer">
        <div className="clientLeft">
          <Sidebar id={3} />
        </div>
        <div className="clientRight">
          <div className="clientTop">
            <BreadCrumbs type={"client"} />
          </div>
          <div
            className={`${
              input?.credential ? "clientMain blur" : "clientMain"
            }`}
          >
            <h2
              className={`${
                input?.credential ? "clientTitle blur" : "clientTitle"
              }`}
            >
              Clients
            </h2>
            <ClientTable
              setInput={setInput}
              change={change}
              setItem={setItem}
              setChange={setChange}
              country={country}
              state={state}
            />
          </div>
          {input?.credential && (
            <div className="clientpopup">
              <ClientPopUp
                initialState={clientInitialState}
                setInput={setInput}
                change={change}
                setChange={setChange}
                setItem={setItem}
                item={item}
                country={country}
                state={state}
                input={input}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Client;
