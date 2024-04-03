import React, { useCallback } from "react";
import "./DeleteButton.style.scss";
import { deleteItemFromCollection } from "../../../services/axios/general.axios";
import { withBase } from "../../constants/route.constants";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { changeEntityStatus } from "../../../redux-toolkit/slices/collection.slice";

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
    dispatch(changeEntityStatus(itemId));
  }, [collectionName, itemId]);

  return (
    <img
      src={withBase("/icons/deleteIconBlack.png")}
      className="deleteImg"
      onClick={deleteItemHandler}
    />
  );
};

export default DeleteButton;
