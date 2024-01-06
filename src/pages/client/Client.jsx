import React, { useEffect, useState } from "react";
import "./client.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import ClientTable from "../../component/clientTable/ClientTable.jsx";
import ClientPopUp from "../../component/clientPopup/ClientPopup.jsx";
import { useNavigate } from "react-router-dom";
import makeRequesInstance from "../../utils/makeRequest.js";
const initialState = {
  id:"00000000-0000-0000-0000-000000000000",
  name: "",
  email: "",
  phoneNumber: "",
  gstin: "",
  pan: "",
  address: "",
  city: "",
  countryId:"",
  stateId:"",
  postalCode: "",
};
const Client = () => {
  const [input, setInput] = useState({type:"",credential:false});
  const [item, setItem] = useState(initialState);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();
  const Id = localStorage.getItem("organizationId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!(token && Id)) {
      navigate("/login");
    }
  }, [navigate, token, Id]);

  useEffect(() => {
    const getCountry = async () => {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get("/Standard/GetCountries");
        if(res.status===200){
          setCountry(res.data);
        }
    };
    const getStates = async () => {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get("/Standard/GetStates");
        if(res.status===200){
          setState(res.data);
        }
    };
    getCountry();
    getStates();
  }, []);

  return (
    <div>
      <div className="client-main-container">
        <div className="client-left">
          <Sidebar id={3} />
        </div>
        <div className="client-right">
          <div className="client-top">
            <div className={`${input?.credential ? "client-path blur" : "client-path"}`}>
              Clients/
            </div>
          </div>
          <div className={`${input?.credential ? "client-main blur" : "client-main"}`}>
            <h2 className={`${input?.credential ? "client-title blur" : "client-title"}`}>
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
                initialState={initialState}
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
