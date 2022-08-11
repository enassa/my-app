import { Apartment } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import PopUpButton from "../../components/popup-button/popup-button";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { User } from "../../components/contants/ui-data";
import { ORG_CODE, ORG_NAME, TOKEN } from "../../contants/urls/urls";
import { saveObjectInSession } from "../../contants/libraries/easy";
import ProgressBar from "../../components/progress bar/ProgressBar";

export default function OrgDashboard() {
  // console.log(User());
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

  const { elections, openElection, getElectionListAsync, resetElectionAsync } =
    useElectionServices();
  const navigate = useNavigate();

  const ejectElections = () => {
    return (
      Array.isArray(elections) &&
      elections.map((item, index) => {
        let percentageProgress =
          (parseInt(item?.TotalVoted) / parseInt(item?.NumberOfVoters)) * 100;
        return (
          <div
            key={index}
            className="w-full cursor-pointer rounded-sm bg-white mb-4 px-3 h-100 min-h-[200px] shadow flex justify-start items-center"
          >
            <div className="w-1/2 text-2xl">{item?.Title}</div>
            <div className=" bg-gray-100  mr-3  flex flex-col whitespace-nowrap rounded-lg p-3 px-5">
              <span>Total voted: {item?.TotalVoted}</span>
              <span>Expected votes: {item?.NumberOfVoters}</span>
            </div>
            <div>
              <ProgressBar
                circular
                progressThickness={7}
                progressColor={"#5F27CD"}
                containerColor="#E2E2E2"
                radius={40}
                progressPercentage={
                  isNaN(percentageProgress) ? 0 : percentageProgress
                }
              />
            </div>
            <div className="w-1/2 flex justify-end px-2 items-center">
              <PopUpButton
                handleClick={() => {
                  saveObjectInSession("openedElection", item);
                  resetElectionAsync(item);
                }}
                buttonText="Reset"
                innerStyles={{
                  marginRight: 20,
                }}
              />
              <PopUpButton
                handleClick={() => {
                  saveObjectInSession("openedElection", item);
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
  useEffect(() => {
    if (!elections?.length) {
      getElectionListAsync(ORG_CODE(), "noToken");
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[75%] h-full bg-white flex justify-start flex-col">
        <div className="w-full h-[100px] min-h-[100px] mt-[60px] flex flex-col justify-between items-start shadow-lg text-white bg-indigo-500 p-3">
          <div className="flex w-full justify-between items-center px-2">
            <span className="flex items-center">
              <Apartment />
              <h1 className="text-3xl ml-2 font-bold">
                {ORG_NAME()} - {ORG_CODE()}
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
        </div>
      </div>
    </div>
  );
}
