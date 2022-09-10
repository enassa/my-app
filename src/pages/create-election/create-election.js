import {
  ArrowRightAlt,
  HowToReg,
  Logout,
  StackedBarChart,
} from "@mui/icons-material";
import React, { useState } from "react";
import PopUpButton from "../../components/popup-button/popup-button";
import ContestantCreation from "./contestant-creation";
import ElectionProvider from "./context/create-election-context";
import GeneralInfoForm from "./general-info-form";
import PreviewPage from "./preview-page";
import {
  localStorageGet,
  localStorageSave,
} from "../../contants/libraries/easy";
import { useEffect } from "react";
import { ORG_CODE } from "../../contants/urls/urls";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";

function CreateElection() {
  const activeStepCache = localStorageGet("activeStep");
  let step = parseInt(activeStepCache);
  const [activeStep, setActiveStep] = useState(step ? step : 1);
  const totalNumberOfSteps = 3;
  const { loading, logoutAsync, getLatesResultsAsync, electionResults } =
    useElectionServices();
  useEffect(() => {
    localStorageSave("activeStep", activeStep);
  }, [activeStep]);

  const handleNavigation = (direction) => {
    switch (direction) {
      case -1:
        activeStep > 1 && setActiveStep(activeStep - 1);
        break;
      case 1:
        activeStep < totalNumberOfSteps && setActiveStep(activeStep + 1);
        break;
      default:
        break;
    }
  };

  const getActiveContent = () => {
    switch (activeStep) {
      case 1: //General Info
        return (
          <GeneralInfoForm
            handleNavigation={(direction) => handleNavigation(direction)}
          />
        );
      case 2: //Contestants
        return (
          <ContestantCreation
            handleNavigation={(direction) => handleNavigation(direction)}
          />
        );
      case 3: //Preview
        return (
          <PreviewPage
            handleNavigation={(direction) => handleNavigation(direction)}
          />
        );
      default:
        break;
    }
  };
  const getStepName = () => {
    switch (activeStep) {
      case 1:
        return "General info";
      case 2:
        return "Create contestants";
      default:
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col shadow-lg px-4">
        {/* <div
          // onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            // setHovered(false);
          }}
          className="h-full whitespace-nowrap  text-gray-700 flex justify-end items-center"
        >
          <HowToReg /> <span> ORG ID:</span> <strong> {ORG_CODE()}</strong>
        </div> */}
        <div className="w-full flex items-center  h-[60px] ">
          <div className="cursor-pointer overflow-hidden flex items-center w-1/2 h-[50px] ">
            <div className="h-[30px] w-[200px] bg-blue-500 rounded-lg flex items-center">
              <StackedBarChart className="text-white ml-2" />
              <div className="h-full w-full text-white flex justify-center items-center">
                {activeStep}
              </div>
              <span className="w-2 bg-white h-1/2"></span>
              <div className="h-full mr-2 text-white w-full flex justify-center items-center">
                {totalNumberOfSteps}
              </div>
            </div>
            <div className="h-full w-full flex justify-start pl-2 items-center ">
              {/* <ArrowRightAlt /> */}
              <strong className="text-2xl text-gray-500">
                {getStepName()}
              </strong>
            </div>
          </div>

          <div className="cursor-pointer ml-4 overflow-hidden pr-4  justify-end flex items-center w-1/2 h-[50px] ">
            <div className="h-full pl-2 flex items-center">
              <div className="h-full pl-2 flex items-center text-blue-500">
                <HowToReg /> <span> ORG ID:</span>{" "}
                <strong> {ORG_CODE()}</strong>
              </div>
              <div
                onClick={() => {
                  logoutAsync("/", ["resultsData"]);
                }}
                className="h-full hover:text-red-500 ml-2 whitespace-nowrap  text-gray-700 flex justify-end items-center"
              >
                <Logout className="text-gray-500 hover:text-gray-600 ml-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col">{getActiveContent()}</div>
      <div className="w-full px-4 left-0 fixed bottom-4 flex justify-between">
        {activeStep > 1 && (
          <div className="w-full flex  items-center">
            <PopUpButton
              buttonText="Prev"
              handleClick={() => {
                if (activeStep > 1) {
                  setActiveStep(activeStep - 1);
                }
              }}
            />
          </div>
        )}
        {/* {activeStep !== totalNumberOfSteps && activeStep !== 1 ? (
          <div className="w-full flex justify-end items-center">
            <PopUpButton
              buttonText="Next"
              handleClick={() => {
                if (activeStep < totalNumberOfSteps) {
                  setActiveStep(activeStep + 1);
                }
              }}
            />
          </div>
        ) : null} */}
        {activeStep === totalNumberOfSteps && (
          <div className="w-full flex justify-end items-center">
            <PopUpButton
              buttonText="Create election"
              innerStyles={{
                backgroundColor: "#2463EB",
              }}
              handleClick={() => {
                localStorage.removeItem("bluePrintState");
                if (activeStep < totalNumberOfSteps) {
                  setActiveStep(activeStep + 1);
                }
              }}
            />
          </div>
        )}
      </div>{" "}
    </div>
  );
}
export default CreateElection;
