import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCollectionSize,
  getAllSize,
  getCollectionItemsPage,
} from "../../services/axios/general.axios";
import {
  ChefType,
  RestaurantType,
  DishType,
} from "../../data/types/backEndData.types";
import { getRestaurantsWithNameAndNotId } from "../../services/axios/restaurants.axios";
import { getDishesWithNamesAndNotIds } from "../../services/axios/dishes.axios";

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
  async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<RestaurantType[]> => {
    const response = await getRestaurantsWithNameAndNotId(offset, limit);
    return response.data;
  }
);
export const getDishesWithNamesAndNotIdsThunk = createAsyncThunk(
  "getDishesWithNamesAndNotIds",
  async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<DishType[]> => {
    const response = await getDishesWithNamesAndNotIds(offset, limit);
    return response.data;
  }
);

export const getCollectionItemsPageThunk = createAsyncThunk(
  "itemsPage",
  async ({
    collectionName,
    offset,
    limit,
  }: {
    collectionName: string;
    offset: number;
    limit: number;
  }): Promise<ChefType[]> => {
    const response = await getCollectionItemsPage(
      collectionName,
      offset,
      limit
    );
    return response.data;
  }
);
