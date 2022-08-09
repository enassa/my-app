import { Apartment } from "@mui/icons-material";
import React from "react";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import PopUpButton from "../../components/popup-button/popup-button";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";

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
  const { elections, openElection } = useElectionServices();
  const navigate = useNavigate();
  const ejectElections = () => {
    return (
      Array.isArray(elections) &&
      elections.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full cursor-pointer rounded-sm bg-blue-50 mb-4 px-3 h-100 min-h-[200px] shadow flex justify-start items-center"
          >
            <div className="w-1/2">{item?.GeneralInfo?.Title}</div>
            <div className="w-1/4"></div>
            <div className="w-1/4 flex justify-end px-2 items-center">
              <PopUpButton
                handleClick={() => {
                  openElection(item);
                }}
                buttonText="View"
              />
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div className="w-full h-full bg-white flex justify-start flex-col">
      <div className="w-full h-[200px] min-h-[200px] flex flex-col justify-between items-start shadow-lg bg-white p-3">
        <div className="flex w-full justify-between items-center px-2">
          <span className="flex items-center">
            <Apartment />
            <h1 className="text-3xl ml-2 font-bold">
              Achimota senior high school
            </h1>
          </span>
          <PopUpButton
            handleClick={() => {
              navigate(ALL_URLS.createElection.url);
            }}
            buttonText="Crete election"
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start overflow-y-auto items-center bg-gray-50">
        <div className="h-auto w-full  p-3 flex justify-start  flex-col items-center  ">
          {ejectElections()}
        </div>
        jj
      </div>
    </div>
  );
}
