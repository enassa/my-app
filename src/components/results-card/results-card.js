import React, { useState } from "react";
import ClickAwayListener from "../click_away_listener/click-away-listener";
import {
  ArrowRightAlt,
  CheckCircle,
  HowToVote,
  NavigateNext,
  Star,
} from "@mui/icons-material";
import { replaceUnderscoreWithSpace } from "../../contants/libraries/easy";
export default function ResultsCard({
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
  //   console.log("000", VotesCount);
  const getPositionDesc = (pos) => {
    let a = {};
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
        <div className="absolute top-[-10px] right-[-35px] bg-green-700 text-white rounded-full h-10 min-w-[70px] flex justify-center items-center shadow-lg">
          <Star style={{ fontSize: 20 }} />
          <strong>{position}</strong>
        </div>
      )}
      {position && (
        <div className="absolute text-xs top-[40px] right-[-35px] bg-blue-500 text-white rounded-full h-10  min-w-[70px] flex justify-center items-center shadow-lg">
          <strong>
            {isNaN(parseInt(info.VotesCount)) ? 0 : parseInt(info.VotesCount)}
          </strong>
        </div>
      )}
      <div
        style={{ backgroundImage: `url(${info?.Info?.ImageUrl})` }}
        className="w-[100px] h-[100px]  bg-yellow-50 rounded-full fit-bg mb-2"
      ></div>
      <div className="flex flex-col  justify-start items-center">
        <div>
          {/* <strong className="mb-2">Name: </strong> */}
          <div className="text-center overflow-hidden  text-ellipsis ">
            {info?.Info?.Name}
          </div>
        </div>
        {Object.keys(info?.Info)?.map((prop, index) => {
          let obj = info?.Info;
          if (prop === "ImageUrl") return;
          if (prop === "ImageInfo") return;
          if (prop === "Ballot_Number") return;
          if (prop === "Name") return;
          return (
            <div className="w-full flex flex-col items-center" key={index}>
              {/* <strong className="mb-2 ">
                {replaceUnderscoreWithSpace(prop)}:{" "}
              </strong> */}
              <span>{obj[prop]}</span>
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
            ></div>
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}

// const b ={0:"th",1:'st',2:"nd",3:"rd",4:"th",5:'th',6:"6th",7:"th",8:"th",9:"th"}
// let a = [23,12,9,6,7,78,54]
// let checkPosition = (num) => {
//   let numToArr =  `${num}`.split('')
//   let lastNum = numToArr[numToArr.length -1]
//   return b[`${numToArr[numToArr.length-1]}`]
// }
// for(let i = 0; i<a.length; i++){
//   let num = a[i]
//   console.log(checkPosition(num))
//   }
