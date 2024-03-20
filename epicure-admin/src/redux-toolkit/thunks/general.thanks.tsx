import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCollectionSize,
  getAllSize,
  getRestaurantsWithNameAndNotId,
  getDishesWithNamesAndNotIds,
} from "../../services/axios/general.axios";
import {
  ChefType,
  RestaurantType,
  DishType,
} from "../../data/types/backEndData.types";

export const getCollectionSizeThunk = createAsyncThunk(
  "{CollectionName}/collection/size",
  async (collectionName: string): Promise<number> => {
    const response = await getCollectionSize(collectionName);
    return response.data;
  }
);

export const getCollectionItemsThunk = createAsyncThunk(
  "allChefs",
  async (collectionName: string): Promise<ChefType[]> => {
    const response = await getAllSize(collectionName);
    return response.data;
  }
);
export const getRestaurantsWithNameAndNotIdThunk = createAsyncThunk(
  "getRestaurantsWithNameAndNotId",
  async (): Promise<RestaurantType[]> => {
    const response = await getRestaurantsWithNameAndNotId();
    return response.data;
  }
);
export const getDishesWithNamesAndNotIdsThunk = createAsyncThunk(
  "getDishesWithNamesAndNotIds",
  async (): Promise<DishType[]> => {
    const response = await getDishesWithNamesAndNotIds();
    return response.data;
  }
);
