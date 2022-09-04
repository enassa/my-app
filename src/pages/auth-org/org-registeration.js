import { HowToVote, HowToVoteTwoTone, Lock } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { randomImages } from "../../components/contants/ui-data";
import SimpleNavbar from "../../components/simple-nav-bar/simple-navbar";
import { fontFamily5 } from "../../contants/ui-contants/ui-constants";
import FormGenerator from "../../contants/libraries/FormGenerator/FormGenerator";
import { fontFamily3 } from "../../components/contants/ui-constants";
import { FIELDS } from "../../contants/libraries/FormGenerator/FormGeneratorFields";
import { useNavigate } from "react-router-dom";
import { useAuthServices } from "./context/auth-context";
import { ALL_URLS } from "../../contants/urls/rout-links";
import { useStatusHook } from "../status-page/hook/status-hook";
import { errorToast } from "../../components/toast/toastify";
import Koinologo from "../../components/koino-logo/koino-logo";

export default function OrgRegisteration() {
  const navigate = useNavigate();
  const { loading, registerUser } = useAuthServices();

  const handleSubmit = (data) => {
    delete data.password_confirmation;
    registerUser(data)
      .then((res) => {
        console.log(res);
        if (res?.success) {
          navigate(ALL_URLS.succesfulRegistration.url);
        } else {
          errorToast(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{ backgroundImage: `url(${randomImages})` }}
      className="w-full  fit-bg h-auto md:h-full bg-gray-500 flex  flex-col justify-start items-center animate-rise overflow-y-scroll"
    >
      <div
        style={{ backgroundColor: "rgb(255,255,255, 0.98)" }}
        className="w-full h-auto sm:h-full  z-[55] flex flex-col justify-center items-center"
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

        <Koinologo />
        <div className="flex xsm:mt-[25%] md:mt-[0%]  w-[90%] md:w-auto sm:shadow-blend shadow-none flex-col rounded-lg overflow-hidden">
          <div
            style={
              {
                // background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
              }
            }
            className="w-full h-[5px] "
          ></div>
          <div className="md:w-[400px] h-auto j-space-around items-center flex flex-col  bg-transparent xs:bg-white shadow-none sm:shadow-blend p-[30px]">
            <div
              style={{ fontSize: 20, fontFamily: fontFamily3, color: "black" }}
              className=" hidden sm:flex justify-center items-center"
            >
              <Lock /> Register
            </div>
            <div className="w-full  animate-rise">
              <FormGenerator
                fields={[
                  {
                    fieldType: FIELDS.input,
                    name: "orgName",
                    label: "Name of organization",
                    placeholder: "Name of Organization",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.input,
                    name: "email",
                    label: "Organization Email",
                    placeholder: "Mobile number",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.input,
                    name: "contact",
                    label: "Organization contact",
                    placeholder: "Mobile number",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.password,
                    name: "password",
                    label: "Password",
                    placeholder: "Password",
                    required: true,
                  },
                  {
                    fieldType: FIELDS.password,
                    name: "password_confirmation",
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
                loading={loading}
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
