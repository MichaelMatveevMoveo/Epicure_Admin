import React from "react";
import "./SideBar.style.scss";
import MyLink from "../../../data/utils/MyLink.util/MyLink.utils";
import { options } from "../../constants/backEnd.constants";

const SideBar = () => {
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
    </div>
  );
};

export default SideBar;
