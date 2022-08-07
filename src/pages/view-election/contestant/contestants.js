import React from "react";
import GridLayOut from "../../../components/grid_layout/GridLayout";
import ContestantCard from "../../../components/contestant-card/contestant-card";
import { useElectionServices } from "../../../redux/slices/election-slice/election-hook";
import { useSelector } from "react-redux";

export default function Contestants() {
  const { openedElection } = useElectionServices();
  //   console.log("====", openedElection);
  const ejectContestants = () => {
    return !!openedElection && Array.isArray(openedElection?.Contestants)
      ? openedElection.Contestants.map((item, index) => {
          return <ContestantCard key={index} info={item} />;
        })
      : null;
  };
  return (
    <div className="w-full h-full">
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
  );
}
