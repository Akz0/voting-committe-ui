import axiosInstance from "../../apis/axios";
import { AuthSlice } from "../reducers/authSlice";

export const {
  loading,
  signUpSuccess,
  signUpError,
  loginSuccess,
  loginError,
  logout,
} = AuthSlice.actions;

export const Login =
  (email: string, password: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post("/login", { email, password });
      const { token, name, role } = response.data;
      console.log(name, role);
      localStorage.setItem("token", token);
      dispatch(
        loginSuccess({
          name: name,
          token: token,
          role: role,
        })
      );
      callback();
      return;
    } catch (error: any) {
      dispatch(
        loginError({
          message: error?.response?.data?.message,
        })
      );
    }
  };

export const Logout =
  (token: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    const response = await axiosInstance.post("/logout");
    dispatch(logout({}));
    callback();
  };
