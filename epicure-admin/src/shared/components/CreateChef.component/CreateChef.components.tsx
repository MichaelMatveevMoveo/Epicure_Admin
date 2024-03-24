import { createChefText } from "../../../resources/createChef.resources";
import { addChef } from "../../../services/axios/general.axios";
import { uploadImage } from "../../../services/cloudinary.services";
import "./CreateChef.style.scss";
import { useCallback, useState } from "react";

const CreateChef = () => {
  const [chefName, setChefName] = useState<string>("");
  const [chefDescription, setChefDescription] = useState<string>("");
  const [sendresponse, setSendresponse] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected file:", file);
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
  }, [fileUpload, uploadImage, addChef, chefName, chefDescription]);

  return (
    <div className="CreateChefMainDiv">
      <h2>{createChefText.title}</h2>
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
      <button onClick={createChefHandler}>create</button>
    </div>
  );
};

export default CreateChef;
