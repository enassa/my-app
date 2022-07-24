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
import { User } from "../components/contants/ui-data";

const ConfigurationsContext = React.createContext(undefined);
const ConfigurationProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [configurations, setConfigurations] = useState();
  const [configurationsList, setConfigurationsList] = useState([]);
  const request = async (
    path,
    method = "GET",
    data,
    accept = "application/json",
    dataType = "json",
    newConfig
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
            // successToast("Configuration modified successful");
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
  const modifyConfigurations = (setting, configValue) => {
    let value = configValue;
    if (setting === "assignmentMode") {
      let processedValue = configValue ? "automatic" : "manual";
      value = processedValue;
    }
    let newConfig = { ...configurations, [setting]: value };
    console.log(newConfig);
    let getReponse = async () => {
      return await request(`${END_POINTS.editConfiguration}`, "PUT", {
        ...newConfig,
        organization: ORG_NAME(),
        branch: BRANCH(),
      });
    };
    getReponse().then((response) => {
      if (!!response) {
        console.log(response?.data[0]);
        setConfigurations(newConfig);
      }
    });
    return;
  };

  const getConfigurationList = async (organName) => {
    return request(`${END_POINTS.getConfigurationList}/${organName}`, "GET");
  };
  const getBranchConfigurationList = async (organName) => {
    return request(
      `${END_POINTS.getConfigurationList}/${organName}/branch/${BRANCH()}`,
      "GET"
    );
  };
  const createConfiguration = async (data) => {
    return request(END_POINTS.createConfiguration, "POST", data);
  };
  const updateConfiguration = async (data) => {
    return request(`${END_POINTS.editConfiguration}`, "PUT", data);
  };
  const deleteConfiguration = async (data) => {
    return request(`${END_POINTS.deleteConfiguration}`, "DELETE", data);
  };
  useEffect(() => {
    getConfigurationList(ORG_NAME()).then((response) => {
      if (!!response) {
        setConfigurationsList(response.data);
      }
    });
    getBranchConfigurationList(ORG_NAME()).then((response) => {
      if (!!response) {
        setConfigurations(response?.[0]);
      }
    });
  }, []);
  return (
    <ConfigurationsContext.Provider
      value={{
        loading,
        configurations,
        configurationsList,
        createConfiguration,
        getConfigurationList,
        getBranchConfigurationList,
        updateConfiguration,
        deleteConfiguration,
        modifyConfigurations,
      }}
    >
      {children}
    </ConfigurationsContext.Provider>
  );
};
export const useConfigurationServices = () =>
  React.useContext(ConfigurationsContext);
export default ConfigurationProvider;
