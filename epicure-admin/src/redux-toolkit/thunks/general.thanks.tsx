import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCollectionSize } from "../../services/axios/general.axios";

export const getCollectionSizeThunk = createAsyncThunk(
  "{CollectionName}/collection/size",
  async (collectionName: string): Promise<number> => {
    const response = await getCollectionSize(collectionName);
    return response.data;
  }
);
