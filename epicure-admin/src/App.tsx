import "./App.scss";
import SideBar from "./shared/components/SideBar.component/SideBar.components";
import { sideBar } from "./resources/sideBar.resources";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main.page";
import { LoginPage } from "./pages/login.page";
import { HomePage } from "./pages/homePage";
import { appRoutes } from "./shared/constants/route.constants";
import { useEffect, useState } from "react";
import { screenConst } from "./shared/constants/screen.constants";

function App() {
  const [isBigScreen, setIsBigScreen] = useState(false);

  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX !== null && currentX !== null) {
      const difference = currentX - startX;
      if (difference > 50) {
        setMenuOpen(true); // Open the menu if the swipe is from left to right
      } else {
        setMenuOpen(false); // Close the menu if the swipe is from right to left
      }
    }
  };

  const updateScreenSize = () => {
    setIsBigScreen(window.innerWidth >= screenConst.bigSize);
  };

  useEffect(() => {
    // Initial call to set initial state
    updateScreenSize();

    // Event listener to update state when screen size changes
    window.addEventListener("resize", updateScreenSize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);
  return (
    <div className="AppMainDiv">
      {(isBigScreen || menuOpen) && (
        <div className="AppSideBarDiv container">
          <h1>{sideBar.title}</h1>
          <SideBar />
        </div>
      )}
      <div
        className="AppMaincontantBarDiv container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Routes>
          <Route path={appRoutes.homePage} element={<HomePage />}></Route>
          <Route path={appRoutes.login} element={<LoginPage />}></Route>
          <Route
            path={`${appRoutes.databases}/:collectionName`}
            element={<MainPage />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
