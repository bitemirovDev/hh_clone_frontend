import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

export const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    resume: {},
  },
  reducers: {
    setMyResumes: (state, action) => {
      state.resumes = action.payload.resumes;
    },
    uppendResume: (state, action) => {
      state.resumes.push(...state.resumes, action.payload.newResume);
    },
    setResume: (state, action) => {
      state.resume = action.payload.resume;
    },
    handleDeletedResume: (state, action) => {
      let resumes = [...state.resumes];
      resumes = resumes.filter((item) => item.id !== action.payload);
      state.resumes = resumes;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMyResumes, uppendResume, setResume, handleDeletedResume } =
  resumeSlice.actions;

export const getMyResumes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume`);
    dispatch(setMyResumes({ resumes: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const createMyResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/resume/create`, sendData);
    router.push("/resumes");
    dispatch(uppendResume({ newResume: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const editMyResume = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.put(`${END_POINT}/api/resume`, sendData);
    router.push("/resumes");
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const deleteMyResume = (id) => async (dispatch) => {
  try {
    const confirmed = window.confirm(
      "Вы уверены, что хотите выполнить это действие?"
    );

    if (confirmed) {
      const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
      dispatch(handleDeletedResume(id));
    }
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getResumeById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/resume/${id}`);
    dispatch(setResume({ resume: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export default resumeSlice.reducer;
