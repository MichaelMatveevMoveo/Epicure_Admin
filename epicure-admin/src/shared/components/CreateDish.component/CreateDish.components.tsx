import React, { useCallback, useEffect, useState } from "react";
import {
  DishType,
  RestaurantType,
} from "../../../data/types/backEndData.types";
import { uploadImage } from "../../../services/cloudinary.services";
import { getAllSize } from "../../../services/axios/general.axios";
import { createDishText } from "../../../resources/createDish.resources";
import { addDish, changeDish } from "../../../services/axios/dishes.axios";
import MyRoundImage from "../MyRoundImage.component/MyRoundImage.components";

import "./CreateDish.style.scss";
import { useAppDispatch } from "../../hooks/hooks";
import { getCollectionSizeThunk } from "../../../redux-toolkit/thunks/general.thanks";
import { options } from "../../constants/backEnd.constants";
import {
  CreateDishResource,
  updateDishResource,
} from "../../../resources/general.axios.resources";
interface CreateDishProps {
  dish?: DishType | null;
}

const CreateDish: React.FC<CreateDishProps> = ({ dish = null }) => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [dishName, setDishName] = useState<string>(dish ? dish.name : "");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(
    dish ? dish.restaurant : ""
  );
  const [price, setPrice] = useState<string>(
    dish ? dish.price.toString() : "0"
  );

  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>(
    dish ? dish.Ingredients : []
  );

  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>(dish ? dish.tags : []);

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

  //handles for  Ingredient
  const addIngredient = useCallback(() => {
    setIngredients([...ingredients, currentIngredient]);
  }, [currentIngredient, ingredients]);

  const removeIngredient = useCallback(
    (value: string) => {
      const updatedList = ingredients.filter((item) => item !== value);
      setIngredients(updatedList);
    },
    [ingredients]
  );

  //handles for  tags
  const addTag = useCallback(() => {
    setTags([...tags, currentTag]);
  }, [currentTag, tags]);

  const removeTag = useCallback(
    (value: string) => {
      const updatedList = tags.filter((item) => item !== value);
      setTags(updatedList);
    },
    [tags]
  );

  const createDishHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (newImageData) {
      if (
        await addDish(
          dishName,
          selectedRestaurantId,
          price,
          ingredients,
          tags,
          newImageData
        )
      ) {
        dispatch(getCollectionSizeThunk(options.dishes.key));
        setSendresponse(CreateDishResource.onSuccuss);
      } else {
        setSendresponse(CreateDishResource.onFail);
      }
    }
  }, [
    fileUpload,
    dishName,
    selectedRestaurantId,
    price,
    ingredients,
    tags,
    dispatch,
  ]);

  const updateDishHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (dish) {
      let isSuccesses = false;
      if (newImageData) {
        isSuccesses = await changeDish(
          dish?._id,
          dishName,
          selectedRestaurantId,
          price,
          ingredients,
          tags,
          undefined,
          newImageData
        );
      } else {
        isSuccesses = await changeDish(
          dish?._id,
          dishName,
          selectedRestaurantId,
          price,
          ingredients,
          tags,
          dish?.image
        );
      }
      if (isSuccesses) {
        setSendresponse(updateDishResource.onSuccuss);
      } else {
        setSendresponse(updateDishResource.onFail);
      }
    }
  }, [
    fileUpload,
    dish,
    dishName,
    selectedRestaurantId,
    price,
    ingredients,
    tags,
  ]);

  // const deleteDishHandler = useCallback(async () => {
  //   if (dish) {
  //     setSendresponse(
  //       await deleteItemFromCollection(options.dishes.key, dish._id)
  //     );
  //   }
  // }, [dish]);

  const fetchRestaurants = useCallback(async (collectionName: string) => {
    const response = await getAllSize(collectionName);
    setRestaurants(response.data);
    if (!dish) {
      return;
    }
    const restaurant = response.data.find(
      (restaurant: RestaurantType) => restaurant.name == dish.restaurant
    );
    if (restaurant) {
      setSelectedRestaurantId(restaurant._id);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants("restaurants");
  }, [fetchRestaurants]);

  return (
    <div className="CreateDishMainDiv">
      <h2>{dish ? createDishText.titleUpdate : createDishText.titleCreate}</h2>
      <label htmlFor="name">{createDishText.inputs.name}</label>
      <input
        type="text"
        name="name"
        id="name"
        value={dishName}
        onChange={(event) => {
          setDishName(event.currentTarget.value);
        }}
      ></input>
      <label htmlFor="restaurants">{createDishText.inputs.restaurant}</label>
      {restaurants.length > 0 && (
        <select
          name="restaurants"
          id="restaurants"
          value={selectedRestaurantId}
          onChange={(event) => {
            setSelectedRestaurantId(event.currentTarget.value);
          }}
        >
          <option key={"----"} value={""}>
            ----
          </option>
          {restaurants.map((value) => {
            return (
              <option key={value._id} value={value._id}>
                {value.name}
              </option>
            );
          })}
        </select>
      )}
      <label htmlFor="price">{createDishText.inputs.price}</label>
      <input
        type="text"
        name="price"
        id="price"
        value={price}
        onChange={(event) => {
          setPrice(event.currentTarget.value);
        }}
      />
      <label htmlFor="ingredient">{createDishText.inputs.ingredient}</label>
      <input
        type="text"
        name="ingredient"
        id="ingredient"
        value={currentIngredient}
        onChange={(event) => setCurrentIngredient(event.currentTarget.value)}
        placeholder="Enter an item"
      />
      <ul>
        {ingredients.map((item) => (
          <li
            className="LinkText"
            onClick={() => removeIngredient(item)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <button onClick={addIngredient}>Add</button>
      <label htmlFor="tag">{createDishText.inputs.tag}</label>
      <input
        type="text"
        name="tag"
        id="tag"
        value={currentTag}
        onChange={(event) => setCurrentTag(event.currentTarget.value)}
        placeholder="Enter an item"
      />
      <ul>
        {tags.map((item) => (
          <li className="LinkText" onClick={() => removeTag(item)} key={item}>
            {item}
          </li>
        ))}
      </ul>
      <button onClick={addTag}>Add</button>

      {dish?.image && (
        <div>
          <p>{createDishText.inputs.oldImage_Image}</p>
          <div className="CreateUserOldImage">
            <MyRoundImage url={dish.image} alt={"restaurant"} />
          </div>
        </div>
      )}

      <label htmlFor="file-field">{createDishText.inputs.choose_Image}</label>
      <input id="file-field" type="file" onChange={handleFileChange} />
      {sendresponse && <p>{sendresponse}</p>}
      <button onClick={dish ? updateDishHandler : createDishHandler}>
        {dish ? "update" : "create"}
      </button>
    </div>
  );
};

export default CreateDish;
