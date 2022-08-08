import React, { useEffect } from "react";
import { useState } from "react";
import { saveObjectInLocalStorage } from "../../../contants/libraries/easy";
import { BASE_URL, END_POINTS, TOKEN } from "../../../contants/urls/urls";
import { errorToast, successToast } from "../../../components/toast/toastify";

export const useAuthServices = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [authOrganizationCode, setAuthOrganizationCode] = useState();
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
    return data;
  };

  const processVerification = (data) => {
    saveObjectInLocalStorage("verifiedUserData", data);
    return data;
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
        // Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method !== "GET" && !!data ? JSON.stringify(data) : undefined,
    })
      .then(async (response) => {
        // console.log(response);
        const responseData = await response?.json();
        if (response.ok) {
          // console.log(responseData);
          // if (action === "verify") {
          //   return processVerification(responseData);
          // } else if (action === "otp") {
          //   return processOTP(responseData);
          // }
          if (responseData.success === true) {
            if (action === "auth") {
              console.log(responseData);
              return processAuthentication(responseData);
            } else if (action === "verify") {
              return processVerification(responseData);
            } else if (action === "getData") {
              return processVerification(responseData.data);
            } else {
              return responseData.data;
            }
          } else {
            // Okay is true but success is false
            return responseData;
          }
        } else {
          // Okay is false and success is false
          errorToast("Uknown error, Please contact administrator");
          return responseData;
          // throw new Error();
        }
      })
      .catch((error) => {
        console.log(error);
        return {
          error: error,
          message: "Uknown error, check your internet connnection",
          ok: false,
          success: false,
        };
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginUser = async (data) => {
    return request(`${END_POINTS.loginToOrganization}`, "POST", data, "auth");
  };

  const logOut = (data) => {
    setLoginStatus(false);
    setUser("");
    window.location.assign("/");
    localStorage.removeItem("userData");
  };

  const forgotPassword = async (data) => {
    return request(`${END_POINTS.forgotPassword}`, "POST", data, "verify");
  };

  const initiatePasswordReset = async (data) => {
    return request(
      `${END_POINTS.initiatePasswordReset}`,
      "POST",
      data,
      "verify"
    );
  };

  const resetPassword = async (data) => {
    return request(`${END_POINTS.resetPassword}`, "PUT", data, "verify");
  };

  const setNewPassword = async (data) => {
    // alert("heyy");
    return request(END_POINTS.setNewPassword, "PUT", data, "verify");
  };

  const verifyLink = async (data) => {
    return request(END_POINTS.verifyLink, "POST", data, "verify");
  };

  const registerUser = async (data) => {
    return request(`${END_POINTS.registerOrganization}`, "POST", data, "auth");
  };

  const confirmEmail = async (data) => {
    return request(`${END_POINTS.confirmEmail}`, "POST", data, "verify");
  };

  const verifyVoterId = async (id, data) => {
    return request(`${END_POINTS.updateStaff}/${id}`, "POST", data);
  };

  return {
    isLoggedIn,
    loading,
    user,
    logOut,
    verifyLink,
    loginUser,
    initiateLogin,
    forgotPassword,
    registerUser,
    confirmEmail,
    resetPassword,
    initiatePasswordReset,
    setNewPassword,
    authOrganizationCode,
    setAuthOrganizationCode,
  };
};
