import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../store/actions/userActions";

const TopBar = () => {
  const { name, token, isLoggedIn } = useSelector((state: any) => state?.auth);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(
      Logout(token, () => {
        navigate("/auth");
      })
    );
  };

  return (
    <div className="navbar bg-base-100  shadow-md ">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/dashboard">
          EVoting Committee
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-outline btn-primary ">
            <div className="rounded-full">{name.split(" ")[0]}</div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border "
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
