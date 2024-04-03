import axios from "axios";

import { deleteChefResource } from "../../resources/general.axios.resources";

export const getCollectionSize = async (CollectionName: string) => {
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${import.meta.env.VITE_API_V}/${CollectionName}/collection/size`
  );
};

export const getAllSize = async (CollectionName: string) => {
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${import.meta.env.VITE_API_V}/${CollectionName}`
  );
};

export const getSignatureForCloud = async () => {
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${import.meta.env.VITE_API_V}/cloud/get-signature`
  );
};

export const deleteItemFromCollection = async (
  CollectionName: string,
  item_id: string
) => {
  try {
    axios.delete(
      `${import.meta.env.VITE_PROTOCOL}://${
        import.meta.env.VITE_BACKEND_URL_FOR_REST
      }/${import.meta.env.VITE_API_V}/admin/${CollectionName}/${item_id}`
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
  console.log(CollectionName);
  console.log(offset);
  console.log(limit);
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${
      import.meta.env.VITE_API_V
    }/${CollectionName}/getPartOfItems/${offset}/${limit}`
  );
};
