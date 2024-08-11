import React from "react";
import "./account.css";
import Detail from "./Detail";

const Account = ({ data, setReload, setBlur,country,state,blur }) => {
  const detail = [
    {
      id: 1,
      label: "Name",
      value: data.name,
      type: "name",
      edit: true,
      popup: false,
    },
    {
      id: 2,
      label: "Email",
      value: data.email,
      type: "email",
      edit: false,
      popup: false,
    },
    {
      id: 3,
      label: "Phone Number",
      value: data.phoneNumber,
      type: "phoneNumber",
      edit: true,
      popup: false,
    },
    {
      id: 4,
      label: "Address",
      value:  data.address ? `${data.address}, ${data.city}, ${data.state}, ${data.postalCode}, ${data.country}` : null ,
      type: "address",
      edit: true,
      popup: true,
    },
  ];

  return (
    <div className="accountContainer">
      <div className="accountWrapper">
        <Detail
          detail={detail}
          data={data}
          setReload={setReload}
          setBlur={setBlur}
          country={country}
          state={state}
          blur={blur}
        />
      </div>
    </div>
  );
};

export default Account;
