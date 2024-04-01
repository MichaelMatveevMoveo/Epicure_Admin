import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/hooks";

import { setIsLogin } from "../../../redux-toolkit/slices/loginStatus.slice";
import { removeTokenFromCookies } from "../../../data/utils/MyLink.util/cookies";

const LogOutButton = () => {
  const dispatch = useAppDispatch();

  const handelClickLogOut = useCallback(() => {
    removeTokenFromCookies();
    dispatch(setIsLogin(false));
  }, [dispatch]);
  return (
    <div>
      <p className="LinkText" onClick={handelClickLogOut}>
        logout
      </p>
    </div>
  );
};

export default LogOutButton;
