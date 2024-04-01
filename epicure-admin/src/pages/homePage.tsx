import { appRoutes } from "../shared/constants/route.constants";
import "./homePage.style.scss";

export const HomePage = () => {
  return (
    <div className="divMainHomePage">
      <h1>Welcome To Epicure Admin App</h1>
      <h2>from this app you will be able to manage the epicure database</h2>
      <p
        className="LinkText"
        onClick={() => {
          window.location.href = appRoutes.login;
        }}
      >
        click here to login
      </p>
    </div>
  );
};
