import { Select } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const Sidebar = () => {
  const { role } = useSelector((state: any) => state?.auth);
  const dispatch: any = useDispatch();

  const renderModeratorNav = () => {
    return (
      <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
        to={"/voters"}
      >
        Voters
      </NavLink>
    );
  };

  const renderAdminNav = () => {
    return (
      <>
        {renderModeratorNav()}
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/locations"
        >
          Locations
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/elections"
        >
          Elections
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          to="/candidates"
        >
          Candidates
        </NavLink>
      </>
    );
  };
  return (
    <div className="border-r border-r-primary flex flex-col w-[15%] items-center">
      {/* <NavLink
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
        to={"/dashboard"}
      >
        Home
      </NavLink> */}
      {role === "admin" && renderAdminNav()}
      {role === "moderator" && renderModeratorNav()}
      <div className="w-full flex justify-center items-center">
        <Select className="nav-link outline-1" data-choose-theme>
          {themes.map((theme: string) => (
            <option key={theme} value={theme} className="capitalize">
              {theme}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Sidebar;
