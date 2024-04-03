import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../../redux-toolkit/store/store";
import {
  getCollectionItemsPageThunk,
  getDishesWithNamesAndNotIdsThunk,
  getRestaurantsWithNameAndNotIdThunk,
} from "../../../redux-toolkit/thunks/general.thanks";
import {
  Chefcolumns,
  Dishescolumns,
  Restaurantscolumns,
} from "../../constants/tableShowData.constants";
import {
  ChefType,
  DishType,
  RestaurantType,
} from "../../../data/types/backEndData.types";

import "./CollectionTable.style.scss";
interface CollectionTableProps {
  collectionName: string;
  handleRowClick: (
    params: GridRowParams<ChefType | RestaurantType | DishType>
  ) => void;
}
const CollectionTable: React.FC<CollectionTableProps> = ({
  collectionName,
  handleRowClick,
}) => {
  const dispatch = useAppDispatch();

  const size = useAppSelector((state: RootState) => state.collection.size);
  const entities = useAppSelector(
    (state: RootState) => state.collection.entities
  );

  //Grid data table
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const fetchDataForTable = useCallback(() => {
    switch (collectionName) {
      case "chefs":
        dispatch(
          getCollectionItemsPageThunk({
            collectionName,
            offset: paginationModel.page * paginationModel.pageSize,
            limit: paginationModel.pageSize,
          })
        );
        setColumns(Chefcolumns);
        break;
      case "restaurants":
        dispatch(
          getRestaurantsWithNameAndNotIdThunk({
            offset: paginationModel.page * paginationModel.pageSize,
            limit: paginationModel.pageSize,
          })
        );
        setColumns(Restaurantscolumns);
        break;
      case "dishes":
        dispatch(
          getDishesWithNamesAndNotIdsThunk({
            offset: paginationModel.page * paginationModel.pageSize,
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
  console.log(entities);

  // use Effects
  useEffect(() => {
    fetchDataForTable();
  }, [fetchDataForTable]);

  return (
    <Box className="box-root">
      <DataGrid
        getRowId={(row) => row._id}
        rows={entities}
        rowHeight={80}
        rowCount={size ? size : 0}
        columns={columns}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[1, 3, 5, 10, 20, 50]}
        checkboxSelection
        onRowDoubleClick={handleRowClick}
        disableRowSelectionOnClick
        className="dataGrid-root"
      />
    </Box>
  );
};

export default CollectionTable;
