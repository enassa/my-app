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
  elections: [],
  openedElection: undefined,
  votingElection: undefined,
  electionResults: undefined,
};

export const createElectionSlice = createSlice({
  name: "departmentState",
  initialState,
  reducers: {
    getElections: (state, action) => {
      state.elections = action.payload;
    },
    createElection: (state, action) => {
      state.elections.push(action.payload);
    },
    updateElection: (state, action) => {},
    deleteElection: (state, action) => {},
    setOpenedElection: (state, action) => {
      state.openedElection = action.payload;
    },
    resetElection: (state, action) => {
      state.elections = action.payload;
    },
    resetOpenedElection: (state, action) => {
      state.openedElection = undefined;
    },
    setElectionResults: (state, action) => {
      state.electionResults = action.payload;
    },
    setVotingElection: (state, action) => {
      state.votingElection = action.payload;
    },
  },
});

export const {
  getElections,
  createElection,
  updateElection,
  setOpenedElection,
  setVotingElection,
  resetElection,
  resetOpenedElection,
  votingElection,
  setElectionResults,
} = createElectionSlice.actions;
export default createElectionSlice.reducer;
