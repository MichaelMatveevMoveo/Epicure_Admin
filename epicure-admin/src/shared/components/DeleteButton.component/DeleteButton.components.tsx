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
      src={
        "https://cdn1.vectorstock.com/i/1000x1000/08/25/delete-chalk-white-icon-on-black-background-vector-35240825.jpg"
      }
      className="deleteImg"
      onClick={deleteItemHandler}
    />
  );
};

export default DeleteButton;
