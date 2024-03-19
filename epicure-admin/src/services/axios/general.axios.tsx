import axios from "axios";
import {
  BACKEND_PORT,
  BACKEND_URL,
  BACKEND_V,
} from "../../shared/constants/backEnd.constants";

export async function getCollectionSize(CollectionName: string) {
  return await axios.get(
    `${BACKEND_URL}:${BACKEND_PORT}${BACKEND_V}/${CollectionName}/collection/size`
  );
}
