import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Popover from "@mui/material/Popover";

import "./mainPage.style.scss";

import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import {
  getCollectionItemsThunk,
  getCollectionSizeThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
} from "../redux-toolkit/thunks/general.thanks";
import { RootState } from "../redux-toolkit/store/store";

import {
  Chefcolumns,
  Restaurantscolumns,
  Dishescolumns,
} from "../shared/constants/tableShowData.constants";
import {
  ChefType,
  RestaurantType,
  DishType,
} from "../data/types/backEndData.types";

import CreateRestaurant from "../shared/components/CreateRestaurant.component/CreateRestaurant.components";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();
  const size = useAppSelector((state: RootState) => state.collection.size);
  const entities = useAppSelector(
    (state: RootState) => state.collection.entities
  );

  //Grid data table
  const [columns, setColumns] = useState<GridColDef[]>([]);

  const fetchDataForTable = useCallback(() => {
    switch (collectionName) {
      case "chefs":
        dispatch(getCollectionItemsThunk(collectionName));
        setColumns(Chefcolumns);
        break;
      case "restaurants":
        dispatch(getRestaurantsWithNameAndNotIdThunk());
        setColumns(Restaurantscolumns);
        break;
      case "dishes":
        dispatch(getDishesWithNamesAndNotIdsThunk());
        setColumns(Dishescolumns);
        break;
      default:
        // Handle default case if needed
        break;
    }
  }, [collectionName, dispatch, setColumns]);

  // click handlers for modal
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<
    ChefType | RestaurantType | DishType | null
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleRowClick = useCallback((params: GridRowParams<ChefType>) => {
    setSelectedRow(params.row);
    setAnchorEl(document.body);
  }, []);

  const handleButtonClick = useCallback(() => {
    setAnchorEl(document.body);
    setIsCreate(true);
  }, []);

  const handleClosePopover = useCallback(() => {
    setSelectedRow(null);
    setAnchorEl(null);
    setIsCreate(false);
  }, []);

  // modal data function creator
  const updateModalInfoBaseCollection = useCallback(() => {
    switch (collectionName) {
      case "chefs":
        return <p>chefs update</p>;
        break;
      case "restaurants":
        return <p>restaurants update</p>;
        break;
      case "dishes":
        return <p>dishes update</p>;
        break;
      default:
        return <p>default update</p>;
        break;
    }
  }, [collectionName, dispatch]);

  const createModalInfoBaseCollection = useCallback(() => {
    switch (collectionName) {
      case "chefs":
        return <p>chefs create</p>;
        break;
      case "restaurants":
        return <CreateRestaurant />;
        break;
      case "dishes":
        return <p>dishes create</p>;
        break;
      default:
        return <p>default</p>;
        break;
    }
  }, [collectionName, dispatch]);

  const ModalInfoBaseCollection = useCallback(() => {
    if (isCreate) {
      return createModalInfoBaseCollection();
    }
    return updateModalInfoBaseCollection();
  }, [updateModalInfoBaseCollection, createModalInfoBaseCollection, isCreate]);

  // use Effects
  useEffect(() => {
    fetchDataForTable();
  }, [fetchDataForTable]);

  useEffect(() => {
    if (collectionName) {
      dispatch(getCollectionSizeThunk(collectionName));
    }
  }, [collectionName, dispatch]);

  return (
    <div className="MainPageDiv">
      <h1>{collectionName}</h1>
      {size && <p>{`${size} entries found`}</p>}
      <button
        onClick={handleButtonClick}
        className="MainPageCreateButton"
      >{`add ${collectionName}`}</button>
      {entities.length > 0 && (
        <div className="MainPageTableDiv">
          <Box className="box-root">
            <DataGrid
              getRowId={(row) => row._id}
              rows={entities}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 20,
                  },
                },
              }}
              pageSizeOptions={[1, 5, 10, 20, 50]}
              checkboxSelection
              onRowClick={handleRowClick}
              disableRowSelectionOnClick
              className="dataGrid-root"
            />
          </Box>
        </div>
      )}

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
          className: "popoverPaper", // Add the class name
        }}
      >
        {ModalInfoBaseCollection()}
      </Popover>
    </div>
  );
};
