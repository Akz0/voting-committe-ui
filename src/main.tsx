import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./index.css";
import Error404 from "./pages/404";
import Auth from "./pages/Auth";
import Candidates from "./pages/Candidates";
import Dashboard from "./pages/Dashboard";
import Elections from "./pages/Elections";
import Locations from "./pages/Locations";
import Voters from "./pages/Voters";
import Store from "./store";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "voters",
        element: (
          <ProtectedRoutes>
            <Voters />
          </ProtectedRoutes>
        ),
      },
      {
        path: "locations",
        element: (
          <ProtectedRoutes admin>
            <Locations />
          </ProtectedRoutes>
        ),
      },
      {
        path: "candidates",
        element: (
          <ProtectedRoutes admin>
            <Candidates />
          </ProtectedRoutes>
        ),
      },
      {
        path: "elections",
        element: (
          <ProtectedRoutes admin>
            <Elections />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {},
  {
    path: "/auth",
    element: <Auth />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
