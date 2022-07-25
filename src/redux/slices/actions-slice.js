import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  toast: {
    message: "",
    type: "error",
    state: false,
  },
  snackBar: {
    state: false,
    message: "",
    type: "",
  },
  modal: {
    state: true,
    message: "Action succesful",
    type: "succes",
  },
};
export const actionSlice = createSlice({
  name: "officeState",
  initialState,
  reducers: {
    changeLoadingState: (state) => {
      state.loading = !state.loading;
    },
    toastMessage: (state, action) => {
      state.toastData = action.payload;
    },
    openSnackbar: (state, action) => {
      state.snackBar = action.payload;
    },
    resetSnackBar: (state, action) => {
      state.snackBar = { message: "", type: "", state: false };
    },
    hideToast: (state) => {
      state.toastData = { message: "", type: "", state: false };
    },
    validations: {
      officeForm: [],
      departMentForm: [],
      serviceForm: [],
    },
    addToValidations: (state, action) => {
      let myArr = this.state.validation;
      let index = myArr.indexOf(action.payload);
      if (index > -1) {
        myArr.splice(index, 1);
        state.validation.push(action.payload);
      }
    },
    removeFromValidation: (state, action) => {
      let myArr = this.state.validation;
      let index = myArr.indexOf(action.payload);
      if (index > -1) {
        myArr.splice(index, 1);
        state.validation.push(action.payload);
      }
    },
  },
});

export const changeLoadState = (data) => async (dispatch) => {
  dispatch(changeLoadingState());
};
export const checkValidation =
  (value, formName) => async (dispatch, getState) => {
    const state = getState();
    let validations = state.validations;
    console.log(validations);
    // let indexOfSurvey= allSurveys.findIndex(survey => survey.id === action.payload.id)
    // switch (formName) {
    //         case 'officeForm':

    //             break;
    //         case 'departmentForm':

    //             break;
    //         case 'serviceForm':

    //             break;

    //         default:
    //             break;
    //     }
    //     dispatch(changeLoadingState());
  };
export const openSnack = (data) => async (dispatch) => {
  dispatch(openSnackbar(data));
};
export const resetSnack = (data) => async (dispatch) => {
  dispatch(openSnack(data));
};

export const {
  changeLoadingState,
  toastMessage,
  hideToast,
  openSnackbar,
  resetSnackBar,
} = actionSlice.actions;
export default actionSlice.reducer;
