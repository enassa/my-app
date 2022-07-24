import React from "react";
import { useState } from "react";
import { BASE_URL, END_POINTS, ORG_CODE, TOKEN } from "../constants/urls";
import toast from "../components/toast/toast";

const AccountsContext = React.createContext(undefined);
const AccountsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const request = async (path, method = "GET", data) => {
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
        // console.log(response);
        if (response.ok) {
          const responseData = await response.json();
          if (!!responseData) {
            // console.log(responseData);
            return responseData;
          } else {
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
  const getUsers = async (page = "0", size = "20") => {
    return request(
      `${END_POINTS.getStaff}/organizationCode/${ORG_CODE()}`,
      "GET"
    );
  };
  const getUserById = async (id) => {
    return request(`${END_POINTS.getUserById}${id}`, "GET");
  };
  const createUser = async (data) => {
    return request(END_POINTS.createStaff, "POST", data);
  };
  const updateUserById = async (id, data) => {
    console.log(id, data);
    return request(`${END_POINTS.updateStaff}/${id}`, "PUT", data);
  };
  const updateUserByData = async (data) => {
    console.log(data);
    return request(`${END_POINTS.updateStaff}`, "PUT", data);
  };
  const deleteUserById = async (data) => {
    return request(`${END_POINTS.deleteStaff}`, "DELETE", data);
  };
  return (
    <AccountsContext.Provider
      value={{
        loading,
        getUsers,
        deleteUserById,
        getUserById,
        createUser,
        updateUserById,
        updateUserByData,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
export const useAccountsServices = () => React.useContext(AccountsContext);
export default AccountsProvider;
