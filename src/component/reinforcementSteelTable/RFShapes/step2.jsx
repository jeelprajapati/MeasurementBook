import React, { useState } from "react";
import { ReactComponent as InfoIcon } from "../../../assets/image/icons8-info.svg?react";
import { UncontrolledTooltip } from "reactstrap";

const Step2 = (props) => {
  let {
    item,
    shapeData,
    selectedImageId,
    handleBack,
    dispatch,
    hanldeLastStep,
  } = props;
  let selectedShape = shapeData?.find((x) => x.id === selectedImageId);
  const [cuttingLength, setCuttingLength] = useState(null);
  const [formValues, setFormValues] = useState({});

  function dynamicFn(numberOfArgs, functionReturnFormula, formValues) {
    let argsParameter = Array.from({ length: numberOfArgs }).map((_, index) => {
      return `L${index + 1}`;
    });

    argsParameter.push("DiameterBar");
    argsParameter = argsParameter.join(",");
    console.log("args", argsParameter);
    let func = `(function calculate(${argsParameter}){
      return ${functionReturnFormula};
    })(${formValues.join(",")})`;
    let answer = eval(func);
    console.log("Function", func);
    console.log("FormValues", formValues);
    dispatch({
      type: "CHANGE_NUMBER",
      payload: { name: "cuttingLength", value: answer },
    });
    dispatch({
      type: "CHANGE_TEXT",
      payload: { name: "rfShapeId", value: selectedImageId },
    });
    dispatch({
      type: "CHANGE_NUMBER",
      payload: {
        name: "diameterBar",
        value: formValues[formValues.length - 1],
      },
    });
    dispatch({
      type: "CHANGE_TEXT",
      payload: { name: "shapeImagePath", value: selectedShape?.imagePath },
    });
    formValues.pop();
    formValues.forEach((e, index) => {
      dispatch({
        type: "CHANGE_NUMBER",
        payload: { name: `l${index + 1}`, value: e },
      });
    });
    hanldeLastStep();
  }
  const handleOnChange = (e) => {
    setFormValues((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e, numberOfArgs, formula) => {
    try {
      e.preventDefault();
      let args = Array.from({ length: numberOfArgs }).map((_, index) => {
        return formValues[`L${index + 1}`];
      });
      args.push(formValues.diameter);
      dynamicFn(numberOfArgs, formula, args);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setFormValues({});
    setCuttingLength(null);
    handleBack();
  };

  return (
    <form className="step2-form p-4">
      <div className="header-section">
        <div className="image">
          <img
            alt="img shape"
            width={200}
            height={200}
            src={`${process.env.REACT_APP_STATIC_URL}/${selectedShape?.imagePath}`}
          />
        </div>
        <div className="input-section">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="d-flex gap-3 mx-1 align-items-center justify-content-center"
            >
              <label>{index + 1}</label>
              <input
                key={index}
                type="text"
                name={`L${index + 1}`}
                onInput={handleOnChange}
                disabled={index + 1 > selectedShape?.noOfParameter}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="middle-section">
        <section className="left-section">
          <label id="diameter">Dia (mm)</label>
          <input
            id="diameter"
            name="diameter"
            type="text"
            onInput={handleOnChange}
          />
        </section>
        <section className="right-section">
          <div className="cutting-length">
            <label id="ctl">
              Cutting Length {"   "}
              <InfoIcon className="m-0 p-0" id="formula-info" />
              <UncontrolledTooltip placement="left" target="formula-info">
                {selectedShape?.function}
              </UncontrolledTooltip>
            </label>
            <input
              id="ctl"
              disabled
              value={
                item?.cuttingLength && item?.cuttingLength !== 0
                  ? item?.cuttingLength
                  : cuttingLength
              }
            />
          </div>
        </section>
      </div>
      <div className="footer-section">
        <button type="reset" className="back-button" onClick={handleReset}>
          Back
        </button>
        <button
          type="submit"
          className="confirm-button"
          onClick={(e) => {
            handleSubmit(
              e,
              selectedShape?.noOfParameter,
              selectedShape?.function
            );
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Step2;
