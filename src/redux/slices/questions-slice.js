import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { questionData } from "../../tools/question-builder/trialQuestions";
import { deepCloneObject } from "../../libraries/quick";
const initialState = {
  questions: questionData,
  activeQuestion: null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestion: (state, action) => {
      // console.log(action.payload)
      state.questions = action.payload.questions;
    },
    addQuestion: (state, action) => {
      state.activeQuestion = action.payload.id;
      state.questions.push(action.payload);
    },
    modifyQuestion: (state, action) => {
      let allQuestions = deepCloneObject(state.questions);
      let indexOfModified = allQuestions.findIndex(
        (question) => question.id === action.payload.id
      );
      if (!(indexOfModified > -1)) return;
      allQuestions[indexOfModified] = action.payload;
      state.questions = allQuestions;
    },
    deleteQuestion: (state, action) => {
      let allQuestions = deepCloneObject(state.questions);
      let modifiedObject = allQuestions.filter(
        (question) => question.id !== action.payload.id
      );
      state.questions = modifiedObject;
    },
    storeActiveQuestion: (state) => {},
    setActiveQuestion: (state, action) => {
      // console.log(action.payload)
      state.activeQuestion = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});
export const {
  getQuestion,
  addQuestion,
  modifyQuestion,
  deleteQuestion,
  storeActiveQuestion,
  setActiveQuestion,
  setQuestions,
} = questionsSlice.actions;
export default questionsSlice.reducer;
