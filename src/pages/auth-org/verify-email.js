import React, { useRef, useState } from "react";
import { HowToVote, HowToVoteTwoTone, Lock } from "@mui/icons-material";
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
import AuthWrapper from "./auth-wrapper";

export default function EmailVerification() {
  const navigate = useNavigate();
  const { loading, forgotPassword } = useAuthServices();

  const handleSubmit = (data) => {
    delete data.password_confirm;
    forgotPassword(data)
      .then((res) => {
        console.log(res);
        if (res?.success) {
          navigate(ALL_URLS.succesfullEmailVerification.url);
        } else {
          errorToast(res?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthWrapper
      returnText={"Back to login"}
      returnUrl={ALL_URLS.loginToOrganization.url}
      buttonText="Sign in"
      buttonUrl={ALL_URLS.loginToOrganization.url}
      formTitle="Email Verification"
    >
      <FormGenerator
        fields={[
          {
            fieldType: FIELDS.input,
            name: "email",
            label: "Email",
            placeholder: "Email",
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
      />
    </AuthWrapper>
  );
}
