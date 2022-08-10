import React, { useEffect } from "react";
import { useState } from "react";
import {
  deepCloneObject,
  generateShortId,
  getAsObjectFromLocalStorage,
  saveObjectInLocalStorage,
} from "../../../contants/libraries/easy";
import {
  BASE_URL,
  END_POINTS,
  ORG_CODE,
  ORG_EMAIL,
  ORG_NAME,
  TOKEN,
} from "../../../contants/urls/urls";
// import toast from "../components/toast/toast";
// import { errorToast } from "../components/toast/toastify";
import {
  contestantBluePrint,
  electionBluePrint,
  positionBluePrint,
  voterIdBluePrint,
  extraInfoBluePrint,
  generalBlueInfoPrint,
  contestDefBluePrint,
} from "../../../components/contants/ui-data";
import { dummyElection } from "../../../components/contants/dummy-data";
import { useElectionServices } from "../../../redux/slices/election-slice/election-hook";

const ElectionContext = React.createContext(undefined);
const ElectionProvider = ({ children }) => {
  const { createElectionAsync } = useElectionServices();
  const [loadingLocal, setLoading] = useState(false);

  const [bluePrintState, updateBluePrintState] = useState(
    undefined
    // deepCloneObject(electionBluePrint)
  );

  const voterIdPrint = deepCloneObject(voterIdBluePrint);
  const contestantPrint = deepCloneObject(contestantBluePrint);
  const positionPrint = deepCloneObject(positionBluePrint);
  const extraInfoPrint = deepCloneObject(extraInfoBluePrint);
  const generalInfoPrint = deepCloneObject(generalBlueInfoPrint);

  let electionObjectCache = () => getAsObjectFromLocalStorage("bluePrintState");
  useEffect(() => {
    if (bluePrintState === undefined && electionObjectCache() === undefined) {
      updateBluePrintState(deepCloneObject(electionBluePrint));
      return;
    }
    if (bluePrintState === undefined && electionObjectCache() !== undefined) {
      updateBluePrintState(electionObjectCache());
      return;
    }
    saveObjectInLocalStorage("bluePrintState", bluePrintState);
    // setTimeout(() => {
    // }, 200);
    console.log(bluePrintState);
  }, [bluePrintState]);

  const updateGeneralInfo = (field, data) => {
    const oldGeneralInfo = bluePrintState?.GeneralInfo;
    let newBluePrint = {
      ...bluePrintState,
      GeneralInfo: {
        ...oldGeneralInfo,
        [field]: data,
      },
      [field]: data,
      // Pass
    };
    updateBluePrintState(newBluePrint);
  };

  const updateDate = (duration) => {
    const { Starting, Ending } = duration;

    let Start_Date = Starting !== undefined ? Starting?.split("T")[0] : "";
    let Start_Time = Starting !== undefined ? Starting?.split("T")[1] : "";

    let End_Date = Ending !== undefined ? Ending.split("T")[0] : "";
    let End_Time = Ending !== undefined ? Ending.split("T")[1] : "";

    const oldGeneralInfo = bluePrintState?.GeneralInfo;
    let newBluePrint = {
      ...bluePrintState,
      GeneralInfo: {
        ...oldGeneralInfo,
        Starting,
        Ending,
        Start_Date,
        End_Date,
        Start_Time,
        End_Time,
      },
    };
    updateBluePrintState(newBluePrint);
  };
  const updateSuperInfo = (data) => {};
  // Contestant defintion CRUD operation
  const addContestant = (data) => {
    const oldContestants = bluePrintState?.Contestants;
    const getIdOfLastContDef = () => {
      return oldContestants.length
        ? oldContestants[oldContestants.length - 1].Id
        : -1;
    };
    let idOfNewContestantDef = getIdOfLastContDef() + 1;
    let newBluePrint = {
      ...bluePrintState,
      Contestants: [
        ...oldContestants, //load old contestant definitions
        {
          Id: idOfNewContestantDef,
          ...data,
        }, //new contestant definition
      ],
    };
    updateBluePrintState(newBluePrint);
  };

  const updateContestant = (data) => {
    const oldContestants = bluePrintState?.Contestants;
    let indexOfItemToEdit = oldContestants.findIndex(
      (item) => item?.Id === data?.Id
    );
    if (indexOfItemToEdit === -1) return; //if for any reason filtering fails and this is udefined don't continue

    oldContestants.splice(indexOfItemToEdit, 1, data);
    let newBluePrint = {
      ...bluePrintState,
      Contestants: oldContestants,
    };
    updateBluePrintState(newBluePrint);
  };

  const deleteContestant = (data) => {
    const oldContestants = bluePrintState?.Contestants;
    let newContestant = oldContestants.filter((item) => item?.Id !== data?.Id);
    if (!!!newContestant) return; //if for any reason filtering fails and this is udefined don't continue
    let newBluePrint = {
      ...bluePrintState,
      Contestants: newContestant,
    };
    updateBluePrintState(newBluePrint);
  };

  // Contestant defintion CRUD operation
  const addContestantDef = (data) => {
    const oldContestantDefinition = bluePrintState?.ContestantDefinition;
    const getIdOfLastContDef = () => {
      return oldContestantDefinition.length
        ? oldContestantDefinition[oldContestantDefinition.length - 1].Id
        : -1;
    };
    let idOfNewContestantDef = getIdOfLastContDef() + 1;
    let newBluePrint = {
      ...bluePrintState,
      ContestantDefinition: [
        ...oldContestantDefinition, //load old contestant definitions
        {
          ...contestDefBluePrint,
          Id: idOfNewContestantDef,
          Title: `Definition ${idOfNewContestantDef + 1}`,
        }, //new contestant definition
      ],
    };
    updateBluePrintState(newBluePrint);
  };

  const updateContestantDef = (data) => {
    const oldContestantDefinition = bluePrintState?.ContestantDefinition;
    let indexOfItemToEdit = oldContestantDefinition.findIndex(
      (item) => item?.Id === data?.Id
    );
    if (indexOfItemToEdit === -1) return; //if for any reason filtering fails and this is udefined don't continue

    oldContestantDefinition?.splice(indexOfItemToEdit, 1, data);
    let newBluePrint = {
      ...bluePrintState,
      ContestantDefinition: oldContestantDefinition,
    };
    updateBluePrintState(newBluePrint);
  };

  const deleteContestantDef = (data) => {
    const oldContestantDefinition = bluePrintState?.ContestantDefinition;
    let newContestantDefs = oldContestantDefinition.filter(
      (item) => item?.Id !== data?.Id
    );
    if (!!!newContestantDefs) return; //if for any reason filtering fails and this is udefined don't continue
    let newBluePrint = {
      ...bluePrintState,
      ContestantDefinition: newContestantDefs,
    };
    updateBluePrintState(newBluePrint);
  };

  // Positions|Portfolios CRUD operation
  const addPosition = (data) => {
    const oldPositions = bluePrintState?.Positions;
    const getIdOfLastPositions = () => {
      return oldPositions.length
        ? oldPositions[oldPositions.length - 1].Id
        : -1;
    };
    let idOfNewPositions = getIdOfLastPositions() + 1;
    let newBluePrint = {
      ...bluePrintState,
      Positions: [
        ...oldPositions, //load old contestant definitions
        {
          // ...positionBluePrint,
          Id: idOfNewPositions,
          Title: `Portfolio ${idOfNewPositions + 1}`,
        }, //new contestant definition
      ],
    };
    updateBluePrintState(newBluePrint);
  };

  const updatePosition = (data) => {
    const oldPositions = bluePrintState?.Positions;
    let indexOfItemToEdit = oldPositions.findIndex(
      (item) => item?.Id === data?.Id
    );
    if (indexOfItemToEdit === -1) return; //if for any reason filtering fails and this is udefined don't continue

    oldPositions.splice(indexOfItemToEdit, 1, data);
    let newBluePrint = {
      ...bluePrintState,
      Positions: oldPositions,
    };
    updateBluePrintState(newBluePrint);
  };

  const deletePosition = (data) => {
    // remove cached active portfolio
    localStorage.removeItem("activePortfolio");
    let mainBluePrint = deepCloneObject(bluePrintState);
    const deleteAssociatedContestants = async () => {
      let oldContestants = bluePrintState.Contestants;
      let newContestant = oldContestants.filter(
        (item) => item?.PositionId !== data?.Id
      );
      console.log(data, newContestant);

      if (!!!newContestant) return; //if for any reason filtering fails and this is udefined don't continue
      let newBluePrint = {
        ...bluePrintState,
        Contestants: newContestant,
      };
      console.log("pp", mainBluePrint);
      mainBluePrint = newBluePrint;
    };
    deleteAssociatedContestants();
    let oldPositions = mainBluePrint?.Positions;
    // Delete all contestants created for the portfolio in question

    let newPositions = oldPositions.filter((item) => item?.Id !== data?.Id);
    if (!!!newPositions) return; //if for any reason filtering fails and this is udefined don't continue
    let newBluePrint = {
      ...mainBluePrint,
      Positions: newPositions,
    };
    updateBluePrintState(newBluePrint);
  };

  // General
  const resetElectionPrint = () => {
    updateBluePrintState(undefined);
  };
  const createVoterIds = async (numberOfVoters) => {
    setLoading(true);
    let voterIds = [];
    for (let i = 0; i < numberOfVoters; i++) {
      let value = generateShortId();
      if (!voterIds.includes(value)) {
        voterIds.push(value);
      }
    }
    return voterIds;
  };

  // API calls
  const createElection = async (data) => {
    let NumberOfVoters = 5000;
    let VoterIds = await createVoterIds(NumberOfVoters);
    createElectionAsync({
      electionData: {
        ...bluePrintState,
        Password: "",
        OrganizationId: ORG_CODE(),
        OrganizationName: ORG_NAME(),
        OrganizationEmail: ORG_EMAIL(),
        NumberOfVoters: 5000,
        VoterIds,
      },
    });
  };
  return (
    <ElectionContext.Provider
      value={{
        loadingLocal,
        updateGeneralInfo,
        updateDate,
        updateSuperInfo,
        deleteContestant,
        addContestant,
        updateContestant,

        addContestantDef,
        deleteContestantDef,
        updateContestantDef,

        addPosition,
        deletePosition,
        updatePosition,

        resetElectionPrint,

        createElection,

        bluePrintState,
        generalInfoPrint,
        contestantPrint,
        positionPrint,
        extraInfoPrint,
        voterIdPrint,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
export const useCreateElectionServices = () =>
  React.useContext(ElectionContext);
export default ElectionProvider;
