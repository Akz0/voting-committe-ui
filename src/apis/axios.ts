import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Logout } from "../store/actions/userActions";
import Store from "../store";

export const api = "http://localhost:3300/api";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((request) => {
  const { auth } = Store.getState();
  if (auth.token && auth.IsLoggedIn) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    const { auth } = Store.getState();
    const status = error.response.status;
    if (status && status === 500) {
      Store.dispatch(Logout(auth.token || "", () => {}));
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
