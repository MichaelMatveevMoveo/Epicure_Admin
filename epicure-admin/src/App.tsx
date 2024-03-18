import "./App.scss";
import SideBar from "./shared/components/SideBar.component/SideBar.components";
import { sideBar } from "./resources/sideBar.resources";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main.page";
import { HomePage } from "./pages/home.page";

function App() {
  return (
    <div className="AppMainDiv">
      <div className="AppSideBarDiv">
        <h1>{sideBar.title}</h1>
        <SideBar optionList={sideBar.options} />
      </div>
      <div className="AppMaincontantBarDiv">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/main/:collectionName" element={<MainPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

// example to use hooks

// import { useAppDispatch, useAppSelector } from "./shared/hooks/hooks";
// import {
//   incremented,
//   unmountAdded,
// } from "./redux-toolkit/slices/counter-slice";
// const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   const handleclick = () => {
//     dispatch(incremented());
//   };
//   const handleclick2 = () => {
//     dispatch(unmountAdded(3));
//   };
