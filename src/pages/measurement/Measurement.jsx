import React from "react";
import "./Measurement.css";
import Sidebar from "../../component/sidebar/Sidebar";
import Measure from "../../component/measureBookTable/Measure";
import { Link, useLocation } from "react-router-dom";
const Measurement = () => {
  const location = useLocation().search.split("?");
  const projectname = location[3]?.split("=")[1].replaceAll('%20',' ');
  const projectId = location[2]?.split("=")[1];
  const billname = location[4]?.split("=")[1].replaceAll('%20',' ');
  return (
    <div>
      <div className="measurement-main-container">
        <div className="measurement-left">
          <Sidebar id={2} />
        </div>
        <div className="measurement-right">
            <div className="measurement-top">
              <div className="measurement-path">
                <Link to={`/project`} className="bill-link">
                  Projects/
                </Link>
                <Link to={`/project/${projectId}`} className="bill-link">
                  {projectname[0].toUpperCase()+projectname.slice(1)}{" "}
                </Link>
                /
                <Link
                  to={`/bills?projectid=${projectId}?projectname=${projectname}`}
                  className="bill-link"
                >
                  Bills/
                </Link>
                <span>{billname[0].toUpperCase()+billname.slice(1)}</span>
              </div>
            </div>
            <div className="measurement-middle">
              <div className="types-con">
                <div className="type">MeasurementBook</div>
                <div className="type">R/F Steel MeasurementBook</div>
                <div className="type">Structural Steel MeasurementBook</div>
              </div>
            </div>
            <div className="measurement-footer">
              <Measure />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Measurement;
