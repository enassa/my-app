import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, END_POINTS, TOKEN } from "../../../contants/urls/urls";
import {
  createElection,
  setOpenedElection,
  resetOpenedElection,
  resetElection,
  updateElection,
  getElections,
} from "./election-slice";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../../contants/urls/rout-links";

export const useElectionServices = () => {
  const [loading, setLoading] = useState(false);
  const [election, setUpElection] = useState({});
  const elections = useSelector((state) => state.election.elections);
  const openedElection = useSelector((state) => state.election.openedElection);
  const votingElection = useSelector((state) => state.election.votingElection);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            // errorToast("Action was not successful");
          }
        } else {
          // toast({
          //   type: "error",
          //   title: "Process failed",
          //   description: response?.message,
          // });
          // errorToast("Action was not successful");
          throw new Error(response?.statusText);
        }
      })

      .catch((error) => {
        // toast({
        //   type: "error",
        //   title: "Failed to Process Request",
        //   description: error?.message,
        // });
      })

      .finally(() => {
        setLoading(false);
      });
  };
  const getElectionListAsync = async (organName) => {
    request(`${END_POINTS.getElectionList}`, "GET")
      .then((resp) => {
        dispatch(getElections(resp));
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const createElectionAsync = async (data) => {
    request(END_POINTS.createElection, "POST", data)
      .then((resp) => {
        dispatch(createElection(data));
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const updateElectionAsync = async (data) => {
    request(`${END_POINTS.updateElection}`, "PUT", data)
      .then((resp) => {
        dispatch(updateElection(data));
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const resetElectionAsync = async (data) => {
    request(`${END_POINTS.resetElection}`, "PUT", data)
      .then((resp) => {
        dispatch(resetElection(data));
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const deleteElectionAsync = async (data) => {
    request(`${END_POINTS.deleteElection}`, "DELETE", data)
      .then((resp) => {})
      .catch((err) => {})
      .finally(() => {});
  };
  const resetElectionSetup = () => {
    setUpElection({});
  };
  const openElection = (data) => {
    dispatch(setOpenedElection({ ...data }));
    navigate(`${ALL_URLS.viewElectionDashboard.url}/results`);
  };
  const closeElection = () => {
    dispatch(resetOpenedElection({}));
  };

  const updateElectionSetUp = () => {};
  return {
    getElectionListAsync,
    createElectionAsync,
    updateElectionAsync,
    resetElectionAsync,
    deleteElectionAsync,
    resetElectionSetup,
    updateElectionSetUp,
    openElection,
    closeElection,
    election,
    loading,
    elections,
    openedElection,
    votingElection,
  };
};
