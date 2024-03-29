import { GridColDef } from "@mui/x-data-grid";
import { CLOUD_NAME } from "./backEnd.constants";
import MyRoundImage from "../components/MyRoundImage.component/MyRoundImage.components";
export const Chefcolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 70,
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
    width: 300,
    editable: true,
  },
  {
    field: "isActive",
    headerName: "status",
    type: "boolean",
    width: 100,
    editable: true,
  },
  {
    field: "isCeffOfWeek§",
    headerName: "Is Chef Week",
    type: "boolean",
    width: 100,
    editable: true,
  },
];

export const Restaurantscolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 70,
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
    width: 50,
    editable: true,
  },
  {
    field: "stars",
    headerName: "Stars",
    type: "number",
    width: 100,
    editable: true,
  },
  {
    field: "isActive",
    headerName: "status",
    type: "boolean",
    width: 100,
    editable: true,
  },
  {
    field: "isPopular",
    headerName: "Is Popular",
    type: "boolean",
    width: 100,
    editable: true,
  },
  {
    field: "signatureDishId",
    headerName: "Signature Dish",
    width: 100,
    editable: true,
  },
];

export const Dishescolumns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 70,
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
    width: 300,
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
    width: 300,
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
    width: 100,
    editable: true,
  },
  {
    field: "restaurant",
    headerName: "restaurant",
    width: 100,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 100,
    editable: true,
  },
];
