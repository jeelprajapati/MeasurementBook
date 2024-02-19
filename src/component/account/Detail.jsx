import React, { useState } from "react";
import "./account.css";

const Detail = ({ detail }) => {
  const [detailId, setDetailId] = useState(0);
  const handleEdit = (id) => {
    setDetailId(id);
  };
  return (
    <>
      <div className="detailMainContainer">
        <div className="detailTitle">
          <span>Your Account</span>
        </div>
        {detail.map((item) => (
          <div className="detailContainer" key={item.id}>
            <div className="detailFlex">
              <div className="detailLabel">
                <span>{item.label}</span>
              </div>
              <div className="detailWrapper">
                {detailId !== item.id ? (
                  <>
                    <div className="detailValue">
                      <span>{item.value ? item.value : "No Item Yet"}</span>
                    </div>
                    {item.edit && (
                      <div className="detailButton">
                        <button onClick={() => handleEdit(item.id)}>
                          Edit
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={item.value}
                      className="detailInput"
                    />
                    <div className="detailButtons">
                      <button className="save">Save</button>
                      <button
                        className="detailCancel"
                        onClick={() => setDetailId(0)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="line"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Detail;
