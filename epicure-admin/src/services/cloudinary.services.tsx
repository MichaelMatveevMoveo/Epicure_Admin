import axios from "axios";
import { API_KEY, CLOUD_NAME } from "../shared/constants/backEnd.constants";
import { getSignatureForCloud } from "./axios/general.axios";
import { cloudinaryImageCheckType } from "../data/types/cloudinary.types";

export const uploadImage = async (
  file: File
): Promise<cloudinaryImageCheckType | null> => {
  const signatureResponse = await getSignatureForCloud();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", API_KEY);
  formData.append("signature", signatureResponse.data.signature);
  formData.append("timestamp", signatureResponse.data.timestamp);
  try {
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (e) {
          console.log(e.total ? e.loaded / e.total : undefined);
        },
      }
    );

    return {
      public_id: cloudinaryResponse.data.public_id,
      version: cloudinaryResponse.data.version,
      signature: cloudinaryResponse.data.signature,
    };
  } catch (error) {
    return null;
  }
};
