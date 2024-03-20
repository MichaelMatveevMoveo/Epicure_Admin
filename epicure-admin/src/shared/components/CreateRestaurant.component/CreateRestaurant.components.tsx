import React, { useEffect, useState } from "react";
import "./CreateRestaurant.style.scss";
import { ChefType } from "../../../data/types/backEndData.types";
import { getAllSize } from "../../../services/axios/general.axios";

const CreateRestaurant = () => {
  const [chefs, setChefs] = useState<ChefType[]>([]);

  const fetchChefs = async (collectionName: string) => {
    const response = await getAllSize(collectionName);
    setChefs(response.data);
  };
  useEffect(() => {
    fetchChefs("chefs");
  }, []);
  return (
    <div className="CreateResturantMainDiv">
      <h2>Create New Restaurant:</h2>
      <label htmlFor="name">name:</label>
      <input type="text" name="name" id="name"></input>
      <label htmlFor="image">image:</label>
      <input type="text" name="image" id="image"></input>
      <label htmlFor="chefs">chefs:</label>
      {chefs.length > 0 && (
        <select name="chefs" id="chefs">
          {chefs.map((value) => {
            return (
              <option key={value._id} value={value._id}>
                {value.name}
              </option>
            );
          })}
        </select>
      )}
      <label htmlFor="stars">stars:</label>
      <select name="stars" id="stars">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {/* <label htmlFor="signatureDish">signatureDish:</label>
      <select name="signatureDish" id="signatureDish">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="isPopular">isPopular:</label>
      <input type="checkbox" name="isPopular" value="isPopular"></input> */}
    </div>
  );
};

export default CreateRestaurant;
