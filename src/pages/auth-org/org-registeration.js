import { HowToVoteTwoTone, Lock } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { randomImages } from "../../components/contants/ui-data";
import SimpleNavbar from "../../components/simple-nav-bar/simple-navbar";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
import FormGenerator from "../../contants/libraries/FormGenerator/FormGenerator";
import { fontFamily3 } from "../../components/contants/ui-constants";
import { FIELDS } from "../../contants/libraries/FormGenerator/FormGeneratorFields";
import { useNavigate } from "react-router-dom";

export default function OrgRegisteration() {
  const [typeOfUser, setTypeOfUser] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const videoRef = useRef();

  const navigate = useNavigate();
  const handleSubmit = (data, resetForm, completed) => {
    console.log(data);
  };

  return (
    <div
      style={{ backgroundImage: `url(${randomImages})` }}
      className="w-full  fit-bg h-full bg-gray-500 flex  flex-col justify-start items-center"
    >
      <div
        style={{ backgroundColor: "rgb(255,255,255, 0.98)" }}
        className="w-full  h-full z-[500000] flex flex-col justify-center items-center"
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
              navigate("/login");
            }}
            buttonOneText="Sign in"
            noLogo={true}
            noMenuList
          />
        </div>
        <div
          style={{
            color: "#333",
            fontSize: 50,
            fontWeight: "bolder",
            fontFamily: fontFamily5,
          }}
          className="  fixed left-0 top-[50px] justify-center h-[50px] items-center text-lg"
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
          <div className="w-[400px] h-auto j-space-around items-center flex flex-col  bg-white shadow-blend p-[30px]">
            <div
              style={{ fontSize: 20, fontFamily: fontFamily3, color: "black" }}
              className="flex justify-center items-center"
            >
              <Lock /> Register
            </div>
            <div className="w-full  animate-rise">
              <FormGenerator
                fields={[
                  {
                    fieldType: FIELDS.input,
                    name: "Name",
                    label: "Name of organization",
                    placeholder: "Name of Organization",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.input,
                    name: "Email",
                    label: "Organization Email",
                    placeholder: "Mobile number",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.input,
                    name: "Contact",
                    label: "Organization Email",
                    placeholder: "Mobile number",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.password,
                    name: "Password",
                    label: "Password",
                    placeholder: "Password",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.password,
                    name: "Password_confirm",
                    label: "Password confirmation",
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
                loading={true}
                serverReport={"Error message"}
                reportState={false}
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
