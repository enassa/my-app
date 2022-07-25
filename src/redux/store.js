import { configureStore } from "@reduxjs/toolkit";
import createElectionReducer from "./slices/election-slice/election-slice";

export const store = configureStore({
  reducer: {
    election: createElectionReducer,
  },
});
