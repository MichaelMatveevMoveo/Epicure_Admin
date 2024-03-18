import React from "react";
import "./SideBar.Style.scss";

interface SideBarProps {
  optionList: string[];
}
const SideBar: React.FC<SideBarProps> = ({ optionList }) => {
  return (
    <div className="SideBarMainDiv">
      <ul>
        {optionList.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
    </div>
  );
};

export default SideBar;
