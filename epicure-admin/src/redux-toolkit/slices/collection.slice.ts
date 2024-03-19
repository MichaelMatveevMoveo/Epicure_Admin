import { createSlice } from "@reduxjs/toolkit";
import {
  getCollectionSizeThunk,
  getCollectionItemsThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
} from "../thunks/general.thanks";
import { Chef, Restaurant, Dish } from "../../data/types/backEndData.types";

interface collectionState {
  isLoading: boolean;
  isError: boolean;
  collectionName: string | null;
  size: number | null;
  entities: Chef[] | Restaurant[] | Dish[];
}

const initialState: collectionState = {
  isLoading: false,
  isError: false,
  collectionName: null,
  size: null,
  entities: [],
};
const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSize(state, action) {
      state.size = action.payload;
    },
    setCollectionName(state, action) {
      state.collectionName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCollectionSizeThunk.pending, (state) => {
      state.isLoading = true;
      state.size = null;
    });
    builder.addCase(getCollectionSizeThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getCollectionSizeThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.size = action.payload;
    });
    builder.addCase(getCollectionItemsThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getCollectionItemsThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getCollectionItemsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.entities = action.payload;
    });
    builder.addCase(getRestaurantsWithNameAndNotIdThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getRestaurantsWithNameAndNotIdThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(
      getRestaurantsWithNameAndNotIdThunk.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.entities = action.payload;
      }
    );
    builder.addCase(getDishesWithNamesAndNotIdsThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getDishesWithNamesAndNotIdsThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(
      getDishesWithNamesAndNotIdsThunk.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.entities = action.payload;
      }
    );
  },
});

export const { setSize, setCollectionName } = collectionSlice.actions;
export default collectionSlice.reducer;
