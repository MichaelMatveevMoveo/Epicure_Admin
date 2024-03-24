import { collections } from "../../resources/dataBase.resources";

export const BACKEND_URL = "http://localhost";
export const BACKEND_PORT = 3000;
export const BACKEND_V = "/api/v1";

export const options = {
  chefs: { key: "chefs", value: collections.chefs },
  restaurants: { key: "restaurants", value: collections.restaurants },
  dishes: { key: "dishes", value: collections.dishes },
};

export const API_KEY = "133452185731152";
export const CLOUD_NAME = "dw9zgmwld";
