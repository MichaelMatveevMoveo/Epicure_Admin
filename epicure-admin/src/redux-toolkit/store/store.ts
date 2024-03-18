import { ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit";
import collectionReducer from "../slices/collection.slice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
