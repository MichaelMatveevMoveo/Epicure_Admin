import { createSlice } from "@reduxjs/toolkit";
import { getCollectionSizeThunk } from "../thunks/general.thanks";

interface collectionState {
  isLoading: boolean;
  isError: boolean;
  collectionName: string | null;
  size: number | null;
}

const initialState: collectionState = {
  isLoading: false,
  isError: false,
  collectionName: null,
  size: null,
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
  },
});

export const { setSize, setCollectionName } = collectionSlice.actions;
export default collectionSlice.reducer;
