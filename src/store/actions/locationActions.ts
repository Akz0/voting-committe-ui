import axiosInstance from "../../apis/axios";
import { LocationSlice } from "./../reducers/locationSlice";
const {
  loading,
  GetLocationsSuccess,
  GetLocationsError,
  UpdateError,
  UpdateSuccess,
  DeleteError,
  DeleteSuccess,
  CreateSuccess,
  CreateError,
} = LocationSlice.actions;

export const GetAllLocations = (callback: any) => async (dispatch: any) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/admin/location/", {});
    const locations = response.data;
    dispatch(GetLocationsSuccess({ locations }));
    callback();
    return;
  } catch (error: any) {
    dispatch(
      GetLocationsError({
        message: error?.response?.data?.message,
      })
    );
  }
};

export const UpdateLocation =
  (details: any, _id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.put(`/admin/location/${_id}`, {
        ...details,
      });
      dispatch(UpdateSuccess({}));
      callback();
      return;
    } catch (error: any) {
      dispatch(
        UpdateError({
          message: error?.response?.data?.message,
        })
      );
    }
  };

export const DeleteLocation =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/admin/location/${_id}`);
      const message = response.data;
      dispatch(DeleteSuccess({ message }));
      callback();
      return;
    } catch (error: any) {
      dispatch(
        DeleteError({
          message: error?.response?.data?.message,
        })
      );
    }
  };

export const CreateNewLocation =
  (details: any, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.post(`/admin/location/create`, {
        ...details,
      });
      dispatch(CreateSuccess({}));
      callback();
      return;
    } catch (error: any) {
      dispatch(
        CreateError({
          message: error?.response?.data?.message,
        })
      );
    }
  };
