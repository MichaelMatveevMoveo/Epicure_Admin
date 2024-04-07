import { GridColDef } from "@mui/x-data-grid";
import { options } from "./backEnd.constants";
import MyRoundImage from "../components/MyRoundImage.component/MyRoundImage.components";
import DeleteButton from "../components/DeleteButton.component/DeleteButton.components";

import IsChefOFWeekColumn from "../components/IsChefOFWeekColumn.component/IsChefOFWeekColumn";
import IsPopularSwitch from "../components/IsPopularSwitch.component/IsPopularSwitch.components";
import IsActiveSwitch from "../components/IsActiveSwitch.component/IsActiveSwitch.components";

export const Chefcolumns: GridColDef[] = [
  { field: "_id", headerName: "ID" },

  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => <MyRoundImage url={params.value} alt={"chef"} />,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "isActive",
    headerName: "Active",
    renderCell: (params) => (
      <IsActiveSwitch
        collectionName={options.chefs.key}
        id={params.row._id}
        isActive={params.row.isActive}
      />
    ),
  },
  {
    field: "isChefWeek",
    headerName: "Is Chef Week",
    renderCell: (params) => (
      <div>
        {params.row.isCeffOfWeek ? (
          "yes"
        ) : (
          <IsChefOFWeekColumn chefId={params.row.id} />
        )}
      </div>
    ),
  },
  {
    field: "remove",
    headerName: "remove",
    renderCell: (params) => (
      <DeleteButton
        collectionName={options.chefs.key}
        itemId={params.row._id}
      />
    ),
  },
];

export const Restaurantscolumns: GridColDef[] = [
  { field: "_id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => (
      <MyRoundImage url={params.value} alt={"restaurants"} />
    ),
  },
  {
    field: "chef",
    headerName: "Chef",
    width: 150,
  },
  {
    field: "stars",
    headerName: "Stars",
    type: "number",
  },
  {
    field: "isActive",
    headerName: "Active",
    renderCell: (params) => (
      <IsActiveSwitch
        collectionName={options.restaurants.key}
        id={params.row._id}
        isActive={params.row.isActive}
      />
    ),
  },
  {
    field: "isPopular",
    headerName: "Is Popular",
    renderCell: (params) => (
      <IsPopularSwitch
        restaurantId={params.row._id}
        isPopular={params.row.isPopular}
      />
    ),
  },
  {
    field: "signatureDishId",
    headerName: "Signature Dish",
    width: 150,
    editable: true,
  },
  {
    field: "remove",
    headerName: "remove",
    renderCell: (params) => (
      <DeleteButton
        collectionName={options.restaurants.key}
        itemId={params.row._id}
      />
    ),
  },
];

export const Dishescolumns: GridColDef[] = [
  { field: "_id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => <MyRoundImage url={params.value} alt={"dish"} />,
  },
  {
    field: "Ingredients",
    width: 200,
    headerName: "Ingredients",
    valueGetter: (params) => {
      const ingredients = params.row.Ingredients;
      if (ingredients && Array.isArray(ingredients)) {
        return ingredients.join(", ");
      }
      return "";
    },
  },
  {
    field: "tags",
    headerName: "Tags",
    valueGetter: (params) => {
      const tags = params.row.tags;
      if (tags && Array.isArray(tags)) {
        return tags.join(", ");
      }
      return "";
    },
  },
  {
    field: "isActive",
    headerName: "Active",
    renderCell: (params) => (
      <IsActiveSwitch
        collectionName={options.dishes.key}
        id={params.row._id}
        isActive={params.row.isActive}
      />
    ),
  },
  {
    field: "restaurant",
    headerName: "restaurant",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
  },
  {
    field: "remove",
    headerName: "remove",
    renderCell: (params) => (
      <DeleteButton
        collectionName={options.dishes.key}
        itemId={params.row._id}
      />
    ),
  },
];
