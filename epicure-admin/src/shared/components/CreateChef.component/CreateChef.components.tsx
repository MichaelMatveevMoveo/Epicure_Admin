import { ChefType } from "../../../data/types/backEndData.types";
import { createChefText } from "../../../resources/createChef.resources";
import { addChef, changeChef } from "../../../services/axios/chef.axios";
import { deleteItemFromCollection } from "../../../services/axios/general.axios";
import { uploadImage } from "../../../services/cloudinary.services";
import { CLOUD_NAME, options } from "../../constants/backEnd.constants";
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
      setSendresponse(await addChef(chefName, chefDescription, newImageData));
    }
  }, [fileUpload, chefName, chefDescription]);

  const updateChefHandler = useCallback(async () => {
    let newImageData = null;
    if (fileUpload) {
      newImageData = await uploadImage(fileUpload);
    }
    if (chef) {
      if (newImageData) {
        setSendresponse(
          await changeChef(
            chef?._id,
            chefName,
            chefDescription,
            undefined,
            newImageData
          )
        );
      } else {
        setSendresponse(
          await changeChef(chef?._id, chefName, chefDescription, chef?.image)
        );
      }
    }
  }, [fileUpload, chef, chefName, chefDescription]);

  const deleteChefHandler = useCallback(async () => {
    if (chef) {
      setSendresponse(
        await deleteItemFromCollection(options.chefs.key, chef._id)
      );
    }
  }, [chef]);

  return (
    <div className="CreateChefMainDiv">
      <h2>{chef ? createChefText.titleUpdate : createChefText.titleCreate}</h2>
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
      {chef?.image && (
        <div>
          <p>{createChefText.inputs.oldImage_Image}</p>
          <div className="CreateUserOldImage">
            <MyRoundImage
              url={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${chef.image}.jpg`}
              alt={"dish"}
            />
          </div>
        </div>
      )}
      <label htmlFor="file-field">{createChefText.inputs.choose_Image}</label>
      <input id="file-field" type="file" onChange={handleFileChange} />
      {sendresponse && <p>{sendresponse}</p>}
      <button onClick={chef ? updateChefHandler : createChefHandler}>
        {chef ? "update" : "create"}
      </button>
      {chef && <button onClick={deleteChefHandler}>delete</button>}
    </div>
  );
};

export default CreateChef;
