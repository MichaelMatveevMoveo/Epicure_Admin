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
        "https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"
      }
      className="deleteImg"
      onClick={deleteItemHandler}
    />
  );
};

export default DeleteButton;
