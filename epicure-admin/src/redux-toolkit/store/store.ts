import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../slices/collection.slice";
import cookiesReducer from "../slices/loginStatus.slice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    cookies: cookiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
