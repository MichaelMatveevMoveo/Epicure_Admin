import MyLink from "../../../data/utils/MyLink.util/MyLink.utils";
import { options } from "../../constants/backEnd.constants";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../../redux-toolkit/store/store";
import LogOutButton from "../LogOutButton.component/LogOutButton.components";
import "./SideBar.Style.scss";

const SideBar = () => {
  const isLogin = useAppSelector((state: RootState) => state.cookies.isLogin);
  return (
    <div className="SideBarMainDiv">
      <ul>
        {Object.values(options).map((value) => {
          return (
            <li key={value.key}>
              <MyLink to={`/main/${value.key}`}>{value.value}</MyLink>
            </li>
          );
        })}
      </ul>
      <div className="sideBarButtonLog">
        {!isLogin && (
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            login
          </button>
        )}
        {isLogin && <LogOutButton />}
      </div>
    </div>
  );
};

export default SideBar;
