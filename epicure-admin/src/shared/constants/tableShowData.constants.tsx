import { GridColDef } from "@mui/x-data-grid";
import { CLOUD_NAME, options } from "./backEnd.constants";
import MyRoundImage from "../components/MyRoundImage.component/MyRoundImage.components";
import DeleteButton from "../components/DeleteButton.component/DeleteButton.components";
export const Chefcolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 250 },

  {
    field: "name",
    headerName: "Name",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    maxWidth: 250,
    renderCell: (params) => (
      <MyRoundImage
        url={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.value}.jpg`}
        alt={"chef"}
      />
    ),
  },
  {
    field: "description",
    headerName: "Description",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "isActive",
    headerName: "status",
    type: "boolean",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "isCeffOfWeek§",
    headerName: "Is Chef Week",
    type: "boolean",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "delete",
    headerName: "delete",
    maxWidth: 250,
    renderCell: (params) => (
      <DeleteButton collectionName={options.chefs.key} itemId={params.row.id} />
    ),
  },
];

export const Restaurantscolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    maxWidth: 250,
    renderCell: (params) => (
      <MyRoundImage
        url={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.value}.jpg`}
        alt={"restaurants"}
      />
    ),
  },
  {
    field: "chef",
    headerName: "Chef",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "stars",
    headerName: "Stars",
    type: "number",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "isActive",
    headerName: "status",
    type: "boolean",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "isPopular",
    headerName: "Is Popular",
    type: "boolean",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "signatureDishId",
    headerName: "Signature Dish",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "delete",
    headerName: "delete",
    maxWidth: 250,
    renderCell: (params) => (
      <DeleteButton
        collectionName={options.restaurants.key}
        itemId={params.row.id}
      />
    ),
  },
];

export const Dishescolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    maxWidth: 250,
    renderCell: (params) => (
      <MyRoundImage
        url={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.value}.jpg`}
        alt={"dish"}
      />
    ),
  },
  {
    field: "Ingredients",
    headerName: "Ingredients",
    maxWidth: 250,
    editable: true,
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
    maxWidth: 250,
    editable: true,
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
    headerName: "status",
    type: "boolean",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "restaurant",
    headerName: "restaurant",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    maxWidth: 250,
    editable: true,
  },
  {
    field: "delete",
    headerName: "delete",
    maxWidth: 250,
    renderCell: (params) => (
      <DeleteButton
        collectionName={options.restaurants.key}
        itemId={params.row.id}
      />
    ),
  },
];
