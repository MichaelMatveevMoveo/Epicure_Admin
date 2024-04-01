import React, { useCallback } from "react";
import "./DeleteButton.style.scss";
import { deleteItemFromCollection } from "../../../services/axios/general.axios";

interface DeleteButtonProps {
  collectionName: string;
  itemId: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  collectionName,
  itemId,
}) => {
  const deleteItemHandler = useCallback(async () => {
    await deleteItemFromCollection(collectionName, itemId);
  }, [collectionName, itemId]);

  return (
    <img
      src={"/icons/deleteIcon.png"}
      className="deleteImg"
      onClick={deleteItemHandler}
    />
  );
};

export default DeleteButton;
