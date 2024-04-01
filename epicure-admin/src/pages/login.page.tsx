import { useCallback, useState } from "react";
import { login } from "../services/axios/user.axios";

import "./loginPage.style.scss";
import { mainLoginText } from "../resources/loginPage.resources";
import { useAppDispatch, useAppSelector } from "../shared/hooks/hooks";
import { setIsLogin } from "../redux-toolkit/slices/loginStatus.slice";
import { RootState } from "../redux-toolkit/store/store";
import LogOutButton from "../shared/components/LogOutButton.component/LogOutButton.components";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [massage, setMassage] = useState(false);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: RootState) => state.cookies.isLogin);

  const handelClickLogIn = useCallback(async () => {
    if (await login(username, password)) {
      dispatch(setIsLogin(true));
    } else {
      setMassage(true);
    }
  }, [dispatch, password, username]);

  if (isLogin) {
    return (
      <div className="divMain">
        <h1>welcome!!!</h1>
        <p>now you can edit the databases.</p>
        <LogOutButton />
      </div>
    );
  }
  return (
    <div className="divMain">
      <h1>{mainLoginText.title}</h1>
      <p className="pInfoLogin">{mainLoginText.info}</p>
      <div className="divLoginInputs">
        <label htmlFor="username">{mainLoginText.username}</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        ></input>
        <label htmlFor="password">{mainLoginText.password}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        ></input>
      </div>
      {massage && (
        <p className="pAlertLogin">
          {mainLoginText.alertBadUserNameAndPassword}
        </p>
      )}
      <button onClick={handelClickLogIn}>{mainLoginText.loginButton}</button>
    </div>
  );
};
