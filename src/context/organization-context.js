import React from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, TOKEN } from "../constants/urls";
import toast from "../components/toast/toast";
import { errorToast } from "../components/toast/toastify";

const OrgContext = React.createContext(undefined);
const OrgProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("options");
  const Orgs = ["Main", "Options", "Sides", "Sauces", "Proteins", "Drinks"];
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
  const getOrgList = async (organName) => {
    return request(`${END_POINTS.getOrgList}`, "GET");
  };

  const getOrgByType = async (type, organName) => {
    return request(
      `${END_POINTS.getOrgByType}/type/${type}/organization/${organName}`,
      "GET"
    );
  };
  const getOrgByOrgBranch = async (organName, branch) => {
    return request(
      `${END_POINTS.getOrgByType}/${organName}/branch/${branch}`,
      "GET"
    );
  };

  const createOrgItem = async (data) => {
    return request(END_POINTS.createOrg, "POST", data);
  };
  const updateOrgItem = async (data) => {
    return request(`${END_POINTS.editOrgItem}`, "PUT", data);
  };
  const deleteOrgItem = async (data) => {
    return request(`${END_POINTS.deleteOrganization}`, "DELETE", data);
  };
  return (
    <OrgContext.Provider
      value={{
        loading,
        type,
        Orgs,
        setType,
        createOrgItem,
        getOrgList,
        deleteOrgItem,
        updateOrgItem,
        getOrgByType,
        getOrgByOrgBranch,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};
export const useOrgServices = () => React.useContext(OrgContext);
export default OrgProvider;
