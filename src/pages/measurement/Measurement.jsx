import React, { useState } from "react";
import "./Measurement.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Measure from "../../component/measureBookTable/Measure";
import { Link, useLocation } from "react-router-dom";
const Measurement = () => {
  const location = useLocation().search.split("?");
  const projectname = location[3]?.split("=")[1];
  const projectId = location[2]?.split("=")[1];
  const billname = location[4]?.split("=")[1];
  return (
    <div>
      <div className="measurement-main-container">
        <div className="measurement-left">
          <Sidebar id={2} />
        </div>
        <div className="measurement-right">
          <div className='measurement-con'>
            <div className="measurement-path">
              <Link to={`/project`} className="bill-link">
                PROJECT/
              </Link>
              <Link to={`/project/${projectId}`} className="bill-link">
                {projectname.toUpperCase()}{" "}
              </Link>{" "}
              /
              <Link
                to={`/bills?projectid=${projectId}?projectname=${projectname}`}
                className="bill-link"
              >
                BILLS/
              </Link>{" "}
              <span>{billname.toUpperCase()}</span>
            </div>
            <h3 className="measurement-title">Measurement Books</h3>
            <div className="types-con">
              <div className="type">MeasurementBook</div>
              <div className="type">R/F Steel MeasurementBook</div>
              <div className="type">Structural Steel MeasurementBook</div>
            </div>
            <Measure/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;
