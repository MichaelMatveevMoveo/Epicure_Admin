import React, { useCallback, useEffect, useState } from "react";
import { RestaurantType } from "../../../data/types/backEndData.types";
import { uploadImage } from "../../../services/cloudinary.services";
import { addDish, getAllSize } from "../../../services/axios/general.axios";
import { createDishText } from "../../../resources/createDish.resources";

const CreateDish = () => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [dishName, setDishName] = useState<string>("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [price, setPrice] = useState<string>("0");

  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [sendresponse, setSendresponse] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

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
      setSendresponse(
        await addDish(
          dishName,
          selectedRestaurantId,
          price,
          ingredients,
          tags,
          newImageData
        )
      );
    }
  }, [fileUpload, dishName, selectedRestaurantId, price, ingredients, tags]);

  const fetchRestaurants = useCallback(async (collectionName: string) => {
    const response = await getAllSize(collectionName);
    setRestaurants(response.data);
  }, []);

  useEffect(() => {
    fetchRestaurants("restaurants");
  }, [fetchRestaurants]);

  return (
    <div className="CreateResturantMainDiv">
      <h2>{createDishText.title}</h2>
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
          <li key={item}>
            {item}
            <button onClick={() => removeIngredient(item)}>remove</button>
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
          <li key={item}>
            {item}
            <button onClick={() => removeTag(item)}>remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addTag}>Add</button>

      <label htmlFor="file-field">{createDishText.inputs.choose_Image}</label>
      <input id="file-field" type="file" onChange={handleFileChange} />
      {sendresponse && <p>{sendresponse}</p>}
      <button onClick={createDishHandler}>create</button>
    </div>
  );
};

export default CreateDish;
