import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  changeLoadingState,
  changeLoadState,
  openSnack,
} from "../actions-slice";
import { API_URL, elections } from "../../../components/contants/dummy-data";
import { useState } from "react";
import { BASE_URL, TOKEN } from "../../../contants/urls/urls";

const initialState = {
  elections: [...elections],
  activeDepartment: [],
};

export const createElectionSlice = createSlice({
  name: "departmentState",
  initialState,
  reducers: {
    getElections: (state) => {},
    creatElection: (state, action) => {
      state.elections.push(action.payload);
    },
    updateElection: (state) => {},
    deleteElection: (state) => {},
  },
});
export const { getElections, creatElection, updateElection } =
  createElectionSlice.actions;
export default createElectionSlice.reducer;
