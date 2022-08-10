import {
  AccountCircle,
  Apartment,
  ArrowLeft,
  DateRange,
  Download,
  HowToVote,
  Info,
  StackedBarChart,
  Timer,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import PopUpButton from "../../components/popup-button/popup-button";
import { useNavigate, useParams } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import Results from "./results/results";
import GeneralInfo from "./info/info";
import Contestants from "./contestant/contestants";

export default function ElectionView() {
  const [selectedTab, setSelectedTab] = useState();
  const { openedElection } = useElectionServices();
  const tabs = [
    {
      title: "Results",
      url: "results",
      icon: <StackedBarChart />,
      index: 1,
    },
    {
      title: "Contestants",
      url: "contestants",
      icon: <AccountCircle />,
      index: 1,
    },
    {
      title: "Statistics",
      url: "statistics",
      icon: <Info />,
      index: 1,
    },
  ];
  const navigate = useNavigate();
  const ejectTabs = () => {
    return tabs.map((item, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setSelectedTab(item.title);
            navigate(`${ALL_URLS.viewElectionDashboard.url}/${item.url}`);
          }}
          className={`${
            selectedTab === item.title ? "text-blue-400" : ""
          } w-[200px] cursor-pointer hover:text-slate-400 whitespace-nowrap flex justify-center items-center`}
        >
          {item.icon}
          <span className={`ml-2`}>{item.title}</span>
        </div>
      );
    });
  };

  const params = useParams();
  const getTabContent = () => {
    switch (params.tab.toLowerCase()) {
      case tabs[0].url: //Results
        return <Results />;
      case tabs[1].url: //Contestants
        return <Contestants />;
      case tabs[2].url: //General Inof
        return <GeneralInfo />;
      default:
        break;
    }
  };
  return (
    <div className="w-full h-full bg-white flex items-center flex-col">
      <div className="w-[90%] h-full bg-white flex justify-start flex-col">
        <div className="w-full h-[120px] min-h-[150px] flex flex-col justify-between items-start shadow-lg bg-white p-3 pb-5">
          <div className="flex w-full justify-between items-center px-2">
            <span className="flex items-center">
              <HowToVote style={{ fontSize: 60 }} className="text" />
              <div>
                <h1 className="text-3xl ml-2 font-bold">
                  {openedElection?.GeneralInfo?.Title}
                </h1>
                <div className="flex ml-3 text-gray-600 items-center">
                  <DateRange
                    style={{ fontSize: 20 }}
                    className=" text-xs mr-1"
                  />
                  <h4 className=" mr-2">
                    {openedElection?.GeneralInfo?.Start_Date}
                  </h4>{" "}
                  to
                  <span className="mr-2"></span>
                  <h4 className="">{openedElection?.GeneralInfo?.End_Date}</h4>,
                  <div className="flex ml-3 text-gray-600 items-center">
                    <Timer style={{ fontSize: 20 }} className=" text-xs mr-1" />
                    <h4 className=" mr-2">
                      {openedElection?.GeneralInfo?.TimeZone} -
                    </h4>{" "}
                    <h4 className=" mr-2">
                      {openedElection?.GeneralInfo?.Start_Time}
                    </h4>{" "}
                    to
                    <span className="mr-2"></span>
                    <h4 className="">
                      {openedElection?.GeneralInfo?.End_Time}
                    </h4>
                  </div>
                </div>
              </div>
            </span>
            <PopUpButton
              innerStyles={{
                // borderRadius: "0px",
                // boxShadow: "0px 0px 0px",
                backgroundColor: "transparent",
                color: "black",
                // display: "flex",
                // alignItems: "center",
              }}
              handleClick={() => {
                alert("This feature will soon be available");
                // navigate(ALL_URLS.orgDashoboard.url);
              }}
              noText={true}
            >
              <Download />
            </PopUpButton>
            <PopUpButton
              handleClick={() => {
                navigate(ALL_URLS.orgDashoboard.url);
              }}
              noText="Back to election list"
              innerStyles={{
                borderRadius: "0px",
                boxShadow: "0px 0px 0px",
                backgroundColor: "transparent",
                color: "blue",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowLeft className="animate-bounce " />
              <span className="animate-bounce ">Back to election list</span>
            </PopUpButton>
          </div>
          <div className="w-full  h-[20px] pr-5 text-xl  flex justify-between">
            {ejectTabs()}
          </div>
        </div>
        <div className="w-full mt-4 h-full flex flex-col justify-start overflow-y-auto items-center bg-gray-50">
          <div className="h-auto w-full  p-3 flex justify-start  flex-col items-center  ">
            {getTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
