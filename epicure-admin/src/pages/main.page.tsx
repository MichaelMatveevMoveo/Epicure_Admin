import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import {
  getCollectionItemsThunk,
  getCollectionSizeThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
} from "../redux-toolkit/thunks/general.thanks";
import { setCollectionName } from "../redux-toolkit/slices/collection.slice";
import { RootState } from "../redux-toolkit/store/store";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./mainPage.style.scss";

import {
  Chefcolumns,
  Restaurantscolumns,
  Dishescolumns,
} from "../shared/constants/tableShowData.constants";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();

  const [columns, setColumns] = useState<GridColDef[]>([]);

  const size = useAppSelector((state: RootState) => state.collection.size);
  const entities = useAppSelector(
    (state: RootState) => state.collection.entities
  );

  useEffect(() => {
    dispatch(setCollectionName(collectionName));
    if (collectionName) {
      dispatch(getCollectionSizeThunk(collectionName));
      if (collectionName == "chefs") {
        dispatch(getCollectionItemsThunk(collectionName));
        setColumns(Chefcolumns);
      }
      if (collectionName == "restaurants") {
        dispatch(getRestaurantsWithNameAndNotIdThunk());
        setColumns(Restaurantscolumns);
      }
      if (collectionName == "dishes") {
        dispatch(getDishesWithNamesAndNotIdsThunk());
        setColumns(Dishescolumns);
      }
    }
  }, [dispatch, collectionName]);

  return (
    <div className="MainPageDiv">
      <h1>{collectionName}</h1>
      {size && <p>{`${size} entries found`}</p>}
      {entities.length > 0 && (
        <div className="MainPageTableDiv">
          <Box sx={{ height: "500px", width: "100%" }}>
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
              sx={{
                boxShadow: 2,
                border: 2,
                backgroundColor: "#3e2f4e",
                color: "#f5f5f5",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </Box>
        </div>
      )}
      {entities.length > 0 && (
        <div className="MainPageTableDiv">{entities[0]._id}</div>
      )}
    </div>
  );
};
