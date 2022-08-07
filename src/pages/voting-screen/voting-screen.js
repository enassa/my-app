import { HowToReg, HowToVote } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ContestantCard from "../../components/contestant-card/contestant-card";
import GridLayOut from "../../components/grid_layout/GridLayout";
import PopUpButton from "../../components/popup-button/popup-button";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";

export default function VotingScreen() {
  const [votes, setVote] = useState();
  const { votingElection } = useElectionServices();
  const [activePosition, setActivePosition] = useState(1);
  const [voteBluePrint, setVoteBluePrint] = useState();

  const allPositions = Array.isArray(votingElection?.Positions)
    ? votingElection?.Positions
    : [];
  const totalNumberOfPosition = votingElection?.Positions?.length;
  const castVote = (vote, portfolio) => {
    let newBluePrint = {
      ...voteBluePrint,
      [portfolio]: vote,
    };
    console.log(newBluePrint);
    setVoteBluePrint(newBluePrint);
  };
  const ejectContestants = () => {
    let contestants = Array.isArray(votingElection.Contestants)
      ? votingElection.Contestants.filter(
          (contestant) =>
            contestant.Position === allPositions[activePosition - 1]?.title
        )
      : [];

    return (
      contestants
        // .sort((a, b) => b.VotesCount - a.VotesCount)
        .map((contestant, count) => {
          // vote Position contains the object of the contestant voted for
          let votePosition = !!voteBluePrint
            ? voteBluePrint[contestant.PositionId]
            : {};
          let isSelected = votePosition?.Id === contestant.Id;

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
  useEffect(() => {
    if (allPositions.length > 0) {
      let obj = {};
      allPositions.map((position) => {
        const property = position?.Id;
        obj[property] = undefined;
      });
      console.log(obj);
      setVoteBluePrint(obj);
    }
  }, [allPositions.length]);
  return (
    <div className="flex justify-start flex-col p-4">
      <div className="w-full flex items-center  h-[100px]">
        <div className=" bg-blue-600 mr-3 cursor-pointer w-[100px] h-[100px] min-h-[100px] min-w-[100px] rounded-full shadow-lg"></div>
        <div className="cursor-pointer overflow-hidden flex items-center w-1/2 h-[50px] shadow-lg">
          <div className="h-full w-[200px] bg-blue-600 flex items-center">
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
            <span>{votingElection?.Positions[activePosition - 1]?.title}</span>
          </div>
        </div>
        <div className="cursor-pointer ml-4 overflow-hidden pr-4  justify-end flex items-center w-1/2 h-[50px] ">
          <div className="h-full pl-2 flex items-center">
            <div className="h-full whitespace-nowrap  text-gray-700 flex justify-end items-center">
              <HowToReg /> <span> VOTER ID:</span> <strong> 3423432423</strong>
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
            <PopUpButton
              buttonText="Submit Vote"
              innerStyles={{
                backgroundColor: "#2463EB",
              }}
              handleClick={() => {
                if (activePosition < totalNumberOfPosition) {
                  setActivePosition(activePosition + 1);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
