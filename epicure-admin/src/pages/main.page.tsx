import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import {
  getCollectionItemsThunk,
  getCollectionSizeThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
} from "../redux-toolkit/thunks/general.thanks";
import { RootState } from "../redux-toolkit/store/store";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./mainPage.style.scss";

import {
  Chefcolumns,
  Restaurantscolumns,
  Dishescolumns,
} from "../shared/constants/tableShowData.constants";
import CreateRestaurant from "../shared/components/CreateRestaurant.component/CreateRestaurant.components";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();

  const [columns, setColumns] = useState<GridColDef[]>([]);

  const size = useAppSelector((state: RootState) => state.collection.size);

  const entities = useAppSelector(
    (state: RootState) => state.collection.entities
  );

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
              disableRowSelectionOnClick
              className="dataGrid-root"
            />
          </Box>
        </div>
      )}
      {/* {entities.length > 0 && <CreateRestaurant />} */}
    </div>
  );
};
