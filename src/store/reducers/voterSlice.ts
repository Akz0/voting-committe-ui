import { createSlice } from "@reduxjs/toolkit";

export interface IVoter {
  _id: string;
  name: string;
  locationId: {
    _id: string;
    name: string;
  };
  elections: {
    electionId: {
      _id: string;
      name: string;
    };
    status: "incomplete" | "completed" | "missed";
  }[];
  status: string;
  walletId: string | null;
  isVerified: boolean;
  loginId: string;
}

interface IVoterState {
  loading: boolean;
  voters: IVoter[];
  error: boolean;
  message: null | string;
}

const initialState: IVoterState = {
  loading: false,
  voters: [],
  error: false,
  message: null,
};

export const VoterSlice = createSlice({
  name: "voter",
  initialState: initialState,
  reducers: {
    loading(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    GetAllSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        voters: action.payload?.voters,
        message: action.payload?.message,
      };
    },
    GetAllError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        voters: [],
      };
    },
    UpdateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    },
    UpdateError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
      };
    },
    DeleteSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    },
    DeleteError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
      };
    },

    CreateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    },
    CreateError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
      };
    },
  },
});

export const VoterReducer = VoterSlice.reducer;
