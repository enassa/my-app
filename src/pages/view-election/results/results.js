import React, { useState } from "react";
import GridLayOut from "../../../components/grid_layout/GridLayout";
import ContestantCard from "../../../components/contestant-card/contestant-card";
import { useElectionServices } from "../../../redux/slices/election-slice/election-hook";
import { ArrowDownward, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export default function Results() {
  const { openedElection } = useElectionServices();
  const [activeResults, setActiveResults] = useState([0]);
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
        <div key={index} className="flex flex-col w-full mb-3">
          <div className="w-full flex items-center">
            <span
              onClick={() => {
                addOrRemoveFromSelected(index);
              }}
              className="whitespace-nowrap cursor-pointer bg-blue-800 flex justify-between py-2 pl-3 text-white rounded-lg px-2 w-[200px] mr-2"
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
    <div className="w-full h-full flex flex-col">{ejectContestants()}</div>
  );
}
