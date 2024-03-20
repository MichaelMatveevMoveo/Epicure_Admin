import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";

export const getCollectionSize = async (CollectionName: string) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/${CollectionName}/collection/size`
  );
};

export const getAllSize = async (CollectionName: string) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/${CollectionName}`
  );
};

export const getRestaurantsWithNameAndNotId = async () => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/restaurants/chefNameAndsignatureDishName`
  );
};

export const getDishesWithNamesAndNotIds = async () => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/dishes/dishesWithRestaurantName`
  );
};
