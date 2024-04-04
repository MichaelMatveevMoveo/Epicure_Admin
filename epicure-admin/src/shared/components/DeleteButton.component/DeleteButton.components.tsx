import React, { useCallback } from "react";
import "./DeleteButton.style.scss";
import { deleteItemFromCollection } from "../../../services/axios/general.axios";
import { withBase } from "../../constants/route.constants";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { removeEntity } from "../../../redux-toolkit/slices/collection.slice";
import { getCollectionSizeThunk } from "../../../redux-toolkit/thunks/general.thanks";

interface DeleteButtonProps {
  collectionName: string;
  itemId: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  collectionName,
  itemId,
}) => {
  const dispatch = useAppDispatch();
  const deleteItemHandler = useCallback(async () => {
    await deleteItemFromCollection(collectionName, itemId);
    dispatch(removeEntity(itemId));
    dispatch(getCollectionSizeThunk(collectionName));
  }, [collectionName, dispatch, itemId]);

  return (
    <img
      src={withBase("/icons/deleteIconBlack.png")}
      className="deleteImg"
      onClick={deleteItemHandler}
    />
  );
};

export default DeleteButton;
