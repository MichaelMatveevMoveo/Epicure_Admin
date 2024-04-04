import { createSlice } from "@reduxjs/toolkit";
import {
  getCollectionSizeThunk,
  getCollectionItemsThunk,
  getRestaurantsWithNameAndNotIdThunk,
  getDishesWithNamesAndNotIdsThunk,
  getCollectionItemsPageThunk,
} from "../thunks/general.thanks";
import {
  ChefType,
  RestaurantType,
  DishType,
} from "../../data/types/backEndData.types";

interface collectionState {
  isLoading: boolean;
  isError: boolean;
  collectionName: string | null;
  size: number | null;
  entities: ChefType[] | RestaurantType[] | DishType[];
}

const initialState: collectionState = {
  isLoading: false,
  isError: false,
  collectionName: null,
  size: null,
  entities: [],
};
const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSize(state, action) {
      state.size = action.payload;
    },
    setCollectionName(state, action) {
      state.collectionName = action.payload;
    },
    setChefOfWeek(state, action) {
      const oldChefOfWeek = state.entities.find(
        (chef) => "isCeffOfWeek" in chef && chef.isCeffOfWeek === true
      );
      if (oldChefOfWeek && "isCeffOfWeek" in oldChefOfWeek) {
        oldChefOfWeek.isCeffOfWeek = false;
      }
      const newChefOfWeek = state.entities.find(
        (chef) => chef._id === action.payload
      );
      if (newChefOfWeek && "isCeffOfWeek" in newChefOfWeek) {
        newChefOfWeek.isCeffOfWeek = true;
      }
    },
    changeEntityStatus(state, action) {
      const chef1234 = state.entities.find(
        (chef) => chef._id === action.payload
      );
      if (chef1234) {
        chef1234.isActive = false;
      }
    },

    removeEntity(state, action) {
      const indexToRemove = state.entities.findIndex(
        (entity) => entity._id === action.payload
      );
      if (indexToRemove !== -1) {
        state.entities.splice(indexToRemove, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCollectionSizeThunk.pending, (state) => {
      state.isLoading = true;
      state.size = null;
    });
    builder.addCase(getCollectionSizeThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getCollectionSizeThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.size = action.payload;
    });
    builder.addCase(getCollectionItemsThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getCollectionItemsThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getCollectionItemsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.entities = action.payload;
    });

    builder.addCase(getCollectionItemsPageThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getCollectionItemsPageThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getCollectionItemsPageThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.entities = action.payload;
    });

    builder.addCase(getRestaurantsWithNameAndNotIdThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getRestaurantsWithNameAndNotIdThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(
      getRestaurantsWithNameAndNotIdThunk.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.entities = action.payload;
      }
    );
    builder.addCase(getDishesWithNamesAndNotIdsThunk.pending, (state) => {
      state.isLoading = true;
      state.entities = [];
    });
    builder.addCase(getDishesWithNamesAndNotIdsThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(
      getDishesWithNamesAndNotIdsThunk.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.entities = action.payload;
      }
    );
  },
});

export const {
  setSize,
  setCollectionName,
  setChefOfWeek,
  changeEntityStatus,
  removeEntity,
} = collectionSlice.actions;
export default collectionSlice.reducer;
