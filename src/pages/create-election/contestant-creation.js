import { SupervisedUserCircle } from "@mui/icons-material";
import React, { useState } from "react";
import { useCreateElectionServices } from "./context/create-election-context";
import GridLayOut from "../../components/grid_layout/GridLayout";
import ContestantCard from "../../components/contestant-card/contestant-card";
import { dummyElection, elections } from "../../components/contants/dummy-data";
import CreateContestantCard from "../../components/create-contestant-card/create-contestant-card";
import { PlusCircleIcon } from "@heroicons/react/outline";
import AddContestantForm from "./add-contestant-form";
import {
  getAsObjectFromLocalStorage,
  localStorageGet,
  localStorageSave,
  saveObjectInLocalStorage,
} from "../../contants/libraries/easy";
import { useEffect } from "react";

export default function ContestantCreation({ handleNavigation }) {
  const { bluePrintState, createElection } = useCreateElectionServices();

  const activePortfolioCache = getAsObjectFromLocalStorage("activePortfolio");

  let firstPortFolio =
    !!bluePrintState?.Positions && bluePrintState?.Positions[0];
  let selectedPortfolio =
    activePortfolioCache !== undefined ? activePortfolioCache : firstPortFolio;

  const [errors, setError] = useState([]);
  const [activePortfolio, setActivePortfolio] = useState(selectedPortfolio);

  useEffect(() => {
    saveObjectInLocalStorage("activePortfolio", activePortfolio);
  }, [activePortfolio]);

  const validateForm = () => {
    let foundErrors = [];
    let allPositions = bluePrintState?.Positions;
    allPositions.map((position, index) => {
      let contestantCountForPosition = bluePrintState?.Contestants.find(
        (item) => item.PositionId === position.Id
      );
      if (!!!contestantCountForPosition) {
        if (!errors.includes(position.Id)) {
          foundErrors.push(position.Id);
        }
      }
    });
    if (foundErrors.length) {
      setError([...errors, ...foundErrors]);
      return false;
    }
    return true;
  };
  const ejectPortFolios = () => {
    return (
      Array.isArray(bluePrintState?.Positions) &&
      bluePrintState?.Positions.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              activePortfolio.Id === item.Id
                ? "bg-blue-500 text-white"
                : errors.includes(item.Id)
                ? "bg-red-200 text-red-600"
                : "hover:bg-blue-50 "
            } w-full cursor-pointer mb-1  flex justify-start items-center  h-[40px] min-h-[40px]`}
            onClick={() => {
              setActivePortfolio(item);
              if (errors.length) setError([]);
            }}
          >
            <div className="w-full text-ellipsis h-full flex justify-start items-center px-2">
              {index + 1}. {item.Title}
            </div>
            <div
              className={`${
                errors.includes(item.Id)
                  ? "bg-red-400 text-white"
                  : "bg-blue-100 text-blue-600"
              } flex justify-center items-center rounded-full ml-3 mr-3 w-[30px] min-w-[30px] min-h-[30px] `}
            >
              {
                bluePrintState?.Contestants.filter(
                  (el) => el.PositionId === item.Id
                )?.length
              }
            </div>
          </div>
        );
      })
    );
  };
  const handleCreateElection = () => {
    handleNavigation(1);
    createElection();
  };
  return (
    <div className="w-full h-full flex justify-start">
      <div
        onClick={() => {
          if (validateForm()) {
            handleCreateElection();
          }
        }}
        className="absolute bottom-[10px] z-[99999] rounded-full  hover:bg-blue-400 text-white cursor-pointer px-5 py-7 right-6 bg-blue-500"
      >
        <span className="">Create</span>
      </div>
      <div className="w-full h-full flex justify-start">
        <div className="w-[300px] min-w-[300px] h-full py-3 pl-2 bg-white flex  flex-col overflow-y-auto pb-[200px] ">
          <div className="min-h-[80px] w-full flex justify-center items-center">
            {/* <SupervisedUserCircle
              style={{ fontSize: 30 }}
              className="text-gray-600 mr-2"
            /> */}
            <div
              style={{ fontSize: 30 }}
              className="flex justify-center items-center rounded-full ml-3 mr-3 w-[30px] min-w-[30px] min-h-[30px]  text-blue-600"
            >
              {bluePrintState?.Positions?.length}
            </div>
            <strong className="text-blue-600" style={{ fontSize: 20 }}>
              PORTFOLIOS
            </strong>{" "}
          </div>
          {ejectPortFolios()}
        </div>
        <div className="w-full h-full flex justify-start bg-gray-50 overflow-y-scroll flex-col pb-[200px]">
          {/* <div className="w-full h-50  flex justify-center bg-white items-center">
            <h2 style={{ fontSize: 30 }}>{activePortfolio.Title}</h2>
          </div> */}
          <GridLayOut
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <AddContestantForm
              data={{
                positionId: activePortfolio?.Id,
                position: activePortfolio?.Title,
              }}
              resetErrors={() => {
                if (errors.length) setError([]);
              }}
            />
            {Array.isArray(bluePrintState?.Contestants) &&
              bluePrintState?.Contestants.filter(
                (item) => item.PositionId === activePortfolio?.Id
              )
                .sort((a, b) => a.BallotNumber - b.BallotNumber)
                .map((contestant, count) => {
                  return (
                    <CreateContestantCard
                      editing={false}
                      key={count}
                      data={contestant}
                    />
                  );
                })}
          </GridLayOut>
        </div>
      </div>
    </div>
  );
}
