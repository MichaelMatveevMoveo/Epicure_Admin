import React, { useCallback, useEffect, useState } from "react";
import "./CreateRestaurant.style.scss";
import {
  ChefType,
  DishType,
  RestaurantType,
} from "../../../data/types/backEndData.types";
import { getAllSize } from "../../../services/axios/general.axios";
import { createRestaurantText } from "../../../resources/createRestaurant.resources";
import { uploadImage } from "../../../services/cloudinary.services";
import MyRoundImage from "../MyRoundImage.component/MyRoundImage.components";
import {
  addRestaurant,
  changeRestaurant,
} from "../../../services/axios/restaurants.axios";
import { getDishesForRestaurant } from "../../../services/axios/dishes.axios";

import "./CreateRestaurant.style.scss";
import {
  CreateRestaurantResource,
  updateRestaurantResource,
} from "../../../resources/general.axios.resources";
import { options } from "../../constants/backEnd.constants";
import { getCollectionSizeThunk } from "../../../redux-toolkit/thunks/general.thanks";
import { useAppDispatch } from "../../hooks/hooks";
interface CreateRestaurantProps {
  restaurant?: RestaurantType | null;
}

const CreateRestaurant: React.FC<CreateRestaurantProps> = ({
  restaurant = null,
}) => {
  const [chefs, setChefs] = useState<ChefType[]>([]);
  const [dishes, setDishes] = useState<DishType[]>([]);
  const [restName, setRestName] = useState<string>(
    restaurant ? restaurant.name : ""
  );
  const [selectedChefId, setSelectedChefId] = useState<string>(
    restaurant ? restaurant.chef : ""
  );

  const [selectedDishId, setSelectedDishId] = useState<string>(
    restaurant ? restaurant.signatureDishId : ""
  );

  const [stars, setStars] = useState<string>(
    restaurant ? restaurant.stars.toString() : "1"
  );

  const [sendresponse, setSendresponse] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileUpload(file);
      }
    },
    []
  );

  const createRestaurantHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (newImageData) {
      if (await addRestaurant(restName, selectedChefId, stars, newImageData)) {
        dispatch(getCollectionSizeThunk(options.restaurants.key));
        setSendresponse(CreateRestaurantResource.onSuccuss);
      } else {
        setSendresponse(CreateRestaurantResource.onFail);
      }
    }
  }, [dispatch, fileUpload, restName, selectedChefId, stars]);

  const updateRestaurantHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (restaurant) {
      let isSuccesses = false;
      if (newImageData) {
        isSuccesses = await changeRestaurant(
          restaurant?._id,
          restName,
          selectedChefId,
          stars,
          selectedDishId,
          newImageData
        );
      } else {
        isSuccesses = await changeRestaurant(
          restaurant?._id,
          restName,
          selectedChefId,
          stars,
          selectedDishId
        );
      }
      if (isSuccesses) {
        setSendresponse(updateRestaurantResource.onSuccuss);
      } else {
        setSendresponse(updateRestaurantResource.onFail);
      }
    }
  }, [fileUpload, restaurant, restName, selectedChefId, stars, selectedDishId]);

  // const deleteRestaurantHandler = useCallback(async () => {
  //   if (restaurant) {
  //     setSendresponse(
  //       await deleteItemFromCollection(options.restaurants.key, restaurant._id)
  //     );
  //   }
  // }, [restaurant]);

  const fetchChefs = useCallback(
    async (collectionName: string) => {
      const response = await getAllSize(collectionName);
      setChefs(response.data);
      if (!restaurant) {
        return;
      }
      const chef = response.data.find(
        (chef: ChefType) => chef.name == restaurant.chef
      );
      if (chef) {
        setSelectedChefId(chef.id);
      }
    },
    [restaurant]
  );

  const fetchDishes = useCallback(
    async (id: string) => {
      const response = await getDishesForRestaurant(id);
      setDishes(response.data);
      if (!restaurant) {
        return;
      }
      const dish = response.data.find(
        (dish: DishType) => dish.name == restaurant.signatureDishId
      );
      if (dish) {
        setSelectedDishId(dish._id);
      }
    },
    [restaurant]
  );

  useEffect(() => {
    fetchChefs("chefs");
    if (restaurant) {
      fetchDishes(restaurant._id);
    }
  }, [fetchChefs, fetchDishes, restaurant]);
  return (
    <div className="RestMainDiv">
      <div className="CreateRestaurantMainDiv">
        <h2>
          {restaurant
            ? createRestaurantText.titleUpdate
            : createRestaurantText.titleCreate}
        </h2>
        <label htmlFor="name">{createRestaurantText.inputs.name}</label>
        <input
          type="text"
          name="name"
          id="name"
          value={restName}
          onChange={(event) => {
            setRestName(event.currentTarget.value);
          }}
        ></input>

        <label htmlFor="chefs">{createRestaurantText.inputs.chef}</label>
        {chefs.length > 0 && (
          <select
            name="chefs"
            id="chefs"
            value={selectedChefId}
            onChange={(event) => {
              setSelectedChefId(event.currentTarget.value);
            }}
          >
            {chefs.map((value) => {
              return (
                <option key={value._id} value={value._id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        )}

        <label htmlFor="stars">{createRestaurantText.inputs.stars}</label>
        <select
          name="stars"
          id="stars"
          value={stars}
          onChange={(event) => {
            setStars(event.currentTarget.value);
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <label htmlFor="signatureDishId">
          {createRestaurantText.inputs.signatureDishId}
        </label>
        {chefs.length > 0 && (
          <select
            name="signatureDishId"
            id="signatureDishId"
            value={selectedDishId}
            onChange={(event) => {
              setSelectedDishId(event.currentTarget.value);
            }}
          >
            <option key={undefined} value={undefined}>
              ----
            </option>
            {dishes.map((value) => {
              return (
                <option key={value._id} value={value._id}>
                  {value.name}
                </option>
              );
            })}
          </select>
        )}

        <label htmlFor="file-field">
          {createRestaurantText.inputs.choose_Image}
        </label>
        <input id="file-field" type="file" onChange={handleFileChange} />
        {sendresponse && <p>{sendresponse}</p>}
        <button
          onClick={
            restaurant ? updateRestaurantHandler : createRestaurantHandler
          }
        >
          {restaurant ? "update" : "create"}
        </button>
      </div>
      {restaurant?.image && (
        <div className="UserOldImage">
          <div>
            <MyRoundImage url={restaurant.image} alt={"restaurant"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRestaurant;
