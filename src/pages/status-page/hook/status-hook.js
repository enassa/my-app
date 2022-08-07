import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../../contants/urls/rout-links";
export const useStatusHook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [statusData, setStatusData] = useState({
    state: undefined,
    title: "Title",
    buttontText: "Go home",
    subtitle: "subtitle",
    buttonTwoText: "",
    buttonOneUrl: "",
    buttonTwoUrl: "",
  });
  useEffect(() => {
    console.log(currentPath);
    if (statusData.state === undefined) {
      return;
    }
    if (currentPath === "/status-page") {
      return;
    }
    navigate(ALL_URLS.statusPage.url);
  }, [statusData]);

  const goToStatusPage = (data) => {
    setStatusData({ ...data });
    // navigate;
  };
  const resetStatusPage = () => {
    setStatusData({
      state: undefined,
      title: "Title",
      buttontText: "Go home",
      subtitle: "subtitle",
      buttonTwoText: "",
      buttonOneUrl: "",
      buttonTwoUrl: "",
    });
  };
  return {
    ...statusData,
    goToStatusPage,
    resetStatusPage,
  };
};
