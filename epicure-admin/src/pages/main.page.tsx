import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Popover from "@mui/material/Popover";

import "./mainPage.style.scss";

import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import {
  getCollectionSizeThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
  getCollectionItemsPageThunk,
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
import CreateChef from "../shared/components/CreateChef.component/CreateChef.components";
import { options } from "../shared/constants/backEnd.constants";
import { mainPageText } from "../resources/mainPage.resources";
import CreateDish from "../shared/components/CreateDish.component/CreateDish.components";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();

  const size = useAppSelector((state: RootState) => state.collection.size);
  const entities = useAppSelector(
    (state: RootState) => state.collection.entities
  );

  //Grid data table
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 1,
  });

  const fetchDataForTable = useCallback(() => {
    switch (collectionName) {
      case "chefs":
        dispatch(
          getCollectionItemsPageThunk({
            collectionName,
            offset: paginationModel.page,
            limit: paginationModel.pageSize,
          })
        );
        setColumns(Chefcolumns);
        break;
      case "restaurants":
        dispatch(
          getRestaurantsWithNameAndNotIdThunk({
            offset: paginationModel.page,
            limit: paginationModel.pageSize,
          })
        );
        setColumns(Restaurantscolumns);
        break;
      case "dishes":
        dispatch(
          getDishesWithNamesAndNotIdsThunk({
            offset: paginationModel.page,
            limit: paginationModel.pageSize,
          })
        );
        setColumns(Dishescolumns);
        break;
      default:
        // Handle default case if needed
        break;
    }
  }, [
    collectionName,
    dispatch,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  // click handlers for modal
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<
    ChefType | RestaurantType | DishType | null
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleRowClick = useCallback(
    (params: GridRowParams<ChefType | RestaurantType | DishType>) => {
      setSelectedRow(params.row);
      setAnchorEl(document.body);
    },
    []
  );

  const handleButtonClick = useCallback(() => {
    setAnchorEl(document.body);
    setIsCreate(true);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
    setIsCreate(false);
  }, []);

  // modal data function creator
  const updateModalInfoBaseCollection = useCallback(() => {
    switch (collectionName) {
      case options.chefs.key:
        return <CreateChef chef={selectedRow as ChefType} />;
      case options.restaurants.key:
        return <CreateRestaurant restaurant={selectedRow as RestaurantType} />;
      case options.dishes.key:
        return <CreateDish dish={selectedRow as DishType} />;
      default:
        return <p>default update</p>;
    }
  }, [collectionName, selectedRow]);

  const createModalInfoBaseCollection = useCallback(() => {
    switch (collectionName) {
      case options.chefs.key:
        return <CreateChef />;
        break;
      case options.restaurants.key:
        return <CreateRestaurant />;
        break;
      case options.dishes.key:
        return <CreateDish />;
        break;
      default:
        return <p>default</p>;
        break;
    }
  }, [collectionName]);

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
      {size && <p>{mainPageText.numberOfEntries(size)}</p>}
      <button onClick={handleButtonClick} className="MainPageCreateButton">
        {mainPageText.createButton(collectionName || "")}
      </button>
      {entities.length > 0 && (
        <div className="MainPageTableDiv">
          <Box className="box-root">
            <DataGrid
              getRowId={(row) => row._id}
              rows={entities}
              rowCount={size ? size : 0}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[1, 5, 10, 20, 50]}
              checkboxSelection
              onRowDoubleClick={handleRowClick}
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
