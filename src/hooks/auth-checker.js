import { useEffect, useState } from "react";
import { useAuthServices } from "../pages/auth-org/context/auth-context";
import { getAsObjectFromLocalStorage } from "../libraries/easy";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../components/contants/rout-links";

export const useAuthChecker = (newUrl) => {
  const navigate = useNavigate();
  const { isLoggedIn, initiateLogin } = useAuthServices();

  const checkAuth = () => {
    if (!isLoggedIn) {
      let userObjectIsPresent = getAsObjectFromLocalStorage("userData");
      const setUserData = async () => {
        const response = await initiateLogin();
        if (response) {
          return true;
        }
      };
      if (!!userObjectIsPresent) {
        setUserData();
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  return { newUrl, checkAuth };
};
