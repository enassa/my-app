import { Apartment } from "@mui/icons-material";
import React from "react";

export default function OrgDashboard() {
  const election = [
    {
      name: "Prephecy results",
      startDate: "20-07-2022",
      endDate: "25-07-2022",
      createdOn: "25-07-2022",
      createdBy: "25-07-2022",
      voteCount: 5000,
      contestantsCount: 50,
      positionsCount: 30,
      positions: [],
    },
  ];
  const ejectElections = () => {};
  return (
    <div className="w-full h-full bg-white flex justify-start flex-col">
      <div className="w-full h-[200px] flex flex-col justify-between items-start shadow-lg bg-white p-3">
        <div className="flex w-full justify-between items-center px-2">
          <span className="flex items-center">
            <Apartment />
            <h1 className="text-3xl ml-2 font-bold">
              Achimota senior high school
            </h1>
          </span>
          <button className="text-gray-100 shadow-lg p-2 bg-black rounded-lg">
            Create election
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center bg-gray-50">
        <div className="h-full w-full"></div>
      </div>
    </div>
  );
}
