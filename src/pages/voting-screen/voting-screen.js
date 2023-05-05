import { HowToReg, HowToVote } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContestantCard from "../../components/contestant-card/contestant-card";
import GridLayOut from "../../components/grid_layout/GridLayout";
import PopUpButton from "../../components/popup-button/popup-button";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import {
  createElection,
  setOpenedElection,
  setVotingElection,
  resetOpenedElection,
  resetElection,
  updateElection,
  getElections,
} from "../../redux/slices/election-slice/election-slice";
import {
  getAsObjectFromLocalStorage,
  getAsObjectFromSession,
  isTouch,
  localStorageGet,
  localStorageSave,
  removeItemsFromLocalStorage,
  saveObjectInLocalStorage,
  saveObjectInSession,
  sessionGet,
  sessionSave,
  watchForHover,
} from "../../contants/libraries/easy";
import { errorToast } from "../../components/toast/toastify";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import ProgressBar from "../../components/progress bar/ProgressBar";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import PreElection from "./pre-election";

export default function VotingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activePositionStepCache = getAsObjectFromSession("activePosition");
  const step = parseInt(activePositionStepCache?.num);

  const { loading, votingElection, castVoteAsync } = useElectionServices();
  const [activePosition, setActivePosition] = useState(step ? step : 1);

  const allPositions = Array.isArray(votingElection?.Positions)
    ? votingElection?.Positions
    : [];
  const totalNumberOfPosition = votingElection?.Positions?.length;

  // const maxVotesForPosition =
  //   votingElection?.Positions[activePosition - 1].Settings.maxSelection;
  // const votesCount = votingElection?.Votes[`${activePosition - 1}`]?.length;
  // const division = (votesCount / maxVotesForPosition) * 100;
  const getVotesCount = () => {
    const allCastedVotes = votingElection?.Votes;
    let votesNumber = 0;
    for (let vote in allCastedVotes) {
      // console.log(vote);
      votesNumber += allCastedVotes[vote]?.length || 0;
    }
    return votesNumber;
  };
  const votesCount = votingElection?.Votes[`${activePosition - 1}`]?.length;
  const division = (getVotesCount() / totalNumberOfPosition) * 100;
  const percentageVoteCount = parseInt(division.toFixed(2));

  console.log(votingElection);
  // const castVote = (vote, portfolio) => {
  //   console.log(votingElection);
  //   // console.log(vote, portfolio);
  //   let newBluePrint = {
  //     ...votingElection?.Votes,
  //     [portfolio]: vote,
  //   };
  //   let newVotingElection = {
  //     ...votingElection,
  //     Votes: newBluePrint,
  //   };
  //   // Save update to voting election in local storage
  //   saveObjectInSession("votingElection", newVotingElection);
  //   dispatch(setVotingElection(newVotingElection));
  // };
  const castVote = (vote, portfolioId) => {
    console.log(votingElection);
    // console.log(vote, portfolio);
    let votingPortfolio;
    let newVotes;
    const maxNumberOfVotes =
      votingElection.Positions[activePosition - 1].Settings?.maxSelection;
    const oldVotesForPortfolio = votingElection.Votes[portfolioId] || [];
    const voteExist = oldVotesForPortfolio?.findIndex(
      (item) => item.Id === vote.Id
    );

    if (votingElection.Votes[portfolioId] === undefined) {
      votingPortfolio = { [portfolioId]: [] };
    } else {
      votingPortfolio = votingElection.Votes;
    }

    // if (voteExist === -1) {
    //   //vote doesn't exist so add it if settings check is right
    //   if (oldVotesForPortfolio.length < maxNumberOfVotes) {
    //     newVotes = [...votingPortfolio[portfolioId], vote];
    //   } else {
    //     errorToast(`Maximum number of ${maxNumberOfVotes} voters selected`);
    //     return;
    //   }
    // } else {
    //   //vot exist so
    //   newVotes = oldVotesForPortfolio.filter((item) => item.Id !== vote.Id);
    // }

    if (voteExist === -1) {
      //vote doesn't exist so add it if settings check is right
      newVotes = [vote];
    } else {
      //vot exist so
      newVotes = oldVotesForPortfolio.filter((item) => item.Id !== vote.Id);
    }

    console.log(newVotes);
    let newBluePrint = {
      ...votingElection?.Votes,
      [portfolioId]: newVotes,
    };
    let newVotingElection = {
      ...votingElection,
      Votes: newBluePrint,
    };
    // console.log(newVotingElection);
    // Save update to voting election in local storage
    saveObjectInSession("votingElection", newVotingElection);
    dispatch(setVotingElection(newVotingElection));
  };

  let percentageProgress = () => {
    let notVoted = [];
    let votesNow = votingElection?.Votes;
    Object.keys(votesNow || {}).map((item) => {
      if (votesNow[item] !== undefined) {
        notVoted.push(item);
      }
    });

    const difference = notVoted?.length / votingElection?.Positions?.length;
    const percentage = difference * 100;
    return parseInt(percentage.toFixed(1));
  };
  // const validateVote = () => {
  //   const positionIds = Object.keys(votingElection?.Votes);
  //   const votesObj = Object.keys(votingElection?.Votes);
  //   let notVotedPortfolios = positionIds.every(
  //     (item) => votesObj[item] !== undefined
  //   );
  //   if (notVotedPortfolios) {
  //     errorToast("Please select at least one in al portfolios");
  //     return false;
  //   } else return true;
  //   // let
  //   // positionIds.
  // };
  const submitVote = () => {
    let allVotes = votingElection.Votes;
    let votedPortVolios = Object.keys(allVotes);
    console.log(
      // votingElection,
      // votedPortVolios,
      allVotes
      // votingElection.Positions
    );
    // return;
    let errorCounter = 0;
    votedPortVolios.some((idOfPortfolio, index) => {
      const portfolioId = parseInt(idOfPortfolio);
      let positionOfInterest = votingElection.Positions.find(
        (position) => position.Id === portfolioId
      );
      let expectedMaxVotes = positionOfInterest.Settings.maxSelection;
      let expectedMinVotes = positionOfInterest.Settings.minSelection;
      let votesForPortfolio = allVotes[`${portfolioId}`];
      let minValid = votesForPortfolio.length >= expectedMinVotes;
      let maxValid = votesForPortfolio.length <= expectedMaxVotes;

      if (!minValid) {
        errorToast(
          `A minimum of ${expectedMinVotes} votes is required for ${positionOfInterest.Title}`
        );
        errorCounter++;
        return;
      }
      // if (!maxValid) {
      //   errorToast(`A m${17} votes is required for ${positionOfInterest.Title}`);
      // }
    });
    // if(errorCounter){
    //   errorToast(
    //     `A minum of ${expectedMinVotes} votes is required for ${positionOfInterest.Title}`
    //   );
    // }
    if (errorCounter) return;
    castVoteAsync({ voteData: votingElection });
  };
  const ejectContestants = () => {
    // filter for contestants with the active position's Id
    let contestants = Array.isArray(votingElection?.Contestants)
      ? votingElection.Contestants?.filter(
          (contestant) =>
            contestant.Position === allPositions[activePosition - 1]?.Title
        )
      : [];

    return (
      contestants
        // .sort((a, b) => b.VotesCount - a.VotesCount)
        .map((contestant, count) => {
          // Find the vote made for the current position by using the index of the current positin -1
          // Find all Ids of the positions in the setup
          let positionIds = Object.keys(votingElection.Votes);

          //use current active position to find the active id
          let idOfActivePosition = positionIds[activePosition - 1];

          //get vote made for the active position id
          let voteMadeForTheCurrentPosition =
            votingElection.Votes[idOfActivePosition];

          // Compare the id of the vote made object with the id of this contestant
          // let isSelected = voteMadeForTheCurrentPosition?.Id === contestant?.Id;

          // Compare the id of the vote made object with the id of this contestant
          let isSelected = votingElection.Votes[idOfActivePosition]?.find(
            (item) => item.Id === contestant?.Id
          );
          return (
            <ContestantCard
              selected={isSelected}
              key={count}
              info={contestant}
              voterCard={true}
              handleNextClick={() => {
                // if (activePosition < totalNumberOfPosition) {
                setActivePosition(activePosition + 1);
                // }
              }}
              isLast={activePosition === totalNumberOfPosition}
              handleClick={(vote) => {
                castVote(vote, vote.PositionId, vote.Position);
              }}
            />
          );
        })
    );
  };
  let cachedVotingObj = getAsObjectFromSession("votingElection");

  // Maintain votes casted on refresh
  useEffect(() => {
    if (cachedVotingObj !== undefined && votingElection === undefined) {
      dispatch(setVotingElection(cachedVotingObj));
    }
    window.addEventListener("beforeunload", (event) => {
      event.returnValue = `Are you sure you want to leave?`;
      console.log(event);
    });
  }, []);

  // Maintain active position on refresh
  useEffect(() => {
    sessionStorage.removeItem("activePosition");
    saveObjectInSession("activePosition", { num: activePosition });
  }, [activePosition]);
  const [showCategories, setShowCategories] = useState(false);
  return showCategories ? (
    <PreElection />
  ) : (
    <div className="flex justify-start flex-col p-4">
      {loading ? (
        <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-[999999] bg-backdrop2">
          {<OverlayLoader loaderText="Recording vote..." />}
        </div>
      ) : null}
      <div className="w-full flex items-center z-[999]  h-[100px] sticky top-[0px]">
        <div className="  mr-3 cursor-pointer hidden md:flex lg:flex xlg:flex justify-center items-center w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-full shadow-lg">
          <ProgressBar
            circular
            progressThickness={7}
            progressColor={"#5F27CD"}
            containerColor="#E2E2E2"
            radius={40}
            // progressPercentage={percentageProgress()}
            progressPercentage={percentageVoteCount || 0}
          />
        </div>
        <div className="cursor-pointer bg-white overflow-hidden flex items-center w-full md:w-1/2 h-[50px] rounded-lg shadow-lg">
          <div className="h-full w-[200px] bg-[#5F27CD] flex items-center">
            <HowToVote className="text-white ml-2" />
            <div className="h-full w-full text-white flex justify-center items-center">
              {activePosition}
              {/* {votesCount || 0} */}
            </div>
            <span className="w-2 bg-white h-1/2"></span>
            <div className="h-full mr-2 text-white w-full flex justify-center items-center">
              {totalNumberOfPosition}
              {/* {maxVotesForPosition} */}
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center ">
            <span className="whitespace-nowrap px-2">
              {votingElection?.Positions[activePosition - 1]?.Title}
            </span>
          </div>
        </div>
        <div className="hidden md:flex lg:flex xlg:flex cursor-pointer ml-4 overflow-hidden pr-4 shadow-lg rounded-lg  justify-between items-center w-1/2 h-[50px] ">
          <div className="h-full pl-2 flex items-center ">
            <div className="h-full whitespace-nowrap  text-[#5F27CD]  flex justify-end items-center">
              {/* <span> Title:</span>  */}
              <strong> {votingElection?.Title}</strong>
            </div>
          </div>
          <div className="h-full pl-2 flex items-center ">
            <div className="h-full whitespace-nowrap  text-[#5F27CD]  flex justify-end items-center">
              <HowToReg /> <span> VOTER ID:</span>{" "}
              <strong> {votingElection?.voterId}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <GridLayOut
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xlg:grid-cols-5"
          style={{
            // gridTemplateColumns: "repeat(4,1fr)",
            justifyContent: "center",
            padding: 40,
          }}
        >
          {ejectContestants()}
        </GridLayOut>
      </div>
      <div className=" z-[99] w-full px-4 left-0 fixed bottom-4 flex justify-between">
        {activePosition > 1 && (
          <div className="w-full flex  items-center">
            <PopUpButton
              buttonText="Prev"
              handleClick={() => {
                if (activePosition > 1) {
                  setActivePosition(activePosition - 1);
                }
              }}
            />
          </div>
        )}
        {activePosition !== totalNumberOfPosition && (
          <div className="w-full flex justify-end items-center">
            <PopUpButton
              buttonText="Next"
              handleClick={() => {
                if (activePosition < totalNumberOfPosition) {
                  setActivePosition(activePosition + 1);
                }
              }}
            />
          </div>
        )}
        {activePosition === totalNumberOfPosition && (
          <div
            className={`${
              percentageVoteCount === 100 ? "flex" : "hidden"
            } w-full justify-end items-center`}
          >
            <div className="bg relative">
              {/* pulser */}
              <div className="bg z-[-1]  top-0 w-[100px] h-[100px] animate-ping rounded-full bg-[#2463EB] absolute px-2"></div>
              <PopUpButton
                noText={true}
                innerStyles={{
                  backgroundColor: "#5F27CD",
                  display: "flex",
                  minWith: "100px",
                  minHeight: "100px",
                  width: 100,
                  height: 100,
                  flexFlow: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 99999,
                }}
                handleClick={() => {
                  // if (activePosition < totalNumberOfPosition) {
                  //   setActivePosition(activePosition + 1);
                  // }
                  if (percentageProgress() === 100) {
                    submitVote();
                  } else {
                    errorToast(
                      "Please select at least one from all portfolios"
                    );
                  }
                }}
              >
                <HowToVote />
                <span>submit</span>
              </PopUpButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
