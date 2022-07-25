import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../contants/dummy-db";
import { deepCloneObject } from "../../libraries/quick";
import { changeLoadState, openSnack } from "./actions-slice";
const initialState = {
  surveys: [],
  activeSurvey: {},
};

// saveObjectInLocalStorage
// getAsObjectFromLocalStorage
export const surveySlice = createSlice({
  name: "surveyState",
  initialState,
  reducers: {
    getSurvey: (state) => {},
    addSurvey: (state, action) => {
      state.surveys.push(action.payload);
      // MARK NEWLY ADDED SURVEY AS ACTIVE SURVEY
      state.activeSurvey = action.payload;
    },
    updateSurvey: (state, action) => {
      let allSurveys = deepCloneObject(state.surveys);
      console.log(action.payload);
      let indexOfSurvey = allSurveys.findIndex(
        (survey) => survey.id === action.payload.id
      );
      if (indexOfSurvey > -1) {
        allSurveys[indexOfSurvey] = action.payload;
        state.surveys = allSurveys;
      } else {
      }
    },
    deleteSurvey: (state, action) => {
      let allSurveys = deepCloneObject(state.surveys);
      let modifiedObject = allSurveys.filter(
        (survey) => survey.id !== action.payload.id
      );
      state.surveys = modifiedObject;
    },
    storeActiveSurvey: (state) => {},
    setActiveSurvey: (state, action) => {
      state.activeSurvey = action.payload;
      console.log(state.activeSurvey);
    },
  },
});
export const updateSurveyAsync = (data) => async (dispatch) => {
  dispatch(changeLoadState());
  axios
    .get(`${API_URL}}`)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {
      let snackData = {
        state: true,
        message: "Survey updated successfully",
        type: "success",
      };
      dispatch(changeLoadState());
      dispatch(openSnack(snackData));
      dispatch(updateSurvey(data));
    });
};
export const {
  getSurvey,
  addSurvey,
  updateSurvey,
  deleteSurvey,
  setActiveSurvey,
} = surveySlice.actions;
export default surveySlice.reducer;
