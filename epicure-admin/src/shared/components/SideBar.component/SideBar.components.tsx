import React from "react";
import "./SideBar.style.scss";
import MyLink from "../../../data/utils/MyLink.util/MyLink.utils";

interface SideBarProps {
  optionList: string[];
}
const SideBar: React.FC<SideBarProps> = ({ optionList }) => {
  return (
    <div className="SideBarMainDiv">
      <ul>
        {optionList.map((value) => {
          return (
            <li key={value}>
              <MyLink to={`/main/${value}`}>{value}</MyLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
