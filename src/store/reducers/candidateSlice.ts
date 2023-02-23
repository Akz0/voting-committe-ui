import { createSlice } from "@reduxjs/toolkit";

export interface ICandidate {
  _id: string;
  name: string;
  locationId: {
    _id: string;
    name: string;
  };
  electionId: {
    _id: string;
    name: string;
  };
  active: boolean;
  walletId: string | null;
  loginId: string;
}

interface ICandidateState {
  loading: boolean;
  candidates: ICandidate[];
  error: boolean;
  message: null | string;
}

const initialState: ICandidateState = {
  loading: false,
  candidates: [],
  error: false,
  message: null,
};

export const CandidateSlice = createSlice({
  name: "candidate",
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
        candidates: action.payload?.candidates,
        message: action.payload?.message,
      };
    },
    GetAllError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        candidates: [],
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

export const CandidateReducer = CandidateSlice.reducer;
