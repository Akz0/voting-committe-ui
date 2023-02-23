import { useEffect } from "react";
import { Theme } from "react-daisyui";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { themeChange } from "theme-change";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div>
        <TopBar />
      </div>
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="w-[85%] h-full overflow-hidden bg-base p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
