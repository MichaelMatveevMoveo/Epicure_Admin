export type ChefType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive: boolean;
  isCeffOfWeek: boolean;
};

export type RestaurantType = {
  _id: string;
  name: string;
  image: string;
  chef: string;
  isActive: boolean;
  isPopular: boolean;
  stars: number;
  signatureDishId: string;
};

export type DishType = {
  _id: string;
  name: string;
  image: string;
  restaurant: string;
  isActive: boolean;
  Ingredients: string[];
  price: number;
  tags: string[];
};
