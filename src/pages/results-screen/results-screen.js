import React, { useRef, useState } from "react";
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
import { elections } from "../../components/contants/dummy-data";
import { getAsObjectFromSession } from "../../contants/libraries/easy";
import ResultsCard from "../../components/results-card/results-card";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import ProgressBar from "../../components/progress bar/ProgressBar";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useNavigate } from "react-router-dom";

export default function ResultScreen() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  // const { openedElection } = useElectionServices();
  const { loading, logoutAsync, getLatesResultsAsync, electionResults } =
    useElectionServices();
  let resultsCache = getAsObjectFromSession("resultsData");
  const openedElection = electionResults ?? {};
  const [activeResults, setActiveResults] = useState([0]);
  const [hovered, setHovered] = useState(false);
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
      let contestantsForThePosition = contestants?.filter(
        (contestant) =>
          contestant?.Position?.toLowerCase() === item?.Title?.toLowerCase()
      );
      let dropDown = activeResults.includes(index);

      return (
        <div key={index} className="flex flex-col w-full  p-5">
          <div className="w-full flex items-center">
            <span
              onClick={() => {
                addOrRemoveFromSelected(index);
              }}
              className="whitespace-nowrap cursor-pointer bg-blue-500 flex justify-between py-2 pl-3 text-white rounded-sm px-2 w-auto mr-2"
            >
              {item?.Title}
              <>{dropDown ? <ArrowDropUp /> : <ArrowDropDown />}</>
            </span>
            <div className="w-full bg-slate-500 h-[0.5px]"></div>
          </div>
          <div
            ref={componentRef}
            className={` ${
              dropDown ? "h-auto" : "h-[0px] "
            } transition-all duration-300 flex w-full overflow-hidden`}
          >
            <GridLayOut
              style={{
                // gridTemplateColumns: "repeat(4,1fr)",
                justifyContent: "center",
                padding: 40,
                backgroundColor: "#DFDFDF",
              }}
              className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5"
            >
              {contestantsForThePosition
                .sort((a, b) => b?.VotesCount - a?.VotesCount)
                .map((contestant, count) => {
                  console.log("=====", contestant);
                  return (
                    <ResultsCard
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
  let percentageProgress =
    (parseInt(resultsCache?.TotalVoted) /
      parseInt(resultsCache?.NumberOfVoters)) *
    100;
  console.log(percentageProgress);
  const myref = useRef();
  let checkFirst = myref.current;

  useEffect(() => {
    if (electionResults === undefined && !loading) {
      getLatesResultsAsync({
        orgCode: resultsCache?.orgCode,
        electionId: resultsCache?.electionId,
        token: resultsCache?.token,
      });
    }
    checkFirst++;
  }, []);
  return (
    <div className="w-full h-full flex flex-col ">
      <div className="w-full flex flex-col border-b border-gray-50 p-5">
        <div
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false);
          }}
          className="h-full whitespace-nowrap  text-gray-700 flex justify-end items-center"
        >
          <HowToReg /> <span> Election Id: &nbsp;</span>{" "}
          <strong> {resultsCache?.electionId}</strong>
        </div>
        <div className="w-full flex items-center  h-[100px] mb-2">
          <div className="  mr-3 cursor-pointer flex justify-center items-center w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-full shadow-lg">
            <ProgressBar
              circular
              progressThickness={7}
              progressColor={"#5F27CD"}
              containerColor="#E2E2E2"
              radius={40}
              progressPercentage={parseInt(percentageProgress.toFixed(1))}
            />
          </div>{" "}
          <div className="cursor-pointer overflow-hidden flex rounded-lg items-center w-[70%] h-[50px] shadow-lg">
            <div className="h-full w-auto whitespace-nowrap bg-blue-600 flex items-center ">
              <HowToVote className="text-white ml-2 mr-3" />
              <div className="h-full mr-2 font-extrabold  w-full text-white flex justify-center items-center">
                {resultsCache?.TotalVoted}
              </div>
              {/* <span className="w-2 bg-white h-1/2"></span> */}
              <span className="w-auto mr-2  whitespace-nowrap text-white  h-1/2 ">
                out of
              </span>
              <div className="h-full mr-2 font-extrabold text-white w-full flex justify-center items-center">
                {resultsCache?.NumberOfVoters}
              </div>
              <span className="w-auto mr-2  whitespace-nowrap text-white  h-1/2 ">
                votes recorded
              </span>
            </div>
            <div className="h-full w-full flex justify-center items-center ">
              <span className="whitespace-nowrap px-4 text-ellipsis">
                {resultsCache?.Title}
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              // handlePrint();
              navigate(ALL_URLS.printResults.url);
            }}
            className="cursor-pointer hover:bg-blue-50 hover:text-blue-600  hover:rounded-md transition-all duration-200  overflow-hidden flex justify-center flex-col items-center w-[100px] h-[50px] shadow-lg"
          >
            <Download />
            <span className="text-xs">Download</span>
          </div>
          <div
            onClick={() => {
              window.location.reload();
            }}
            className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:rounded-md  ml-3 overflow-hidden flex justify-center flex-col items-center w-[100px] h-[50px] shadow-lg"
          >
            <Refresh />
            <span className="text-xs">Refresh</span>
          </div>
          <div className="cursor-pointer ml-4 overflow-hidden pr-4  justify-end flex items-center w-1/2 h-[50px] ">
            <div className="h-full pl-2 flex items-center">
              <div
                onClick={() => {
                  logoutAsync("/", ["resultsData"]);
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
