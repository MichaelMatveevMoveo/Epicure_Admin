import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import { getCollectionSizeThunk } from "../redux-toolkit/thunks/general.thanks";
import { setCollectionName } from "../redux-toolkit/slices/collection.slice";

export function MainPage() {
  const { collectionName } = useParams();
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.collection.size);

  useEffect(() => {
    dispatch(setCollectionName(collectionName));
    if (collectionName) {
      dispatch(getCollectionSizeThunk(collectionName));
    }
  }, [dispatch, collectionName]);

  return (
    <div className="MainPageDiv">
      <h1>{collectionName}</h1>
      {size && <p>{`${size} entries found`}</p>}
    </div>
  );
}
