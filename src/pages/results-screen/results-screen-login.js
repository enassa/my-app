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
import AuthWrapper from "../auth-org/auth-wrapper";

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
    <AuthWrapper
      formTitle="RESULTS CHECK"
      titleIcon={<PieChart />}
      hideButton={true}
    >
      <FormGenerator
        fields={[
          {
            fieldType: FIELDS.password,
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
          background: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
          borderRadius: "5px",
        }}
        loading={loading}
        buttonText="Login"
      />
    </AuthWrapper>
  );
}
