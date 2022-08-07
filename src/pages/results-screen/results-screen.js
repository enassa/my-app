import React, { useState } from "react";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Download,
  HowToReg,
  HowToVote,
  Logout,
  Refresh,
} from "@mui/icons-material";
import GridLayOut from "../../components/grid_layout/GridLayout";
import ContestantCard from "../../components/contestant-card/contestant-card";
import { useElectionServices } from "../create-election/context/create-election-context";
import { elections } from "../../components/contants/dummy-data";

export default function ResultScreen() {
  // const { openedElection } = useElectionServices();
  const openedElection = elections[0];
  const [activeResults, setActiveResults] = useState([0]);
  const [hovered, setHovered] = useState(false);
  // console.log(openedElection);
  const addOrRemoveFromSelected = (index) => {
    let newItems = [];
    if (activeResults.includes(index)) {
      newItems = activeResults.filter((item) => item !== index);
      setActiveResults([...newItems]);
      return;
    }
    newItems = [...activeResults, index];
    setActiveResults([...newItems]);
  };
  const ejectContestants = () => {
    // CHEK IF AN ELECTION IS OPENDED AND IF IT HAS POSITIONS

    let positions =
      !!openedElection && Array.isArray(openedElection?.Positions)
        ? openedElection?.Positions
        : [];

    // LOOP THROUGH ALL POSITIONS AND PRINT OUT CONTESTANTS FOR EACH POSITION
    return positions.map((item, index) => {
      let contestants = Array.isArray(openedElection.Contestants)
        ? openedElection.Contestants
        : [];
      console.log(contestants);
      console.log(item);
      let contestantsForThePosition = contestants.filter(
        (contestant) =>
          contestant.Position.toLowerCase() === item.title.toLowerCase()
      );
      let dropDown = activeResults.includes(index);
      return (
        <div key={index} className="flex flex-col w-full  p-5">
          <div className="w-full flex items-center">
            <span
              onClick={() => {
                addOrRemoveFromSelected(index);
              }}
              className="whitespace-nowrap cursor-pointer bg-blue-500 flex justify-between py-2 pl-3 text-white rounded-sm px-2 w-[200px] mr-2"
            >
              {item.title}
              <>{dropDown ? <ArrowDropUp /> : <ArrowDropDown />}</>
            </span>
            <div className="w-full bg-slate-500 h-[0.5px]"></div>
          </div>
          <div
            className={` ${
              dropDown ? "h-auto" : "h-[0px] "
            } transition-all duration-300 flex w-full overflow-hidden`}
          >
            <GridLayOut
              style={{
                gridTemplateColumns: "repeat(4,1fr)",
                justifyContent: "center",
                padding: 40,
              }}
            >
              {contestantsForThePosition
                .sort((a, b) => b.VotesCount - a.VotesCount)
                .map((contestant, count) => {
                  console.log(contestant);
                  return (
                    <ContestantCard
                      key={count}
                      info={contestant}
                      position={count + 1}
                    />
                  );
                })}
            </GridLayOut>
          </div>
        </div>
      );
      // sort((a, b) => a - b)
    });
  };
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full flex flex-col shadow-lg p-5">
        <div
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false);
          }}
          className="h-full whitespace-nowrap  text-gray-700 flex justify-end items-center"
        >
          <HowToReg /> <span> VOTER ID:</span> <strong> 3423432423</strong>
        </div>
        <div className="w-full flex items-center  h-[100px] mb-2">
          <div className=" bg-blue-600 mr-3 cursor-pointer w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-full shadow-lg"></div>
          <div className="cursor-pointer overflow-hidden flex items-center w-1/2 h-[50px] shadow-lg">
            <div className="h-full w-[200px] bg-blue-600 flex items-center">
              <HowToVote className="text-white ml-2" />
              <div className="h-full w-full text-white flex justify-center items-center">
                {openedElection.TotalVoted}
              </div>
              <span className="w-2 bg-white h-1/2"></span>
              <div className="h-full mr-2 text-white w-full flex justify-center items-center">
                {openedElection.NumberOfVoters}
              </div>
            </div>
            <div className="h-full w-full flex justify-center items-center ">
              <span>{openedElection.GeneralInfo.Title}</span>
            </div>
          </div>
          <div className="cursor-pointer hover:bg-blue-50 hover:text-blue-600  hover:rounded-md transition-all duration-200  overflow-hidden flex justify-center flex-col items-center w-[100px] h-[50px] shadow-lg">
            <Download />
            <span className="text-xs">Download</span>
          </div>
          <div className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:rounded-md  ml-3 overflow-hidden flex justify-center flex-col items-center w-[100px] h-[50px] shadow-lg">
            <Refresh />
            <span className="text-xs">Refresh</span>
          </div>
          <div className="cursor-pointer ml-4 overflow-hidden pr-4  justify-end flex items-center w-1/2 h-[50px] ">
            <div className="h-full pl-2 flex items-center">
              <div
                onClick={() => {
                  // logoutUser()
                }}
                className="h-full hover:text-red-500 ml-2 whitespace-nowrap  text-gray-700 flex justify-end items-center"
              >
                <Logout /> <span> Logout</span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full flex-col overflow-y-scroll">
        {ejectContestants()}
      </div>
    </div>
  );
}
