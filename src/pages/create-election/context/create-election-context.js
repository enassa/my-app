import React from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, TOKEN } from "../../../contants/urls/urls";
import toast from "../components/toast/toast";
import { errorToast } from "../components/toast/toastify";

const ElectionContext = React.createContext(undefined);
const ElectionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const request = async (
    path,
    method = "GET",
    data,
    token = "",
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
  const getElectionList = async (organName) => {
    return request(`${END_POINTS.getElectionList}`, "GET");
  };

  const createElection = async (data) => {
    return request(END_POINTS.createElection, "POST", data);
  };

  const updateElection = async (data) => {
    return request(`${END_POINTS.updateElection}`, "PUT", data);
  };
  const resetElection = async (data) => {
    return request(`${END_POINTS.resetElection}`, "PUT", data);
  };
  const deleteElection = async (data) => {
    return request(`${END_POINTS.deleteOrganization}`, "DELETE", data);
  };

  return (
    <ElectionContext.Provider
      value={{
        loading,
        createElection,
        updateElection,
        resetElection,
        deleteElection,
        getElectionList,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
export const useElectionServices = () => React.useContext(ElectionContext);
export default ElectionProvider;
