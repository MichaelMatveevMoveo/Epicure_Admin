import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { RootState } from "../../../redux-toolkit/store/store";
import { useAppSelector } from "../../hooks/hooks";
import { changeIsPopularRestaurant } from "../../../services/axios/restaurants.axios";

interface IsPopularSwitchProps {
  restaurantId: string;
  isPopular: boolean;
}

const IsPopularSwitch: React.FC<IsPopularSwitchProps> = ({
  restaurantId,
  isPopular,
}) => {
  const [isChecked, setIsChecked] = useState(isPopular);
  const isLogin = useAppSelector((state: RootState) => state.cookies.isLogin);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked;
    if (!(await changeIsPopularRestaurant(restaurantId))) {
      return;
    }
    setIsChecked(status);
  };

  return (
    <Switch checked={isChecked} onChange={handleChange} disabled={!isLogin} />
  );
};

export default IsPopularSwitch;
