import React, { useCallback, useState } from "react";
import { makeChefOfWeek } from "../../../services/axios/chef.axios";
import { useAppDispatch } from "../../hooks/hooks";
import { setChefOfWeek } from "../../../redux-toolkit/slices/collection.slice";

const IsChefOFWeekColumn: React.FC<{ chefId: string }> = ({ chefId }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const dispatch = useAppDispatch();
  const handelChange = useCallback(async () => {
    if (await makeChefOfWeek(chefId)) {
      dispatch(setChefOfWeek(chefId));
    }
  }, [chefId, dispatch]);
  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="LinkText"
      onClick={handelChange}
    >
      {isMouseOver ? "change" : "no"}
    </div>
  );
};

export default IsChefOFWeekColumn;
