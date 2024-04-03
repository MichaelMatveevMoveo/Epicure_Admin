import axios from "axios";

import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";

export const getRestaurantsWithNameAndNotId = async (
  offset: number,
  limit: number
) => {
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${
      import.meta.env.VITE_API_V
    }/restaurants/chefNameAndsignatureDishName/${offset}/${limit}`
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
      `${import.meta.env.VITE_PROTOCOL}://${
        import.meta.env.VITE_BACKEND_URL_FOR_REST
      }/${import.meta.env.VITE_API_V}/admin/restaurants`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
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
      `${import.meta.env.VITE_PROTOCOL}://${
        import.meta.env.VITE_BACKEND_URL_FOR_REST
      }/${import.meta.env.VITE_API_V}/admin/restaurants/${rest_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
