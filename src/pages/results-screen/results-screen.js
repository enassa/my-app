import React, { useRef, useState } from "react";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Article,
  Download,
  HowToReg,
  HowToVote,
  Logout,
  Menu,
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
      const isLastPosition = index + 1 === positions.length ? true : false;
      return (
        <div key={index} className="flex flex-col w-full md:p-5">
          <div className="w-full flex items-center">
            <span
              onClick={() => {
                addOrRemoveFromSelected(index);
              }}
              className={`max-w-full ${
                isLastPosition
                  ? "rounded-b-md"
                  : index === 0
                  ? "rounded-t-md"
                  : "rounded-none"
              } md:max-w-auto  cursor-pointer shadow-md md:shadow-none md:border mb-[1px] border-slate-200 md:rounded-md md:min-h-auto min-h-[60px]  bg-white  flex justify-between items-center py-2 pl-3 text-blue-500 px-2 md:w-auto md:mr-2 w-full`}
            >
              <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                {item?.Title}
              </span>

              <>{dropDown ? <ArrowDropUp /> : <ArrowDropDown />}</>
            </span>
            <div className="w-full md:flex hidden bg-slate-200 h-[0.5px]"></div>
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
                backgroundColor: "#ffffff",
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
      <div className="w-full h-[60px] bg-blue-600 shadow-lg z-[1] top-0 right-0 text-white flex items-center justify-between px-2">
        <div className="h">
          <HowToVote className="text-white ml-2 mr-3" />

          <span>KoinoVoter</span>
        </div>
        <div
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => {
            setHovered(false);
          }}
          className="h-full whitespace-nowrap  text-white md:flex justify-end items-center hidden"
        >
          <HowToReg /> <span> Election ID: &nbsp;</span>{" "}
          <strong> {resultsCache?.electionId}</strong>
        </div>
        <div
          onClick={() => {
            logoutAsync("/", ["resultsData"]);
          }}
          className="h-full hover:text-red-500 ml-2 whitespace-nowrap  text-white flex justify-end items-center"
        >
          <Logout /> <span className="md:flex hidden"> Logout</span>{" "}
        </div>
      </div>
      <div className="w-full flex flex-col border-b border-gray-50 md:p-5">
        <div className="w-full flex items-center  h-[100px] mb-2">
          <div className="cursor-pointer h-[110px]  shadow-md  flex  items-center w-full  ">
            <div className="h-full md:w-auto   whitespace-nowrap p-2 rounded-l-lg md:rounded-lg  flex items-center ">
              <div className="mr-3 cursor-pointer flex bg-white justify-center items-center w-[80px] h-[80px] min-h-[90px] min-w-[90px] rounded-full shadow-md">
                <ProgressBar
                  circular
                  progressThickness={7}
                  progressColor={"#e16311"}
                  containerColor={"#E2E2E2"}
                  radius={35}
                  progressPercentage={parseInt(percentageProgress.toFixed(1))}
                />
                {/* "#5F27CD"
                "#E2E2E2" */}
              </div>{" "}
              <div className="h-full mr-2  w-full text-blue-500 flex flex-col justify-center items-center">
                <span className="font-extrabold">
                  {resultsCache?.TotalVoted} / {resultsCache?.NumberOfVoters}
                </span>
                <span className="text-sm">Votes recorded</span>
              </div>
              <div className="h-full mr-2 font-extrabold text-white w-full flex justify-center items-center"></div>
            </div>
            <div className="h-full text-blue-500 w-full md:flex justify-start border-l border-l-gray-100 pl-2 items-center hidden ">
              <Article />
              <span>Title: </span>
              <span className="whitespace-nowrap overflow-hideen w-full px-4 text-ellipsis">
                {resultsCache?.Title}
              </span>
            </div>
            <div className="rounded-r-lg  border-l-white border-l md:bg-white flex right-0 md:relative flex-row md:flex-row justify-end md:min-w-[200px] w-[350px] h-full p-2 px-3 md:h-full top-[20%] md:top-0  items-center">
              <div className="flex flex-col items-center md:mr-[15px]">
                <div
                  onClick={() => {
                    // handlePrint();
                    navigate(ALL_URLS.printResults.url);
                  }}
                  className="cursor-pointer  md:md-1  md:mr-0 mr-1 md:shadow-none bg-blue-50 text-blue-600  md:mb-0  md:hover:bg-blue-100 hover:text-blue-700   rounded-full transition-all duration-200  overflow-hidden  flex justify-center flex-col items-center min-w-[50px] min-h-[50px] "
                >
                  <Download />
                </div>
                <span className="text-xs md:flex hidden">Download</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="cursor-pointer md:md-1 md:shadow-none bg-blue-50 text-blue-600  md:hover:bg-blue-100 hover:text-blue-700  rounded-full  overflow-hidden flex justify-center flex-col items-center min-w-[50px] min-h-[50px]"
                >
                  <Refresh />
                </div>
                <span className="text-xs md:flex hidden">Refresh</span>
              </div>
            </div>
          </div>

          {/* <div className="cursor-pointer ml-4 overflow-hidden pr-4  justify-end flex items-center w-1/2 h-[50px] ">
            <div className="h-full pl-2 flex items-center">
            
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex w-full h-full flex-col overflow-y-auto px-2 md:px-0 mt-[10px]">
        {ejectContestants()}
      </div>
    </div>
  );
}
