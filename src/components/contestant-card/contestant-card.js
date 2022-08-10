import React, { useState } from "react";
import ClickAwayListener from "../click_away_listener/click-away-listener";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import {
  ArrowRightAlt,
  CheckCircle,
  HowToVote,
  NavigateNext,
} from "@mui/icons-material";
import { replaceUnderscoreWithSpace } from "../../contants/libraries/easy";

export default function ContestantCard({
  showPosition,
  info,
  position,
  voterCard,
  handleClick,
  selected,
  handleNextClick,
  isLast,
}) {
  const [hovered, setHovered] = useState();
  const { votingElection } = useElectionServices();
  const infoProps = !!info.Info ? Object.keys(info.Info) : [];
  const checkShowStatus = (ContestantDefTitle) => {
    console.log(votingElection);
    let contestantDef = votingElection?.ContestantDefinition?.find(
      (item) => item.Title === ContestantDefTitle
    );
    if (!!contestantDef) return contestantDef?.Show;
  };
  return (
    <div
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      className="w-[200px] z-[88] animate-rise hover:shadow-2xl hover:animate-rise rounded-2xl h-[200px] shadow-lg bg-yellow-100 py-3 px-2 cursor-pointer flex items-center flex-col relative"
    >
      {position && (
        <div className="absolute top-[-10px] right-[-35px] bg-blue-500 text-white rounded-full h-10 min-w-[70px] flex justify-center items-center shadow-lg">
          <strong>{position}</strong>
        </div>
      )}
      {position && (
        <div className="absolute text-xs top-[40px] right-[-35px] bg-blue-500 text-white rounded-full h-10  min-w-[70px] flex justify-center items-center shadow-lg">
          <strong>{info.VotesCount || 0}</strong>
        </div>
      )}
      <div
        style={{ backgroundImage: `url(${info?.Info?.ImageUrl})` }}
        className="w-[100px] h-[100px] min-w-[100px] min-h-[100px]  bg-yellow-50 rounded-full fit-bg mb-2"
      ></div>
      <div className="flex flex-col  justify-start items-center">
        <div>
          {/* <strong className="mb-2">Name: </strong> */}
          <div className="text-center overflow-hidden  text-ellipsis ">
            {info.Info.Name}
          </div>
        </div>
        {/* {info?.ExtraInfo?.map((extraInfo, index) => {
          return (
            <div className="w-full" key={index}>
              <strong className="mb-2 ">{extraInfo.Title}: </strong>
              <span>{extraInfo.Value}</span>
            </div>
          );
        })} */}
        {infoProps?.map((prop, index) => {
          console.log(prop);
          if (
            prop === "ImageInfo" ||
            prop === "ImageUrl" ||
            prop === "Name" ||
            prop === "Ballot_Number"
          )
            return;
          if (checkShowStatus(prop)) return;
          return (
            <div className="w-full flex flex-col items-center" key={index}>
              {/* <strong className="mb-2 ">
                {replaceUnderscoreWithSpace(prop)}:{" "}
              </strong> */}
              <span>{info?.Info[prop]}</span>
            </div>
          );
        })}
      </div>
      {(hovered && voterCard) || selected ? (
        <ClickAwayListener
          handleClickAway={() => {
            // alert("");
            //   showInfo("");
          }}
        >
          <div className="w-[200px] right-[0px] bottom-[-4px] h-[200px] absolute ">
            {/* <div style={{borderBottomColor:"aliceblue"}} className='arrow-up  transparent-border above-all '></div> */}
            <div
              //   style={{ borderRadius: "0px 50px 10px 10px " }}
              onClick={() => {
                handleClick && handleClick(info);
              }}
              className="w-full h-full flex justify-center items-center bg-backdrop2 z-[9000]   animate-rise shadow-blend rounded-lg top-[30px] "
            >
              {selected ? (
                <div className="text-white   text-md flex flex-col justify-center items-center">
                  <CheckCircle style={{ fontSize: 80 }} />
                  <span>{info.Info.Name}</span>
                  {!isLast && (
                    <div
                      style={{ borderRadius: "10px 50px 50px 10px" }}
                      className="absolute z-[999999] animate-rise bg-[#5F27CD] px-3 py-2 flex right-[-70px]"
                      onClick={() => {
                        handleNextClick();
                      }}
                    >
                      <span>Next</span>
                      <NavigateNext />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white  text-md flex flex-col justify-center items-center">
                  <HowToVote style={{ fontSize: 30 }} />
                  <span>Vote</span>
                  <span>{info.Position}</span>
                </div>
              )}
            </div>
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
