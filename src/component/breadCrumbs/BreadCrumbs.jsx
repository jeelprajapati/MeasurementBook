import React from "react";
import { Link } from "react-router-dom";
import "./breadCrumbs.css"

const BreadCrumbs = ({ pathData }) => {
  return (
    <div className="breadCrumbContainer">
      {pathData.map((item) =>
        item?.to ? (
          <Link className="breadCrumbLink" to={item.to}>{item.name}</Link>
        ) : (
          <span className="breadCrumbSpan">{item.name}</span>
        )
      )}
    </div>
  );
};

export default BreadCrumbs;
