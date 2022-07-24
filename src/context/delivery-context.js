import React, { useEffect } from "react";
import { useState } from "react";
import {
  BASE_URL,
  END_POINTS,
  TOKEN,
  BRANCH,
  ORG_NAME,
} from "../constants/urls";
import toast from "../components/toast/toast";
import { errorToast, successToast } from "../components/toast/toastify";

const DeliveryCostContext = React.createContext(undefined);
const DeliveryCostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
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

  //Delivery cost
  const createDeliveryCost = async (data) => {
    return request(`${END_POINTS.createDeliveryCost}`, "POST", data);
  };
  const getDeliveryCost = async () => {
    return request(`${END_POINTS.getDeliveryCost}/${ORG_NAME()}`, "GET");
  };
  const getBranchDeliveryCost = async () => {
    return request(
      `${END_POINTS.getDeliveryCost}/${ORG_NAME()}/branch/${BRANCH()}`,
      "GET"
    );
  };
  const editDeliveryCost = async (data) => {
    return request(`${END_POINTS.editDeliveryCost}`, "PUT", data);
  };
  const deleteDeliveryCost = async (data) => {
    return request(`${END_POINTS.deleteDeliveryCost}`, "DELETE", data);
  };

  return (
    <DeliveryCostContext.Provider
      value={{
        loading,
        createDeliveryCost,
        getDeliveryCost,
        getBranchDeliveryCost,
        editDeliveryCost,
        deleteDeliveryCost,
      }}
    >
      {children}
    </DeliveryCostContext.Provider>
  );
};
export const useDeliveryCostServices = () =>
  React.useContext(DeliveryCostContext);
export default DeliveryCostProvider;
