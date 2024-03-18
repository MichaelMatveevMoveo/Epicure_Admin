import "./App.scss";
import SideBar from "./shared/components/SideBar.component/SideBar.components";
import { sideBar } from "./resources/sideBar.resources";
function App() {
  return (
    <div className="AppMainDiv">
      <div className="AppSideBarDiv">
        <h1>{sideBar.title}</h1>
        <SideBar optionList={sideBar.options} />
      </div>
      <div className="AppMaincontantBarDiv"></div>
    </div>
  );
}

export default App;
