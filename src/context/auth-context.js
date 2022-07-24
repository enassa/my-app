import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, TOKEN } from "../constants/urls";
import toast from "../components/toast/toast";
import {
  getAsObjectFromLocalStorage,
  saveObjectInLocalStorage,
} from "../libraries/easy";
import { errorToast, successToast } from "../components/toast/toastify";

const AuthContext = React.createContext(undefined);
const AuthServiceProvider = ({ children }) => {
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
              successToast("Authentication was successful");
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
            errorToast("Authentication was not successful");
          }
        } else {
          toast({
            type: "error",
            title: "Process failed",
            description: response?.message,
          });
          throw new Error(response?.statusText);
        }
      })

      .catch((error) => {
        errorToast(
          "Authentication failed, please check your internet connection"
        );
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const loginUser = async (data) => {
    return request(`${END_POINTS.login}`, "POST", data, "auth");
  };

  const logOut = (data) => {
    setLoginStatus(false);
    setUser("");
    window.location.assign("/");
    localStorage.removeItem("userData");
  };

  const verifyEmail = async (email) => {
    return request(`${END_POINTS.verifyEmail}/${email}`, "GET", null, "verify");
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
  const verifyOTP = async (data) => {
    return request(END_POINTS.verifyOTP, "POST", data, "otp");
  };

  const registerUser = async (id, data) => {
    return request(`${END_POINTS.updateStaff}/${id}`, "POST", data);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        user,
        logOut,
        verifyOTP,
        loginUser,
        verifyEmail,
        initiateLogin,
        registerUser,
        resetPassword,
        initiatePasswordReset,
        setNewPassword,
        authOrganizationCode,
        setAuthOrganizationCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthServices = () => React.useContext(AuthContext);
export default AuthServiceProvider;
