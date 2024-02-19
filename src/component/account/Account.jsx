import React from "react";
import "./account.css";
import Detail from "./Detail";

const Account = () => {
  const detail = [
    {
      id: 1,
      label: "Name",
      value: "Prajapati Jeel",
      edit: true,
    },
    {
      id: 2,
      label: "Email",
      value: "prajapatijeel115@gmail.com",
      edit: false,
    },
    {
      id: 3,
      label: "Phone Number",
      value: "+91 9876543210",
      edit: true,
    },
    {
      id: 4,
      label: "Address",
      value: null,
      edit: true,
    },
  ];
  return (
    <div className="accountContainer">
      <div className="accountWrapper">
        <Detail detail={detail}/>
      </div>
    </div>
  );
};

export default Account;
