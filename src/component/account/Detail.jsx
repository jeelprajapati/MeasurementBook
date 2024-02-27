import React, { useEffect, useRef, useState } from "react";
import "./account.css";
import { updateUserInfo } from "../../actions/account.js";
import toast from "react-hot-toast";

const Detail = ({ detail, data, setReload }) => {
  const [detailId, setDetailId] = useState(0);
  const [values, setValues] = useState({});
  const [change, setChange] = useState(0);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  //focus on input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [detailId]);

  useEffect(() => {
    const handleValues = () => {
      const { id, email, state, country, userType, organizations, ...other } =
        data;
      setValues(other);
    };
    handleValues();
  }, [data, change]);

  const handleEdit = (id) => {
    setDetailId(id);
  };

  console.log(values);

  const handleChange = (e) => {
    const value = e.target.value;
    if (error) {
      setError(false);
    }

    //check number only for phone Number
    if (e.target.name === "phoneNumber") {
      const regex = /^\d+$/;
      console.log(value.substring(value.length - 1));
      if (!regex.test(value.substring(value.length - 1)) && value !== "") {
        return;
      }
    }

    setValues((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleClose = () => {
    setDetailId(0);
    setChange((prev) => !prev);
    setError(false);
  };

  const handleSave = (type) => {
    if (values.name === "" || !values) {
      setError(true);
      return;
    }
    updateUserInfo(values, () => {
      toast.success(`${type} Saved Successfully`);
      setReload((prev) => !prev);
      handleClose();
    });
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
                      ref={inputRef}
                      name={item.type}
                      className={`detailInput ${error && "detailWarning"}`}
                      onChange={handleChange}
                      value={values[item.type] ? values[item.type] : ""}
                    />
                    <div className="detailButtons">
                      <button
                        className="save"
                        onClick={() => handleSave(item.label)}
                      >
                        Save
                      </button>
                      <button className="detailCancel" onClick={handleClose}>
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
