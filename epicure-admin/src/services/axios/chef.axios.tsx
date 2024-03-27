import axios from "axios";
import { cloudinaryImageCheckType } from "../../data/types/cloudinary.types";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";
import {
  CreateChefResource,
  updateChefResource,
} from "../../resources/general.axios.resources";

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
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/admin/chefs`,
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

export const changeChef = async (
  chef_id: string,
  name: string,
  description: string,
  image?: string,
  imageprops?: cloudinaryImageCheckType
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
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
      `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/admin/chefs/${chef_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return updateChefResource.onFail;
    }
    return updateChefResource.onSuccuss;
  } catch (error) {
    return updateChefResource.onFail;
  }
};
