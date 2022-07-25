import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { changeLoadState, openSnack } from "./actions-slice";
import { API_URL } from "../../contants/dummy-db";
const initialState = {
  offices: [],
  activeOffice: [],
};
export const officeSlice = createSlice({
  name: "officeState",
  initialState,
  reducers: {
    getOffice: (state) => {},
    creatOffice: (state, action) => {
      console.log(action);
      state.offices.push(action.payload);
    },
    updateOffice: (state) => {},
    deleteOffice: (state) => {},
    storeActiveOffice: (state) => {},
  },
});
export const createOfficeAsync = (data) => async (dispatch) => {
  dispatch(changeLoadState());
  axios
    .get(`${API_URL}}`)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {
      let snackData = {
        state: true,
        message: "Office created successfully",
        type: "success",
      };
      dispatch(creatOffice(data));
      dispatch(changeLoadState());
      dispatch(openSnack(snackData));
    });
};

export const { getOffice, creatOffice, updateOffice, storeActiveOffice } =
  officeSlice.actions;
export default officeSlice.reducer;
