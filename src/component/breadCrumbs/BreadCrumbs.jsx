import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadCrumbs.css";

const BreadCrumbs = ({ type }) => {
  const search = new URLSearchParams(useLocation().search);
  const path = {
    project: [{ name: "Projects", to: null }],
    conractItem: [
      { name: "Projects", to: "/project" },
      { name: search.get("projectName"), to: null },
    ],
    bill: [
      { name: "Projects", to: "/project" },
      {
        name: search?.get("projectName"),
        to: `/project/${search?.get("projectId")}?projectName=${search?.get("projectName")}`,
      },
      { name: "Bills", to: null },
    ],
    measurementBook: [
      { name: "Projects", to: "/project" },
      {
        name: search?.get("projectName"),
        to: `/project/${search?.get("projectId")}?projectName=${search?.get("projectName")}`,
      },
      {
        name: "Bills",
        to: `/bills?projectId=${search?.get("projectId")}&projectName=${search?.get("projectName")}`,
      },
      { name: search?.get("billName"), to: null },
    ],
    client: [{ name: "Clients", to: null }],
  };
  return (
    <div className="breadCrumbContainer">
      {path[type]?.map((item,index) =>
        item?.to ? (
          <Link className="breadCrumbLink" to={item.to} key={index}>
            {item.name}
          </Link>
        ) : (
          <span className="breadCrumbSpan" key={index}>{item.name}</span>
        )
      )}
    </div>
  );
};

export default BreadCrumbs;
