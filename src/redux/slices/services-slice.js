import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  changeLoadingState,
  changeLoadState,
  openSnack,
} from "./actions-slice";
import axios from "axios";
import { API_URL } from "../../contants/dummy-db";
const initialState = {
  services: [],
  activeServices: [],
};

export const serviceSlice = createSlice({
  name: "serviceState",
  initialState,
  reducers: {
    getServices: (state) => {},
    creatServices: (state, action) => {
      console.log(action);
      state.services.push(action.payload);
    },
    updateServices: (state) => {},
    deleteServices: (state) => {},
    storeActiveServices: (state) => {},
  },
});
export const createServiceAsync = (data) => async (dispatch) => {
  dispatch(changeLoadingState());
  axios
    .get(`${API_URL}}`)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {
      let snackData = {
        state: true,
        message: "Department created successfully",
        type: "success",
      };
      dispatch(creatServices(data));
      dispatch(changeLoadState());
      dispatch(openSnack(snackData));
    });
};
export const {
  getServices,
  creatServices,
  updateServices,
  storeActiveServices,
} = serviceSlice.actions;
export default serviceSlice.reducer;
