import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import {
//   changeLoadingState,
//   changeLoadState,
//   openSnack,
// } from "../actions-slice";
import { API_URL, elections } from "../../../components/contants/dummy-data";
// import { useState } from "react";
// import { BASE_URL, TOKEN } from "../../../contants/urls/urls";

const initialState = {
  elections: [...elections],
  openedElection: undefined,
  votingElection: elections[0],
};

export const createElectionSlice = createSlice({
  name: "departmentState",
  initialState,
  reducers: {
    getElections: (state, action) => {},
    createElection: (state, action) => {
      state.elections.push(action.payload);
    },
    updateElection: (state, action) => {},
    deleteElection: (state, action) => {},
    setOpenedElection: (state, action) => {
      // console.log(action.payload);
      state.openedElection = action.payload;
    },
    resetElection: (state, action) => {
      state.elections = action.payload;
    },
    resetOpenedElection: (state, action) => {
      state.openedElection = undefined;
    },
  },
});
export const {
  getElections,
  createElection,
  updateElection,
  setOpenedElection,
  resetElection,
  resetOpenedElection,
  votingElection,
} = createElectionSlice.actions;
export default createElectionSlice.reducer;
