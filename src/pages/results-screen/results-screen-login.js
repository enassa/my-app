import {
  HowToReg,
  HowToVoteTwoTone,
  Lock,
  PieChart,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { randomImages } from "../../components/contants/ui-data";
import SimpleNavbar from "../../components/simple-nav-bar/simple-navbar";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
import FormGenerator from "../../contants/libraries/FormGenerator/FormGenerator";
import { fontFamily3 } from "../../components/contants/ui-constants";
import { FIELDS } from "../../contants/libraries/FormGenerator/FormGeneratorFields";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import {
  decodeFromB64,
  saveObjectInSession,
} from "../../contants/libraries/easy";

export default function ResultScreenLogin() {
  const { loading, verifyVoterIdAsync, castVoteIdAsync, resultsLoginAsync } =
    useElectionServices();
  const location = useLocation();
  saveObjectInSession("cachedResultsUrl", { url: location.pathname });
  const params = useParams();
  const orgCode = decodeFromB64(params?.orgCode);
  const electionId = decodeFromB64(params?.electionId);
  const token = params?.token;

  const navigate = useNavigate();
  const handleSubmit = (data, resetForm, completed) => {
    console.log(data);
    if (
      data?.password !== "" &&
      orgCode !== "" &&
      electionId !== "" &&
      orgCode &&
      token !== ""
    ) {
    }
    resultsLoginAsync({
      password: data?.password,
      orgCode,
      electionId,
      token,
    });
  };
  return (
    <div
      style={{ backgroundImage: `url(${randomImages})` }}
      className="w-full  fit-bg h-full bg-gray-500 flex  flex-col justify-start items-center"
    >
      <div
        style={{ backgroundColor: "rgb(255,255,255, 0.98)" }}
        className="w-full  h-full z-[5] flex flex-col justify-center items-center"
      >
        <div
          style={{
            color: "#333",
            fontSize: 50,
            fontWeight: "bolder",
            fontFamily: fontFamily5,
          }}
          className=" fixed left-0 top-[50px] flex justify-center h-[50px] items-center text-lg"
        >
          <span
            onClick={() => {
              navigate("/");
            }}
            className="flex cursor-pointer justify-start items-center px-4"
          >
            <HowToVoteTwoTone className="scale-150 mr-3 gradient-icon" />
            <span
              style={{
                background: "linear-gradient(270deg,#e4bc2a,#db5151)",
                backgroundClip: "text",
                webkitBackgroundClip: "text",
                color: "rgba(0,0,0,.2)",
              }}
              className="text-"
            >
              Vote++
            </span>{" "}
          </span>
        </div>
        <div className="flex shadow-blend flex-col rounded-lg overflow-hidden">
          <div
            style={{
              background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
            }}
            className="w-full h-[5px] animate-bgChange"
          ></div>
          <div className="w-[400px] h-[300px] j-space-around items-center flex flex-col  bg-white shadow-blend p-[30px]">
            <div
              style={{ fontSize: 20, fontFamily: fontFamily3, color: "black" }}
              className="flex justify-center items-center mb-[40px]"
            >
              <PieChart /> RESULTS CHECK
            </div>
            <div className="w-full  animate-rise">
              <FormGenerator
                fields={[
                  {
                    fieldType: FIELDS.input,
                    name: "password",
                    label: "Enter election password",
                    placeholder: "Password",
                    required: true,
                  },
                ]}
                handleOnSubmit={(data, resetFunc, completed) => {
                  handleSubmit(data, resetFunc, completed);
                }}
                buttonStyles={{
                  backgroundColor: "black",
                  background:
                    "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
                  borderRadius: "5px",
                }}
                loading={loading}
                buttonText="Login"
              />
              <div
                style={{ fontFamily: fontFamily3 }}
                className="justify-between"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
