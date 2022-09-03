import { HowToVote, HowToVoteTwoTone, Lock } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { randomImages } from "../../components/contants/ui-data";
import SimpleNavbar from "../../components/simple-nav-bar/simple-navbar";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
import FormGenerator from "../../contants/libraries/FormGenerator/FormGenerator";
import { fontFamily3 } from "../../components/contants/ui-constants";
import { FIELDS } from "../../contants/libraries/FormGenerator/FormGeneratorFields";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useAuthServices } from "./context/auth-context";
import { errorToast } from "../../components/toast/toastify";
import Koinologo from "../../components/koino-logo/koino-logo";

export default function AuthWrapper({
  children,
  buttonUrl,
  buttonText,
  returnText,
  returnUrl,
  formHeight,
  formTitle,
}) {
  const navigate = useNavigate();
  const { loading, loginUser } = useAuthServices();

  return (
    <div
      style={{ backgroundImage: `url(${randomImages})` }}
      className="w-full  fit-bg h-full bg-gray-500 flex  flex-col justify-start items-center animate-rise"
    >
      {/* <video ref={this.videoRef} loop autoPlay muted  style={{position:'fixed', right: 0, bottom: 0, minWidth: '100vw', minHeight: '100vh'}} >
                    <source src={bgvideo} type="video/mp4"/>
                </video> */}
      <div
        style={{ backgroundColor: "rgb(255,255,255, 0.98)" }}
        className="w-full  h-full z-[55] flex flex-col justify-center items-center"
      >
        <div className="fixed top-0 left-0 w-full ">
          <SimpleNavbar
            buttonOneStyles={{
              color: "white",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: "bolder",
              background: "linear-gradient(270deg,#e4bc2a,#db5151)",
            }}
            handleButtonOneClick={() => {
              navigate(buttonUrl || "Sign in");
            }}
            buttonOneText={buttonText}
            noLogo={true}
            noMenuList
          />
        </div>
        <Koinologo />
        <div className="flex w-[90%] md:w-auto shadow-blend flex-col rounded-lg overflow-hidden">
          <div
            style={
              {
                // background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
              }
            }
            className="w-full h-[5px] bg-white manimate-bgChange"
          ></div>
          <div
            style={{ height: formHeight }}
            className="w-full md:w-[400px]  j-space-around items-center flex flex-col  md:bg-white  shadow-blend p-[30px]"
          >
            <div
              style={{ fontSize: 20, fontFamily: fontFamily3, color: "black" }}
              className="flex justify-center items-center mb-[40px]"
            >
              <Lock /> {formTitle}
            </div>
            {returnText !== "" && (
              <div className="w-full  animate-rise relative">
                {children}
                <div
                  style={{ fontFamily: fontFamily3 }}
                  className="justify-between absolute bottom-[30px]"
                >
                  <span
                    onClick={() => {
                      navigate(returnUrl || "#");
                    }}
                    style={{ color: "#8E35E9" }}
                    className="cursor-pointer"
                  >
                    {returnText}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
