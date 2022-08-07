import React, { useEffect } from "react";
import { useState } from "react";
// import { errorToast, successToast } from "../components/toast/toastify";
import { BASE_URL, END_POINTS, TOKEN } from "../../../contants/urls/urls";
import {
  elections,
  organizations,
} from "../../../components/contants/dummy-data";
import { saveObjectInLocalStorage } from "../../../contants/libraries/easy";

const ResultScreenContext = React.createContext(undefined);
const ResultScreenProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [electionData, setUser] = useState();
  const [isLoggedIn, setLoginStatus] = useState(false);

  const initiateLogin = async () => {
    let userData = localStorage.getItem("userData");
    if (!!userData) {
      setLoginStatus(true);
      setUser(userData);
      return true;
    } else {
      setLoginStatus(false);
      return false;
    }
  };

  useEffect(() => {
    initiateLogin();
  });

  const processAuthentication = (data) => {
    setLoginStatus(true);
    setUser(data);
    saveObjectInLocalStorage("userData", data);
    return true;
  };

  const processVerification = (data) => {
    saveObjectInLocalStorage("verifiedUserData", data);
    return { ok: true, data: data };
  };
  const processOTP = (data) => {
    saveObjectInLocalStorage("otpData", data);
    return { ok: true, data: data };
  };

  const request = async (path, method = "GET", data, action) => {
    let url = `${BASE_URL.dev}${path}`;
    if (method === "GET" && !!data) {
      const params = new URLSearchParams(data);
      url += `?${params.toString()}`;
    }
    setLoading(true);
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          if (action === "verify") {
            return processVerification(responseData);
          } else if (action === "otp") {
            return processOTP(responseData);
          }

          if (!!responseData.data) {
            if (action === "auth") {
              // successToast("Authentication was successful");
              console.log(responseData);
              return processAuthentication(responseData.data);
            } else if (action === "verify") {
              return processVerification(responseData);
            } else if (action === "getData") {
              return processVerification(responseData.data);
            } else {
              return responseData.data;
            }
          } else {
            // errorToast("Authentication was not successful");
          }
        } else {
          // errorToast("Authentication was not successful");
          throw new Error(response?.statusText);
        }
      })

      .catch((error) => {
        // errorToast(
        //   "Authentication failed, please check your internet connection"
        // );
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const loginToResults = async (data) => {
    setLoading(true);
    setTimeout(() => {
      const organization = organizations?.find(
        (item) => (item.Id = data.orgId)
      );
      if (organization === -1) {
        return {
          message: "The organization id is invalid",
          ok: true,
          success: false,
          status: 200,
        };
      }
      // let election = organization?.elections.find((item) => (item.Id = data.electionId));
      const election = elections.find((item) => (item.Id = data.electionId));
      if (election === -1) {
        return {
          message: "The election id is invalid",
          ok: true,
          success: false,
          status: 200,
        };
      }
      const voterIdExist = election.ResultrIds.find(
        (item) => (item.Id = data.voterId)
      );
      if (voterIdExist === -1) {
        return {
          message: "Your voter id is invalid",
          ok: true,
          success: false,
          status: 200,
        };
      }

      setLoading(false);
      processAuthentication(electionData);
    }, 300);
    // return request(`${END_POINTS.loginToResultScreen}`, "POST", data, "auth");
  };
  const castResult = async (data) => {
    return request(`${END_POINTS.castResult}`, "POST", data);
  };

  return (
    <ResultScreenContext.Provider
      value={{
        isLoggedIn,
        loading,
        electionData,
        loginToResults,
        castResult,
        initiateLogin,
      }}
    >
      {children}
    </ResultScreenContext.Provider>
  );
};
export const useResultScreenServices = () =>
  React.useContext(ResultScreenContext);
export default ResultScreenProvider;
