import React, { useEffect, useState } from "react";
import "./client.css";
import Sidebar from "../../component/sidebar/Sidebar.jsx";
import ClientTable from "../../component/clientTable/ClientTable.jsx";
import ClientPopUp from "../../component/clientPopup/ClientPopup.jsx";
import { useNavigate } from "react-router-dom";
import makeRequesInstance from "../../utils/makeRequest.js";
const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  gstin: "",
  pan: "",
  address: "",
  city: "",
  countryId: "",
  stateId: "",
  postalCode: "",
};
const Client = () => {
  const [input, setInput] = useState(false);
  const [item, setItem] = useState(initialState);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [update, setUpdate] = useState(false);
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
      try {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get("/Standard/GetCountries");
        setCountry(res.data);
      } catch (error) {
        if (error.response) {
          alert.show(error.response.data.title, { type: "error" });
        } else {
          alert.show("something went wrong", { type: "info" });
        }
      }
    };
    const getStates = async () => {
      try {
        const makeRequest = makeRequesInstance(localStorage.getItem("token"));
        const res = await makeRequest.get("/Standard/GetStates");
        setState(res.data);
      } catch (error) {
        if (error.response) {
          alert.show(error.response.data.title, { type: "error" });
        } else {
          alert.show("something went wrong", { type: "info" });
        }
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
            <div className={`${input ? "client-path blur" : "client-path"}`}>
              Clients/
            </div>
          </div>
          <div className={`${input ? "client-main blur" : "client-main"}`}>
            <h2 className={`${input ? "client-title blur" : "client-title"}`}>
              Clients
            </h2>
            <ClientTable
              setInput={setInput}
              change={change}
              setItem={setItem}
              setUpdate={setUpdate}
              setChange={setChange}
              country={country}
              state={state}
            />
          </div>
          {input && (
            <div className="clientpopup">
              <ClientPopUp
                initialState={initialState}
                setInput={setInput}
                change={change}
                setChange={setChange}
                setItem={setItem}
                item={item}
                setUpdate={setUpdate}
                update={update}
                country={country}
                state={state}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Client;
