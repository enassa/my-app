import React, { useEffect, useState } from "react";
import InputField from "../../components/input-field/InputField";

import { useCreateElectionServices } from "./context/create-election-context";
import { AddCircle, Article, DateRange, HowToVote } from "@mui/icons-material";
import DefinitionCard from "./components/definition-card";
import PortfolioCard from "./components/portfolio-card";
import { replaceUnderscoreWithSpace } from "../../contants/libraries/easy";
import ImagetManager from "./image-manager";
import CategoryManager from "./category-manager/category-manager";
import ImageLibrary from "./../../components/image-library/image-library";
import { ORG_LIBRARY_ID } from "../../contants/urls/urls";

export default function GeneralInfoForm({ handleNavigation }) {
  const {
    bluePrintState,
    generalInfoPrint,
    updateDate,
    errors,
    setError,
    updateGeneralInfo,
    validateForm,
    addContestantDef,
    deleteContestantDef,
    updateContestantDef,
    addPosition,
    deletePosition,
    updatePosition,
  } = useCreateElectionServices();

  const ejectGeneralInfo = () => {
    const properties = Object.keys(generalInfoPrint);
    return (
      !!properties &&
      properties.map((item, index) => {
        if (
          item === "Start_Date" ||
          item === "End_Date" ||
          item === "Start_Time" ||
          item === "End_Time" ||
          item === "Starting" ||
          item === "Ending" ||
          item === "Time_Zone"
        ) {
          return null;
        }
        return (
          <div
            key={index}
            className="w-[90%] flex justify-center relative flex-col"
          >
            <InputField
              inputData={{
                label: item,
                required: errors.includes(item),
                index,
                icon: <Article />,
                name: item,
                value: !!bluePrintState?.GeneralInfo
                  ? bluePrintState?.GeneralInfo[item]
                  : "",
              }}
              handleOnChange={(name, value, validationState) => {
                updateGeneralInfo(item, value);
                setError([]);
              }}
            />
            {errors.includes(`${item}`) && (
              <span
                style={{ fontSize: 11 }}
                className="text-red-400 w-full pl-[85px] absolute bottom-0"
              >
                The{" "}
                {replaceUnderscoreWithSpace(
                  item !== "NumberOfVoters" ? item : "Number_of_voters"
                )}{" "}
                for the election is required
              </span>
            )}
          </div>
        );
      })
    );
  };
  const ejectContestantDef = () => {
    const allContestantDefinitions = !!bluePrintState?.ContestantDefinition
      ? bluePrintState?.ContestantDefinition
      : [];
    // console.log(bluePrintState?.ContestantDefinition);
    return allContestantDefinitions
      ?.filter((item) => item?.Invisible !== true)
      ?.map((item, count) => {
        return (
          <DefinitionCard
            disabled={item.Title === "Name" || item.Title === "Image"}
            error={errors.includes(`ContestantDefinition${item.Id}`)}
            key={count}
            data={item}
            name={`Definition${count}`}
            handleChange={(data) => {
              if (errors.length) setError([]);
              updateContestantDef(data);
            }}
            handleDelete={(data) => {
              if (errors.length) setError([]);
              deleteContestantDef(data);
            }}
          />
        );
      });
  };
  const ejectPositions = () => {
    const allPositions = !!bluePrintState ? bluePrintState.Positions : [];
    return allPositions?.map((item, index) => {
      return (
        <PortfolioCard
          error={errors.includes(`Position${item.Id}`)}
          key={index}
          data={item}
          name={`Definition${index}`}
          disabled={item.Title === "Name" || item.Title === "Image"}
          handleChange={(data) => {
            if (errors.length) setError([]);
            updatePosition(data);
          }}
          handleDelete={(data) => {
            if (errors.length) setError([]);
            deletePosition(data);
          }}
        />
      );
    });
  };
  const [duration, setDuration] = useState({
    Starting: undefined,
    Ending: undefined,
  });
  useEffect(() => {
    if (duration.Starting === undefined && duration.Ending === undefined)
      return;
    !!bluePrintState && updateDate(duration);
  }, [duration]);

  let StartDate = !!bluePrintState ? bluePrintState?.GeneralInfo?.Starting : "";
  let EndDate = !!bluePrintState ? bluePrintState?.GeneralInfo?.Ending : "";
  const libraryFolder = ORG_LIBRARY_ID();
  return (
    <div className="w-full h-full  flex justify-start flex-col pb-[200px] bg-gray-100 items-center p-5 overflow-y-scroll">
      <div className="w-[70%]  min-w-[800px] mb-5 max-w-[800px] h-auto shadow-lg bg-white flex flex-col">
        <div className="w-full h-[60px] bg-blue-500 flex justify-between items-center px-3">
          <div className="w-full h-full flex items-center">
            <HowToVote className="text-white" />
          </div>
          <div className="w-full h-full flex items-center justify-end">
            <div className="flex items-center">
              <DateRange style={{ fontSize: 32 }} className="text-white mr-2" />
              <input
                className={`${
                  errors.includes("Starting") && "text-red-400 "
                } cursor-pointer px-2 rounded-sm`}
                type="datetime-local"
                onChange={(e) => {
                  if (errors.length) setError([]);
                  setDuration({
                    Starting: e.target.value,
                    Ending: duration?.Ending,
                  });
                }}
                value={StartDate || ""}
              />
            </div>
            {/* <Equalizer className="text-white mr-2" /> */}
            <strong className="mr-2 ml-2 text-bg">To</strong>
            <div className="flex items-center ">
              {/* <DateRange style={{ fontSize: 32 }} className="text-white mr-2" /> */}
              <input
                className={`${
                  errors.includes("Ending") && "text-red-400 "
                } cursor-pointer px-2 rounded-sm`}
                type="datetime-local"
                onChange={(e) => {
                  if (errors.length) setError([]);
                  setDuration({
                    Starting: duration?.Starting,
                    Ending: e.target.value,
                  });
                }}
                value={EndDate || ""}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col  px-4  h-auto">
          <div className="w-full  mt-2 flex items-center ">
            <strong className="whitespace-nowrap flex items-center mr-2">
              General Info
            </strong>
            <div className="w-full mt-2 h-[2px] flex items-center"></div>
          </div>
          <div className="flex h-auto w-full flex-col items-center">
            {ejectGeneralInfo()}
          </div>
          <div className="w-full h-auto mb-5 mt-2 flex items-center ">
            <strong className="whitespace-nowrap flex items-center mr-2">
              Contestant fields
            </strong>
          </div>
          <div className="flex h-auto w-full flex-col items-center">
            {ejectContestantDef()}
            <div className="w-[95%] flex items-center h-[50px]  mb-3">
              <div className="w-[100%] h-[50px] mr-2  mb-3"></div>
              <div
                onClick={() => {
                  addContestantDef();
                }}
                className="w-[50px] ml-3 hover:animate-rise text-gray-300 hover:text-blue-500 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3"
              >
                <span className="whitespace-nowrap mr-3 ">
                  Add Contestant Definition
                </span>
                <AddCircle style={{ fontSize: 30 }} className="mr-2 " />
              </div>
            </div>
          </div>
          <CategoryManager />
          <div className="w-full h-auto mb-5 mt-2 flex items-center ">
            <strong className="whitespace-nowrap flex items-center mr-2">
              Portfolios
            </strong>
          </div>
          <div className="flex h-auto w-full flex-col items-center">
            {ejectPositions()}
            {errors.includes("emptyPortfolio") && (
              <div className="w-full flex justify-center text-red-400">
                Please add a portfolio added
              </div>
            )}
            <div className="w-[95%] flex items-center h-[50px]  mb-3">
              <div className="w-[100%] h-[50px] mr-2  mb-3"></div>
              <div
                onClick={() => {
                  let oldPositions = bluePrintState.Positions;
                  const getIdOfLastPositions = () =>
                    oldPositions.length
                      ? oldPositions[oldPositions.length - 1].Id
                      : -1;
                  let idOfNewPositions = getIdOfLastPositions() + 1;
                  addPosition(idOfNewPositions);
                }}
                className="w-[50px] ml-3 hover:animate-rise text-gray-300 hover:text-blue-500 justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3"
              >
                <span className="whitespace-nowrap mr-3 ">Add Portolio</span>
                <AddCircle style={{ fontSize: 30 }} className="mr-2 " />
              </div>
            </div>
            <div className="w-full h-auto mb-5 mt-2 flex items-center ">
              <strong className="whitespace-nowrap flex items-center mr-2">
                Add contestant images to your library
              </strong>
            </div>
            <div className="w-full flex">
              <div className="w-full flex justify-start">
                <ImageLibrary libraryFolder={libraryFolder} />
              </div>
            </div>
            <div className="w-[95%] mt-6 flex items-center h-[50px]  mb-3">
              <div className="w-[100%] h-[50px] mr-2  mb-3"></div>
              <div className="w-[50px] ml-3  justify-end cursor-pointer px-2 h-[50px] flex items-center mb-3">
                <button
                  disabled={errors.length}
                  onClick={() => {
                    validateForm(() => {
                      handleNavigation(1);
                    });
                  }}
                  className={` ${
                    errors.length
                      ? "cursor-not-allowed"
                      : "hover:text-white hover:bg-black"
                  } bg-gray-500 text-white whitespace-nowrap  rounded-sm px-5 py-2`}
                >
                  Save and continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
