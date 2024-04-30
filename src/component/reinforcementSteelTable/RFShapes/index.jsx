import React, { useEffect, useState } from "react";
import Stepwizard from "react-step-wizard";
import { Stepper, Step } from "react-form-stepper";
import Step1 from "./step1";
import Step2 from "./step2";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRFShapes } from "../../../actions/reinforcementBook";
import "../style.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const RFShape = (props) => {
  const { item, imageShapes, isOpen, setIsOpen, dispatch } = props;
  const [stepWizard, setStepWizard] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [step1Data, setStep1Data] = useState([]);
  const [step2Data, setStep2Data] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };
  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };
  const handleImageSelection = (imageId) => {
    setSelectedImageId(imageId);
    stepWizard.nextStep();
  };
  const handleBack = () => {
    stepWizard.previousStep();
  };
  const handleStep = (e) => {
    e.preventDefault();
  };
  const hanldeLastStep = () => {
    stepWizard.lastStep();
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchRFShapes = async () => {
      const results = await getRFShapes();
      const allImages = results.map((x) => ({
        id: x.id,
        shapeCode: x.shapeCode,
        imagePath: x.imagePath,
      }));
      setStep1Data(allImages);
      setStep2Data(results);
      setLoading(false);
    };
    fetchRFShapes();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      size="md"
      centered
      toggle={() => {
        setIsOpen(false);
      }}
    >
      <ModalBody>
        {loading ? (
          <div className="loader">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        ) : (
          <Stepwizard
            instance={assignStepWizard}
            onStepChange={handleStepChange}
            nav={
              <>
                <Stepper activeStep={activeStep}>
                  <Step
                    className="step"
                    label="Select the Shape"
                    onClick={(e) => {
                      handleStep(e);
                    }}
                  />
                  <Step
                    className="step"
                    label="Add Dimensions"
                    onClick={(e) => {
                      handleStep(e);
                    }}
                  />
                </Stepper>
              </>
            }
          >
            <Step1 shapeData={step1Data} onImageSelect={handleImageSelection} />
            <Step2
              item={item}
              shapeData={step2Data}
              selectedImageId={selectedImageId}
              handleBack={handleBack}
              dispatch={dispatch}
              hanldeLastStep={hanldeLastStep}
            />
          </Stepwizard>
        )}
      </ModalBody>
    </Modal>
  );
};

export default RFShape;
