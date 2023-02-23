import { CandidateSlice } from "./../reducers/candidateSlice";
import axiosInstance from "../../apis/axios";
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
} = CandidateSlice.actions;

export const GetAllCandidates = (callback: any) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.get(
      "admin/candidate/all-candidates",
      {}
    );
    const candidates = response.data;
    dispatch(GetAllSuccess({ candidates }));
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

export const UpdateCandidate =
  (details: any, _id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.put(`/admin/candidate/${_id}`, {
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

export const DeleteCandidate =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/admin/candidate/${_id}`);
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

export const DeactivateCandidate =
  (_id: string, callback: any) => async (dispatch: any) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(
        `/admin/candidate/deactivate/${_id}`
      );
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

export const CreateNewCandidate =
  (details: any, callback: any) => async (dispatch: any) => {
    dispatch(loading);
    try {
      const response = await axiosInstance.post(`/admin/candidate`, {
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
