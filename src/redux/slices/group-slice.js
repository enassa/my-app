import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";
import { changeLoadState, openSnack } from "./actions-slice";
import { API_URL } from "../../contants/dummy-db";
const initialState = {
  groups: [],
  activeGroup: [],
};
export const officeSlice = createSlice({
  name: "officeState",
  initialState,
  reducers: {
    getGroup: (state) => {},
    creatGroup: (state, action) => {
      console.log(action);
      state.groups.push(action.payload);
    },
    updateGroup: (state) => {},
    deleteGroup: (state) => {},
    storeActiveGroup: (state) => {},
  },
});
export const createGroupAsync = (data) => async (dispatch) => {
  dispatch(changeLoadState());
  axios
    .get(`${API_URL}}`)
    .then((response) => {})
    .catch((error) => {})
    .finally(() => {
      let snackData = {
        state: true,
        message: "Group created successfully",
        type: "success",
      };
      dispatch(creatGroup(data));
      dispatch(changeLoadState());
      dispatch(openSnack(snackData));
    });
};

export const { getGroup, creatGroup, updateGroup, storeActiveGroup } =
  officeSlice.actions;
export default officeSlice.reducer;
