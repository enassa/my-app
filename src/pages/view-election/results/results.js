import React, { useEffect, useState } from "react";
import GridLayOut from "../../../components/grid_layout/GridLayout";
import ContestantCard from "../../../components/contestant-card/contestant-card";
import { useElectionServices } from "../../../redux/slices/election-slice/election-hook";
import { ArrowDownward, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import ResultsCard from "../../../components/results-card/results-card";
import { getAsObjectFromSession } from "../../../contants/libraries/easy";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../../contants/urls/rout-links";

export default function Results() {
  const { openedElection, getSingleElectionAsync } = useElectionServices();
  const navigate = useNavigate();
  const cachedOpenElection = () => getAsObjectFromSession("openedElection");
  useEffect(() => {
    if (
      openedElection === undefined &&
      cachedOpenElection()?.Id !== undefined
    ) {
      let electionData = cachedOpenElection();
      getSingleElectionAsync(
        electionData?.OrganizationId,
        electionData?.Id,
        "noToken"
      );
    } else {
      setTimeout(() => {
        if (openedElection === undefined) {
          navigate(ALL_URLS.orgDashoboard.url);
        }
      }, 500);
    }
  }, []);
  const [activeResults, setActiveResults] = useState([0]);
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
      let contestants = Array.isArray(openedElection?.Contestants)
        ? openedElection?.Contestants
        : [];
      let contestantsForThePosition =
        Array.isArray(contestants) &&
        contestants?.filter(
          (contestant) =>
            contestant?.Position?.toLowerCase() === item.Title.toLowerCase()
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
              {item.Title}
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
  return (
    <div className="w-full h-full flex flex-col">{ejectContestants()}</div>
  );
}
