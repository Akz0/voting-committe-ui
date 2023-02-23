import { createSlice } from "@reduxjs/toolkit";

interface Ilocation {
  loading: boolean;
  locations:
    | {
        name: string;
        _id: string;
        zip: string;
        createdBy: any;
      }[]
    | [];
  error: boolean;
  message: null | string;
}

const initialState: Ilocation = {
  loading: false,
  locations: [
    {
      _id: "63ce289ec41cbeb7fcda1cca",
      name: "location 2",
      zip: "223413",
      createdBy: {
        name: "Om Lachake admin",
      },
    },
    {
      _id: "63ce294607bba2e943cf94cf",
      name: "location 2",
      zip: "223433",
      createdBy: {
        name: "Om Lachake admin",
      },
    },
    {
      _id: "63f46fd7ef790aaa20de6c35",
      name: "location 5",
      zip: "2231333",
      createdBy: {
        name: "Om Lachake admin",
      },
    },
  ],
  error: false,
  message: null,
};

export const LocationSlice = createSlice({
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
    GetLocationsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: false,
        locations: action.payload?.locations,
        message: action.payload?.message,
      };
    },
    GetLocationsError(state, action) {
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.message,
        locations: [],
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

export const LocationReducer = LocationSlice.reducer;
