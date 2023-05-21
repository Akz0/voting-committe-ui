import { ElectionSlice } from "./../reducers/electionSlice";
import axiosInstance from "../../apis/axios";
const {
  loading,
  GetAllSuccess,
  GetAllError,
  UpdateError,
  UpdateSuccess,
  DeactivateError,
  DeactivateSuccess,
  CreateSuccess,
  CreateError,
} = ElectionSlice.actions;

export const GetAllElections = (callback: any) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.get(
      "admin/election/all-elections",
      {}
    );
    const elections = response.data;
    dispatch(GetAllSuccess({ elections }));
    callback();
    return;
  } catch (error: any) {
    dispatch(
      GetAllError({
        message: error?.response?.data?.message,
      })
    );
  }
};

export const GetActiveElections = (callback: any) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.get(
      "admin/election/active-elections",
      {}
    );
    const elections = response.data;
    dispatch(GetAllSuccess({ elections }));
    callback();
    return;
  } catch (error: any) {
    dispatch(
      GetAllError({
        message: error?.response?.data?.message,
      })
    );
  }
};

export const UpdateElection =
  (details: any, _id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.put(`/admin/election/${_id}`, {
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

export const DeactivateElection =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/admin/election/${_id}`);
      const message = response.data;
      dispatch(DeactivateSuccess({ message }));
      callback();
      return;
    } catch (error: any) {
      dispatch(
        DeactivateError({
          message: error?.response?.data?.message,
        })
      );
    }
  };

export const CreateNewElection =
  (details: any, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.post(`/admin/election/create`, {
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
