import React from "react";
import "./SideBar.Style.scss";
import MyLink from "../../../data/utils/MyLink.util/MyLink.utils";

interface SideBarProps {
  optionList: string[];
}
const SideBar: React.FC<SideBarProps> = ({ optionList }) => {
  return (
    <div className="SideBarMainDiv">
      <ul>
        {optionList.map((value, index) => {
          return (
            <li key={index}>
              <MyLink to={`/main/${value}`}>{value}</MyLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
