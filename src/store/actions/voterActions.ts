import axiosInstance from "../../apis/axios";
import { VoterSlice } from "../reducers/voterSlice";
const {
  loading,
  GetAllSuccess,
  GetAllError,
  UpdateError,
  UpdateSuccess,
  DeleteError,
  DeleteSuccess,
  CreateSuccess,
  CreateError,
} = VoterSlice.actions;

export const GetAllVoters = (callback: any) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.get("/moderator/voter/all-voters", {});
    const voters = response.data;
    dispatch(GetAllSuccess({ voters }));
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

export const UpdateVoter =
  (details: any, _id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.put(`/moderator/voter/${_id}`, {
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

export const DeleteVoter =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/moderator/voter/${_id}`);
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

export const VerifyVoter =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        `/moderator/voter/verify-voter/${_id}`
      );
      const message = response.data;
      dispatch(UpdateSuccess({ message }));
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

export const CreateNewVoter =
  (details: any, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.post(`/moderator/voter`, {
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
