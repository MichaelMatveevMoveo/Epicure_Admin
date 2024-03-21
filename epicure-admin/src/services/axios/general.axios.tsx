import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";
import {
  CreateChefResource,
  CreateDishResource,
  CreateRestaurantResource,
} from "../../resources/general.axios.resources";

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

export const addRestaurant = async (
  name: string,
  chef: string,
  stars: string,
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("chef", chef);
  formData.append("stars", stars);
  if (imageprops) {
    formData.append("image", imageprops.public_id);
    formData.append("version", imageprops.version);
    formData.append("signature", imageprops.signature);
  }
  try {
    const response = await axios.post(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/restaurants`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return CreateRestaurantResource.onFail;
    }
    return CreateRestaurantResource.onSuccuss;
  } catch (error) {
    return CreateRestaurantResource.onFail;
  }
};

export const addDish = async (
  name: string,
  restaurant: string,
  price: string,
  Ingredients: string[],
  tags: string[],
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("restaurant", restaurant);
  formData.append("Ingredients", JSON.stringify(Ingredients));
  formData.append("tags", JSON.stringify(tags));
  if (imageprops) {
    formData.append("image", imageprops.public_id);
    formData.append("version", imageprops.version);
    formData.append("signature", imageprops.signature);
  }
  try {
    const response = await axios.post(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/dishes`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return CreateDishResource.onFail;
    }
    return CreateDishResource.onSuccuss;
  } catch (error) {
    return CreateDishResource.onFail;
  }
};
