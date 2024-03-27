import "./App.scss";
import SideBar from "./shared/components/SideBar.component/SideBar.components";
import { sideBar } from "./resources/sideBar.resources";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main.page";
import { LoginPage } from "./pages/login.page";
import { HomePage } from "./pages/homePage";

function App() {
  return (
    <div className="AppMainDiv">
      <div className="AppSideBarDiv container">
        <h1>{sideBar.title}</h1>
        <SideBar />
      </div>
      <div className="AppMaincontantBarDiv container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
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
