import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";
import { CreateChefResource } from "../../resources/general.axios.resources";

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

export const getSignatureForCloud = async () => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/cloud/get-signature`
  );
};

export const addChef = async (
  name: string,
  description: string,
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (imageprops) {
    formData.append("image", imageprops.public_id);
    formData.append("version", imageprops.version);
    formData.append("signature", imageprops.signature);
  }
  try {
    const response = await axios.post(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/chefs`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return CreateChefResource.onFail;
    }
    return CreateChefResource.onSuccuss;
  } catch (error) {
    return CreateChefResource.onFail;
  }
};
