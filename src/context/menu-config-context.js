import React from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, TOKEN } from "../constants/urls";
import toast from "../components/toast/toast";
import { errorToast } from "../components/toast/toastify";

const MenuContext = React.createContext(undefined);
const MenuProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("options");
  const menus = ["Main", "Options", "Sides", "Sauces", "Proteins", "Drinks"];
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
  const getMenuList = async (organName) => {
    return request(`${END_POINTS.getMenuList}/${organName}`, "GET");
  };
  const getMenuBranchList = async (organName, branch) => {
    return request(`${END_POINTS.getMenuList}/${organName}/branch/${branch}`, "GET");
  };
  const getMenuByType = async (type, organName) => {
    return request(
      `${END_POINTS.getMenuByType}/type/${type}/organization/${organName}`,
      "GET"
    );
  };
  const getMenuByOrgBranch = async (organName, branch) => {
    return request(
      `${END_POINTS.getMenuByType}/${organName}/branch/${branch}`,
      "GET"
    );
  };

  const createMenuItem = async (data) => {
    return request(END_POINTS.createMenu, "POST", data);
  };
  const updateMenuItem = async (data) => {
    return request(`${END_POINTS.editMenuItem}`, "PUT", data);
  };
  const deleteMenuItem = async (data) => {
    return request(`${END_POINTS.deleteMenuItem}`, "DELETE", data);
  };
  return (
    <MenuContext.Provider
      value={{
        loading,
        type,
        menus,
        setType,
        createMenuItem,
        getMenuList,
        getMenuBranchList,
        deleteMenuItem,
        updateMenuItem,
        getMenuByType,
        getMenuByOrgBranch
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
export const useMenuServices = () => React.useContext(MenuContext);
export default MenuProvider;
