import { configureStore } from "@reduxjs/toolkit";
import { default as loaderReducer } from "./loaderSlice";
import { default as resultReducer } from "./resultSlice";
// ...

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    results: resultReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
