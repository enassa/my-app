import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_URL,
  END_POINTS,
  ORG_CODE,
  ORG_EMAIL,
  ORG_NAME,
  TOKEN,
} from "../../../contants/urls/urls";
import {
  createElection,
  setOpenedElection,
  setVotingElection,
  resetOpenedElection,
  resetElection,
  updateElection,
  getElections,
  setElectionResults,
} from "./election-slice";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../../contants/urls/rout-links";
import { errorToast, successToast } from "../../../components/toast/toastify";
import {
  generateSuperShortId,
  removeItemsFromLocalStorage,
  removeItemsFromSessionStorage,
  saveObjectInLocalStorage,
  saveObjectInSession,
} from "../../../contants/libraries/easy";

export const useElectionServices = () => {
  const [loading, setLoading] = useState(false);
  const [election, setUpElection] = useState({});
  const elections = useSelector((state) => state.election.elections);
  const openedElection = useSelector((state) => state.election.openedElection);
  const votingElection = useSelector((state) => state.election.votingElection);
  const electionResults = useSelector(
    (state) => state.election.electionResults
  );
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
        const responseData = await response?.json();
        if (response.ok) {
          if (responseData.success) {
            // request and rction was succesfully
            return responseData;
          } else {
            //only request was succesfull but action failed
            return responseData;
          }
        } else {
          // okay is false and success is false
          errorToast("Uknown error, Please contact administrator");
          return responseData;
        }
      })

      .catch((error) => {
        console.log(error);

        errorToast("Uknown error, Please check your internet connection");
        return {
          error: error,
          message: "Uknown error, check your internet connnection",
          ok: false,
          success: false,
        };
      })
      .finally((res) => {
        setLoading(false);
      });
  };
  const getElectionListAsync = async (orgCode, token) => {
    request(`${END_POINTS.getElectionList}`, "POST", { orgCode, token })
      .then((res) => {
        if (res.success) {
          let data = !!res.data ? res.data : [];
          dispatch(getElections(data));
          successToast(res.message);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const createVoterIds = async (numberOfVoters) => {
    setLoading(true);
    let voterIds = [];
    for (let i = 0; i < numberOfVoters; i++) {
      let value = generateSuperShortId();
      if (!voterIds.includes(value)) {
        voterIds.push(value);
      }
    }
    return voterIds;
  };
  const getSingleElectionAsync = async (orgCode, electionId, token) => {
    request(`${END_POINTS.getSingleElection}`, "POST", {
      orgCode,
      electionId,
      token,
    })
      .then((res) => {
        if (res.success) {
          let data = !!res.data ? res.data : [];
          saveObjectInSession("openedElection", data);
          console.log(data);
          dispatch(openElection(data));
        } else {
          errorToast("Could not get election");
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const createElectionAsync = async (data) => {
    let NumberOfVoters = data?.NumberOfVoters || 5;
    let VoterIds = await createVoterIds(NumberOfVoters);
    let electionData = {
      ...data,
      Password: data?.Password || "data",
      OrganizationId: ORG_CODE(),
      OrganizationName: ORG_NAME(),
      OrganizationEmail: ORG_EMAIL(),
      NumberOfVoters: NumberOfVoters,
      VoterIds,
    };

    request(END_POINTS.createElection, "POST", { electionData })
      .then((res) => {
        console.log(res);
        if (res.success) {
          dispatch(createElection(res.data));
          successToast("Election created successfully ");
          return res;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const resetElectionAsync = async (data) => {
    console.log(data.token);
    let NumberOfVoters = data?.NumberOfVoters || 300;
    let VoterIds = await createVoterIds(NumberOfVoters);
    let electionData = {
      ...data,
      OrganizationId: ORG_CODE(),
      VoterIds,
      Id: data?.Id,
    };
    request(END_POINTS.resetElection, "PUT", { electionData, Id: data?.Id })
      .then((res) => {
        if (res.success) {
          window.location.reload();
          // dispatch(createElection(res.data));
          successToast("Election reset successfully ");
          return res;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const updateElectionAsync = async (data) => {
    request(`${END_POINTS.updateElection}`, "PUT", data)
      .then((res) => {
        dispatch(updateElection(data));
      })
      .catch((err) => {})
      .finally(() => {});
  };
  // const resetElectionAsync = async (data) => {
  //   request(`${END_POINTS.resetElection}`, "PUT", data)
  //     .then((res) => {
  //       dispatch(resetElection(data));
  //     })
  //     .catch((err) => {})
  //     .finally(() => {});
  // };
  const deleteElectionAsync = async (data) => {
    request(`${END_POINTS.deleteElection}`, "DELETE", data)
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  };
  const setUpPositionsForVoting = async (allPositions) => {
    // Here we create an object of Position Ids and then when a vote is casted
    // we assign the contestant chosen to the Position Id to get the total vote object
    if (allPositions.length > 0) {
      let obj = {};
      await allPositions.map((position) => {
        const property = position?.Id;
        obj[property] = undefined;
      });
      console.log("obj====", obj, "alposition=====", allPositions);
      return obj;
    }
  };
  const verifyVoterIdAsync = async (data) => {
    request(`${END_POINTS.verifyVoterId}`, "POST", data)
      .then((res) => {
        if (res?.success) {
          //Set up voting obejct and if setup is complete, proceed
          setUpPositionsForVoting(res.data.Positions).then((voteSetUp) => {
            const readyVotingElection = {
              ...res.data,
              Votes: voteSetUp,
            };
            console.log("readyVotingElection=====", readyVotingElection);
            // save setup in local storage so that even if user refreshes, vote process can continue
            saveObjectInSession("votingElection", readyVotingElection);
            // update state that contains the voting setup
            dispatch(setVotingElection(readyVotingElection));
            navigate(ALL_URLS.votingScreen.url);
          });
        } else {
          errorToast(res.message);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const castVoteAsync = async (data) => {
    request(`${END_POINTS.castVote}`, "PUT", data)
      .then((res) => {
        if (res.success) {
          successToast(res.message);
          sessionStorage.removeItem("votingElection");
          navigate(ALL_URLS.voteSuccess.url);
          return res;
        } else {
          errorToast(res.message);
          return res;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  // const resetElectionAsync = async (data) => {
  //   request(`${END_POINTS.resetElection}`, "PUT", data)
  //     .then((res) => {
  //       if (res.success) {
  //         successToast(res.message);
  //         sessionStorage.removeItem("votingElection");
  //         navigate(ALL_URLS.voteSuccess.url);
  //         return res;
  //       } else {
  //         errorToast(res.message);
  //         return res;
  //       }
  //     })
  //     .catch((err) => {})
  //     .finally(() => {});
  // };
  const resultsLoginAsync = async (data) => {
    request(`${END_POINTS.verifyElectionPassword}`, "POST", data)
      .then((res) => {
        if (res.success) {
          saveObjectInSession("resultsData", res.data);
          navigate(ALL_URLS.resultsScreen.url);
          return res;
        } else {
          errorToast(res.message);
          return res;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const getLatesResultsAsync = (data) => {
    request(`${END_POINTS.getLatestResults}`, "POST", { ...data })
      .then((res) => {
        if (res.success) {
          successToast(res.message);
          saveObjectInSession("resultsData", res.data);
          navigate(ALL_URLS.resultsScreen.url);
          dispatch(setElectionResults(res.data));
          return res;
        } else {
          errorToast(res.message);
          return res;
        }
      })
      .catch((err) => {})
      .finally(() => {});
  };
  const logoutAsync = (homeUrl, sessionItems, localStorageItems, all) => {
    removeItemsFromLocalStorage(localStorageItems);
    removeItemsFromSessionStorage(sessionItems);
    if (all === true) {
      localStorage.clear();
      sessionStorage.clear();
    }
    navigate(homeUrl);
  };
  const resetElectionSetup = () => {
    setUpElection({});
  };
  const openElection = (data) => {
    dispatch(setOpenedElection(data));
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
    verifyVoterIdAsync,
    castVoteAsync,
    resultsLoginAsync,
    logoutAsync,
    getLatesResultsAsync,
    getSingleElectionAsync,
    election,
    loading,
    elections,
    openedElection,
    votingElection,
    electionResults,
  };
};
