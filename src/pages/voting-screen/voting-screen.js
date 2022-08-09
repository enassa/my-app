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
  localStorageGet,
  localStorageSave,
  removeItemsFromLocalStorage,
  saveObjectInLocalStorage,
  saveObjectInSession,
  sessionGet,
  sessionSave,
} from "../../contants/libraries/easy";
import { errorToast } from "../../components/toast/toastify";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import ProgressBar from "../../components/progress bar/ProgressBar";

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

  const castVote = (vote, portfolio) => {
    let newBluePrint = {
      ...votingElection?.Votes,
      [portfolio]: vote,
    };
    let newVotingElection = {
      ...votingElection,
      Votes: newBluePrint,
    };
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
    return percentage;
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
    castVoteAsync({ voteData: votingElection });
    navigate(ALL_URLS.voteSuccess.url);
  };
  const ejectContestants = () => {
    // filter for contestants with the active position's Id
    let contestants = Array.isArray(votingElection?.Contestants)
      ? votingElection.Contestants.filter(
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
          let isSelected = voteMadeForTheCurrentPosition?.Id === contestant?.Id;

          return (
            <ContestantCard
              selected={isSelected}
              key={count}
              info={contestant}
              voterCard={true}
              handleNextClick={() => {
                if (activePosition < totalNumberOfPosition) {
                  setActivePosition(activePosition + 1);
                }
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

  return (
    <div className="flex justify-start flex-col p-4">
      <div className="w-full flex items-center  h-[100px]">
        <div className="  mr-3 cursor-pointer flex justify-center items-center w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-full shadow-lg">
          <ProgressBar
            circular
            progressThickness={7}
            progressColor={"#5F27CD"}
            containerColor="#E2E2E2"
            radius={40}
            progressPercentage={percentageProgress()}
          />
        </div>
        <div className="cursor-pointer overflow-hidden flex items-center w-1/2 h-[50px] rounded-lg shadow-lg">
          <div className="h-full w-[200px] bg-[#5F27CD] flex items-center">
            <HowToVote className="text-white ml-2" />
            <div className="h-full w-full text-white flex justify-center items-center">
              {activePosition}
            </div>
            <span className="w-2 bg-white h-1/2"></span>
            <div className="h-full mr-2 text-white w-full flex justify-center items-center">
              {totalNumberOfPosition}
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center ">
            <span>{votingElection?.Positions[activePosition - 1]?.Title}</span>
          </div>
        </div>
        <div className="cursor-pointer ml-4 overflow-hidden pr-4 shadow-lg rounded-lg  justify-between flex items-center w-1/2 h-[50px] ">
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
          style={{
            gridTemplateColumns: "repeat(4,1fr)",
            justifyContent: "center",
            padding: 40,
          }}
        >
          {ejectContestants()}
        </GridLayOut>
      </div>
      <div className="w-full px-4 left-0 fixed bottom-4 flex justify-between">
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
          <div className="w-full flex justify-end items-center">
            <div className="bg relative">
              {/* pulser */}
              <div className="bg z-[-1] top-0 w-[100px] h-[100px] animate-ping rounded-full bg-[#2463EB] absolute px-2"></div>
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
