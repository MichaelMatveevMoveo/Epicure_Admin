import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import { deleteChefResource } from "../../resources/general.axios.resources";

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

export const getSignatureForCloud = async () => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/cloud/get-signature`
  );
};

export const deleteItemFromCollection = async (
  CollectionName: string,
  item_id: string
) => {
  try {
    axios.delete(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/admin/${CollectionName}/${item_id}`
    );
    return deleteChefResource.onSuccuss;
  } catch (error) {
    return deleteChefResource.onFail;
  }
};

export const getCollectionItemsPage = async (
  CollectionName: string,
  offset: number,
  limit: number
) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/${CollectionName}/getPartOfItems/:${offset}/:${limit}`
  );
};
