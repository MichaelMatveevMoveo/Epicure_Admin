import { ChefType } from "../../../data/types/backEndData.types";
import { getCollectionSizeThunk } from "../../../redux-toolkit/thunks/general.thanks";
import { createChefText } from "../../../resources/createChef.resources";
import {
  CreateChefResource,
  updateChefResource,
} from "../../../resources/general.axios.resources";
import { addChef, changeChef } from "../../../services/axios/chef.axios";
import { uploadImage } from "../../../services/cloudinary.services";
import { options } from "../../constants/backEnd.constants";
import { useAppDispatch } from "../../hooks/hooks";
import MyRoundImage from "../MyRoundImage.component/MyRoundImage.components";
import "./CreateChef.style.scss";
import { useCallback, useState } from "react";

interface CreateChefProps {
  chef?: ChefType | null;
}
const CreateChef: React.FC<CreateChefProps> = ({ chef = null }) => {
  const [chefName, setChefName] = useState<string>(chef ? chef.name : "");
  const [chefDescription, setChefDescription] = useState<string>(
    chef ? chef.description : ""
  );
  const [sendresponse, setSendresponse] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileUpload(file);
      }
    },
    []
  );

  const createChefHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (newImageData) {
      if (await addChef(chefName, chefDescription, newImageData)) {
        dispatch(getCollectionSizeThunk(options.chefs.key));
        setSendresponse(CreateChefResource.onSuccuss);
      } else {
        setSendresponse(CreateChefResource.onFail);
      }
    }
  }, [fileUpload, chefName, chefDescription, dispatch]);

  const updateChefHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (!chef) {
      setSendresponse(updateChefResource.onFail);
      return;
    }

    let isSuccesses = false;
    if (newImageData) {
      isSuccesses = await changeChef(
        chef?._id,
        chefName,
        chefDescription,
        undefined,
        newImageData
      );
    } else {
      isSuccesses = await changeChef(
        chef?._id,
        chefName,
        chefDescription,
        chef?.image
      );
    }
    if (isSuccesses) {
      setSendresponse(updateChefResource.onSuccuss);
    } else {
      setSendresponse(updateChefResource.onFail);
    }
  }, [fileUpload, chef, chefName, chefDescription]);

  // const deleteChefHandler = useCallback(async () => {
  //   if (chef) {
  //     setSendresponse(
  //       await deleteItemFromCollection(options.chefs.key, chef._id)
  //     );
  //   }
  // }, [chef]);

  return (
    <div className="ChefMainDiv">
      <div className="CreateChefMainDiv">
        <h2>
          {chef ? createChefText.titleUpdate : createChefText.titleCreate}
        </h2>
        <label htmlFor="name">{createChefText.inputs.name}</label>
        <input
          type="text"
          name="name"
          id="name"
          value={chefName}
          onChange={(event) => {
            setChefName(event.currentTarget.value);
          }}
        ></input>
        <label htmlFor="description">{createChefText.inputs.description}</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          cols={50}
          value={chefDescription}
          onChange={(event) => {
            setChefDescription(event.currentTarget.value);
          }}
        ></textarea>
        <label htmlFor="file-field">{createChefText.inputs.choose_Image}</label>
        <input id="file-field" type="file" onChange={handleFileChange} />
        {sendresponse && <p>{sendresponse}</p>}
        <button
          className="myButton"
          onClick={chef ? updateChefHandler : createChefHandler}
        >
          {chef ? "update" : "create"}
        </button>
      </div>
      {chef?.image && (
        <div className="UserOldImage">
          <div>
            <MyRoundImage url={chef.image} alt={"dish"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChef;
