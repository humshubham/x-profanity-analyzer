import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type ResponseType = {
  id: number;
  date: string;
  degree: number;
  likes: number;
  rawTweet: string;
  url: string;
  username: string;
};

type ResultsState = {
  data: ResponseType[];
};

// Define the initial state using that type
const initialState: ResultsState = {
  data: [],
};

export const resultsSlice = createSlice({
  name: "results",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<ResultsState>) => {
      state.data = action.payload.data;
    },
  },
});

export const { setResults } = resultsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectResults = (state: RootState) => state.results;

export default resultsSlice.reducer;
