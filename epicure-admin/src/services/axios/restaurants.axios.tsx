import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import {
  CreateRestaurantResource,
  updateRestaurantResource,
} from "../../resources/general.axios.resources";
import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";

export const getRestaurantsWithNameAndNotId = async (
  offset: number,
  limit: number
) => {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/restaurants/chefNameAndsignatureDishName/${offset}/${limit}`
  );
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
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/admin/restaurants`,
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

export const changeRestaurant = async (
  rest_id: string,
  name: string,
  chef: string,
  stars: string,
  signatureDishId: string,
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("stars", stars);
  formData.append("chef", chef);
  formData.append("signatureDishId", signatureDishId);
  if (imageprops) {
    formData.append("image", imageprops.public_id);
    formData.append("version", imageprops.version);
    formData.append("signature", imageprops.signature);
  }
  try {
    const response = await axios.patch(
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/admin/restaurants/${rest_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return updateRestaurantResource.onFail;
    }
    return updateRestaurantResource.onSuccuss;
  } catch (error) {
    return updateRestaurantResource.onFail;
  }
};
