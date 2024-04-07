import axios from "axios";

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
      }/${
        import.meta.env.VITE_API_V
      }/admin/${CollectionName}/deleteForEver/${item_id}`
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const getCollectionItemsPage = async (
  CollectionName: string,
  offset: number,
  limit: number
) => {
  return await axios.get(
    `${import.meta.env.VITE_PROTOCOL}://${
      import.meta.env.VITE_BACKEND_URL_FOR_REST
    }/${
      import.meta.env.VITE_API_V
    }/${CollectionName}/getPartOfItems/${offset}/${limit}`
  );
};

export const changeIsActiveRestaurant = async (
  collectionName: string,
  id: string
) => {
  const formData = new FormData();
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_PROTOCOL}://${
        import.meta.env.VITE_BACKEND_URL_FOR_REST
      }/${
        import.meta.env.VITE_API_V
      }/admin/${collectionName}/change/IsActive/${id}`,
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
