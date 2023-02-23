import { createSlice } from "@reduxjs/toolkit";

interface auth {
  token: null | string;
  loading: boolean;
  name: null | string;
  role: "admin" | "moderator" | null;
  error: boolean;
  message: null | string;
  IsLoggedIn: boolean;
}

const initialState: auth = {
  token: null,
  loading: false,
  name: null,
  role: null,
  error: false,
  message: null,
  IsLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loading(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    loginSuccess(state, action) {
      console.log(action);
      return {
        ...state,
        loading: false,
        error: false,
        token: action.payload?.token,
        name: action.payload?.name,
        role: action.payload?.role,
        message: action.payload?.message,
        IsLoggedIn: true,
      };
    },
    loginError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        token: null,
        name: null,
        role: null,
        IsLoggedIn: false,
      };
    },
    signUpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        token: action.payload?.token,
        name: action.payload?.name,
        role: action.payload?.role,
        message: action.payload?.message,
        IsLoggedIn: true,
      };
    },
    signUpError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        token: null,
        name: null,
        role: null,
        IsLoggedIn: false,
      };
    },
    logout(state, action) {
      return {
        ...initialState,
      };
    },
  },
});

export const AuthReducer = AuthSlice.reducer;
