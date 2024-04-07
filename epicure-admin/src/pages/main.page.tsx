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
import { appRoutes, withBase } from "../shared/constants/route.constants";

export const MainPage = () => {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();

  const size = useAppSelector((state: RootState) => state.collection.size);
  const isLogin = useAppSelector((state: RootState) => state.cookies.isLogin);
  // click handlers for modal
  const [selectedRow, setSelectedRow] = useState<
    ChefType | RestaurantType | DishType | null
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleRowClick = useCallback(
    (params: GridRowParams<ChefType | RestaurantType | DishType>) => {
      if (isLogin) {
        setSelectedRow(params.row);
        setAnchorEl(document.body);
      }
    },
    [isLogin]
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

  // useEffect(() => {
  //   if (collectionName) {
  //     dispatch(getCollectionSizeThunk(collectionName));
  //   }
  // }, [collectionName, dispatch]);

  return (
    <div className="MainPageDiv">
      <h1 className=" title-shadow">{collectionName}</h1>
      {size && <h3>{mainPageText.numberOfEntries(size)}</h3>}

      <CollectionTable
        collectionName={collectionName ? collectionName : ""}
        handleRowClick={handleRowClick}
      />
      {isLogin && (
        <button
          onClick={handleButtonClick}
          className="MainPageCreateButton myButton "
        >
          {mainPageText.createButton(collectionName || "")}
        </button>
      )}
      {!isLogin && (
        <>
          <p className="pNotice">{mainPageText.login}</p>
          <button
            onClick={() => {
              window.location.href = withBase(appRoutes.login);
            }}
            className="MainPageCreateButton myButton"
          >
            {mainPageText.loginButton}
          </button>
        </>
      )}
      <CollectionModalPopover
        collectionName={collectionName ? collectionName : ""}
        anchorEl={anchorEl}
        selectedRow={selectedRow}
        handleClosePopover={handleClosePopover}
      />
    </div>
  );
};
