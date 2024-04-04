import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { RootState } from "../../../redux-toolkit/store/store";
import { useAppSelector } from "../../hooks/hooks";
import { changeIsActiveRestaurant } from "../../../services/axios/general.axios";

interface IsActiveSwitchProps {
  collectionName: string;
  id: string;
  isActive: boolean;
}

const IsActiveSwitch: React.FC<IsActiveSwitchProps> = ({
  collectionName,
  id,
  isActive,
}) => {
  const [isChecked, setIsChecked] = useState(isActive);
  const isLogin = useAppSelector((state: RootState) => state.cookies.isLogin);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked;
    if (!(await changeIsActiveRestaurant(collectionName, id))) {
      return;
    }
    setIsChecked(status);
  };

  return (
    <Switch checked={isChecked} onChange={handleChange} disabled={!isLogin} />
  );
};

export default IsActiveSwitch;
