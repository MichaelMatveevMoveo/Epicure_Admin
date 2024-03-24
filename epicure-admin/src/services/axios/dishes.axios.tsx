import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import {
  CreateDishResource,
  updateDishResource,
} from "../../resources/general.axios.resources";
import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";

export const getDishesWithNamesAndNotIds = async (
  offset: number,
  limit: number
) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/dishes/dishesWithRestaurantName/${offset}/${limit}`
  );
};

export const getDishesForRestaurant = async (id: string) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/dishes/forRestaurant/${id}`
  );
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
  Ingredients.forEach((ingredient, index) => {
    formData.append(`Ingredients[${index}]`, ingredient);
  });

  tags.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag);
  });

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

export const changeDish = async (
  dish_id: string,
  name: string,
  restaurantId: string,
  price: string,
  ingredients: string[],
  tags: string[],
  image?: string,
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("restaurant", restaurantId);
  ingredients.forEach((ingredient, index) => {
    formData.append(`Ingredients[${index}]`, ingredient);
  });

  tags.forEach((tag, index) => {
    formData.append(`tags[${index}]`, tag);
  });
  // formData.append("signatureDishId", signatureDishId);
  if (image) {
    formData.append("image", image);
  }
  if (imageprops) {
    formData.append("image", imageprops.public_id);
    formData.append("version", imageprops.version);
    formData.append("signature", imageprops.signature);
  }
  try {
    const response = await axios.patch(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/dishes/${dish_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return updateDishResource.onFail;
    }
    return updateDishResource.onSuccuss;
  } catch (error) {
    return updateDishResource.onFail;
  }
};