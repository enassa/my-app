import React, { Component } from "react";
import voteMatter from "../../assets/images/voicematters.gif";
import PopUpButton from "../../components/popup-button/popup-button";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleClick = (action) => {
    if (action === "register") {
      navigate(ALL_URLS.registerOrganization.url);
    } else if (action === "login") {
      navigate(ALL_URLS.loginToOrganization.url);
    }
  };

  return (
    <div className={`w-full h-full flex justify-start flex-col`}>
      <div
        style={{ background: "linear-gradient(270deg,#e4bc2a,#db5151)" }}
        className="w-full h-[300px] bg-red-500 justify-center flex items-center"
      >
        <img
          style={{ height: "60%", transform: "scaleX(-1)" }}
          alt=""
          src={voteMatter}
        />
        <span
          style={{ fontSize: 40, fontFamily: fontFamily5 }}
          className="text-white"
        >
          The Digital Vote conductor
        </span>
        <img
          style={{ height: "60%", transform: "scaleX(1)" }}
          alt=""
          src={voteMatter}
        />
        {/* <div style={{top:"10%", left:"25%", right:"25%"}} className={`w-1/2 height-80-cent rounded-lg  bg-white  absolute shadow-blend`}></div> */}
      </div>
      <div className="w-full flex top-0 bg right-0 pb-[40px] h-full absolute justify-evenly items-end">
        <div
          style={{ width: "459px" }}
          className={`flex justify-center items-center flex-col w-1/2 h-[70%] cursor-pointer  rounded-lg  bg-white shadow-blend`}
        >
          <PopUpButton
            handleClick={() => {
              handleClick("register");
            }}
            buttonText="Register"
            innerStyles={{
              padding: "20px 70px",
              background: "linear-gradient(315deg, #f5d020 0%, #f53803 74%)",
            }}
            outerStyles={{ marginBottom: "40px" }}
          />
          <PopUpButton
            handleClick={() => {
              handleClick("login");
            }}
            buttonText="Log in"
            innerStyles={{
              padding: "20px 70px",
              background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
            }}
            outerStyles={{ marginBottom: "40px" }}
          />
          <PopUpButton
            handleClick={() => {
              navigate(ALL_URLS.loginToVoteScreen.url);
            }}
            buttonText="Vote"
            innerStyles={{
              padding: "20px 70px",
              background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
            }}
            outerStyles={{ marginBottom: "40px" }}
          />
          <PopUpButton
            handleClick={() => {
              navigate(ALL_URLS.loginToResultsScreen.url);
            }}
            buttonText="Results"
            innerStyles={{
              padding: "20px 70px",
              background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
            }}
            outerStyles={{ marginBottom: "40px" }}
          />
        </div>
        {/* <div  style={{width:"309px"}} className={` w-1/2 height-80-cent cursor-pointer rounded-lg  bg-white shadow-blend`}></div>
                    background-color: #a4508b;
                    background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);

                    <div  style={{width:"309px"}} className={` w-1/2 height-80-cent cursor-pointer rounded-lg  bg-white shadow-blend`}></div> */}
      </div>
    </div>
  );
}
