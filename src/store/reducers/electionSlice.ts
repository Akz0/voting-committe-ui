import { createSlice } from "@reduxjs/toolkit";

export interface IElection {
  name: string;
  locations:
    | {
        locationId: {
          _id: string;
          name: string;
        };
        pollingStart: Date | null;
        pollingEnd: Date | null;
      }[]
    | [];
  active: boolean;
  status: "completed" | "cancelled" | "active" | "scheduled";
  imageURL: string | null;
  _id: string;
}

export interface IElectionState {
  loading: boolean;
  elections: IElection[];
  error: boolean;
  message: null | string;
}

const initialState: IElectionState = {
  loading: false,
  elections: [
    {
      _id: "63ce2a47277e74dc7a0286ad",
      name: "Election 1",
      locations: [
        {
          locationId: {
            _id: "",
            name: "",
          },
          pollingStart: null,
          pollingEnd: null,
        },
      ],
      active: false,
      status: "cancelled",
      imageURL: "",
    },
    {
      _id: "63f493e92406a999a4985393",
      name: "Election 2",
      locations: [
        {
          locationId: {
            _id: "63f491ae2406a999a4985368",
            name: "Pimple Saudagar",
          },
          pollingStart: null,
          pollingEnd: null,
        },
        {
          locationId: {
            _id: "63f491992406a999a4985364",
            name: "Ravet, Pune",
          },
          pollingStart: null,
          pollingEnd: null,
        },
      ],
      active: true,
      status: "scheduled",
      imageURL: "",
    },
  ],
  error: false,
  message: null,
};

export const ElectionSlice = createSlice({
  name: "location",
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
        elections: action.payload?.elections,
        message: action.payload?.message,
      };
    },
    GetAllError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        elections: [],
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
    DeactivateSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    },
    DeactivateError(state, action) {
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

export const ElectionReducer = ElectionSlice.reducer;
