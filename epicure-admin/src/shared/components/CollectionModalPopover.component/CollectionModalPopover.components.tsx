import React, { useCallback } from "react";
import Popover from "@mui/material/Popover";
import {
  ChefType,
  DishType,
  RestaurantType,
} from "../../../data/types/backEndData.types";
import { options } from "../../constants/backEnd.constants";
import CreateChef from "../CreateChef.component/CreateChef.components";
import CreateRestaurant from "../CreateRestaurant.component/CreateRestaurant.components";
import CreateDish from "../CreateDish.component/CreateDish.components";
import "./CollectionModalPopover.style.scss";

interface CollectionModalPopoversProps {
  collectionName: string;
  anchorEl: null | HTMLElement;
  selectedRow: ChefType | RestaurantType | DishType | null;
  handleClosePopover: () => void;
}

const CollectionModalPopover: React.FC<CollectionModalPopoversProps> = ({
  collectionName,
  anchorEl,
  selectedRow,
  handleClosePopover,
}) => {
  // modal data function creator
  const ModalInfoBaseCollection = useCallback(() => {
    if (selectedRow) {
      switch (collectionName) {
        case options.chefs.key:
          return <CreateChef chef={selectedRow as ChefType} />;
        case options.restaurants.key:
          return (
            <CreateRestaurant restaurant={selectedRow as RestaurantType} />
          );
        case options.dishes.key:
          return <CreateDish dish={selectedRow as DishType} />;
        default:
          return <p>default update</p>;
      }
    } else {
      switch (collectionName) {
        case options.chefs.key:
          return <CreateChef />;
        case options.restaurants.key:
          return <CreateRestaurant />;
        case options.dishes.key:
          return <CreateDish />;

        default:
          return <p>default</p>;
      }
    }
  }, [selectedRow, collectionName]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      PaperProps={{
        className: "popoverPaper container", // Add the class name
      }}
    >
      {ModalInfoBaseCollection()}
    </Popover>
  );
};

export default CollectionModalPopover;
