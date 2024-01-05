import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type LoaderState = {
  isLoading: boolean;
};

// Define the initial state using that type
const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoaderState>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setLoading } = loaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
