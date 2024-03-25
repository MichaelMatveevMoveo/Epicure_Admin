import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GridRowParams } from "@mui/x-data-grid";

import "./mainPage.style.scss";

import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import { getCollectionSizeThunk } from "../redux-toolkit/thunks/general.thanks";
import { RootState } from "../redux-toolkit/store/store";

import {
  ChefType,
  RestaurantType,
  DishType,
} from "../data/types/backEndData.types";

import { mainPageText } from "../resources/mainPage.resources";
import CollectionTable from "../shared/components/CollectionTable.component/CollectionTable.components";
import CollectionModalPopover from "../shared/components/CollectionModalPopover.component/CollectionModalPopover.components";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();

  const size = useAppSelector((state: RootState) => state.collection.size);

  // click handlers for modal
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
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
    setSelectedRow(null);
  }, []);

  useEffect(() => {
    if (collectionName) {
      dispatch(getCollectionSizeThunk(collectionName));
    }
  }, [collectionName, dispatch]);

  return (
    <div className="MainPageDiv">
      <h1 className=" title-shadow">{collectionName}</h1>
      {size && <p>{mainPageText.numberOfEntries(size)}</p>}
      <CollectionTable
        collectionName={collectionName ? collectionName : ""}
        handleRowClick={handleRowClick}
      />
      <button onClick={handleButtonClick} className="MainPageCreateButton">
        {mainPageText.createButton(collectionName || "")}
      </button>
      <CollectionModalPopover
        collectionName={collectionName ? collectionName : ""}
        anchorEl={anchorEl}
        selectedRow={selectedRow}
        handleClosePopover={handleClosePopover}
      />
    </div>
  );
};
