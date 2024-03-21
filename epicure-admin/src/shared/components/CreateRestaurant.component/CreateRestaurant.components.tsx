import React, { useCallback, useEffect, useState } from "react";
import "./CreateRestaurant.style.scss";
import { ChefType } from "../../../data/types/backEndData.types";
import {
  addRestaurant,
  getAllSize,
} from "../../../services/axios/general.axios";
import { createRestaurantText } from "../../../resources/createRestaurant.resources";
import { uploadImage } from "../../../services/cloudinary.services";

const CreateRestaurant = () => {
  const [chefs, setChefs] = useState<ChefType[]>([]);
  const [restName, setRestName] = useState<string>("");
  const [selectedChefId, setSelectedChefId] = useState<string>("");
  const [stars, setStars] = useState<string>("1");

  const [sendresponse, setSendresponse] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected file:", file);
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
      setSendresponse(
        await addRestaurant(restName, selectedChefId, stars, newImageData)
      );
    }
  }, [fileUpload, uploadImage, addRestaurant, restName, selectedChefId, stars]);

  const fetchChefs = useCallback(async (collectionName: string) => {
    const response = await getAllSize(collectionName);
    setChefs(response.data);
  }, []);
  useEffect(() => {
    fetchChefs("chefs");
  }, [fetchChefs]);
  return (
    <div className="CreateResturantMainDiv">
      <h2>{createRestaurantText.title}</h2>
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
        onChange={(event) => {
          setStars(event.currentTarget.value);
        }}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor="file-field">
        {createRestaurantText.inputs.choose_Image}
      </label>
      <input id="file-field" type="file" onChange={handleFileChange} />
      {sendresponse && <p>{sendresponse}</p>}
      <button onClick={createRestaurantHandler}>create</button>
    </div>
  );
};

export default CreateRestaurant;
