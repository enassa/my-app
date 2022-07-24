import React from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, TOKEN } from "../constants/urls";
import toast from "../components/toast/toast";
import { errorToast } from "../components/toast/toastify";

const TrackerContext = React.createContext(undefined);
const TrackerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const request = async (
    path,
    method = "GET",
    data,
    accept = "application/json",
    dataType = "json"
  ) => {
    let url = `${BASE_URL.dev}${path}`;
    if (method === "GET" && !!data) {
      const params = new URLSearchParams(data);
      url += `?${params.toString()}`;
    }
    const getData = (formBody) => {
      if (dataType === "json") {
        return JSON.stringify(formBody);
      } else if (dataType === "formData") {
        return formBody;
      }
    };
    setLoading(true);
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${TOKEN.dev}`,
        "Content-Type": "application/json",
        Accept: accept,
      },
      body: method !== "GET" && !!data ? getData(data) : undefined,
    })
      .then(async (response) => {
        // console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          if (!!responseData) {
            // console.log(responseData);
            return responseData;
          } else {
            errorToast("Action was not successful");
          }
        } else {
          toast({
            type: "error",
            title: "Process failed",
            description: response?.message,
          });
          errorToast("Action was not successful");
          throw new Error(response?.statusText);
        }
      })

      .catch((error) => {
        toast({
          type: "error",
          title: "Failed to Process Request",
          description: error?.message,
        });
      })

      .finally(() => {
        setLoading(false);
      });
  };
  const getRiderTracker = async (organName, branch, riderId) => {
    return request(`${END_POINTS.getTracker}/${organName}/branch/${branch}/riderId/${riderId}`, 
    "GET");
  };

  const getOrderTracker = async (organName, branch, orderNo) => {
    return request(
      `${END_POINTS.getTracker}/${organName}/branch/${branch}/orderNo/${orderNo}`,
      "GET"
    );
  };

  return (
    <TrackerContext.Provider
      value={{
        loading,
        count,
        setCount,
        getOrderTracker,
        getRiderTracker,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
export const useTrackerServices = () => React.useContext(TrackerContext);
export default TrackerProvider;
