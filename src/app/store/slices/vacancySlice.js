import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies;
    },
    uppendVacancy: (state, action) => {
      state.vacancies.push(...state.vacancies, action.payload.newVacancy);
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy;
    },
    handleDeletedVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies = vacancies.filter((item) => item.id !== action.payload);
      state.vacancies = vacancies;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMyVacancies,
  uppendVacancy,
  setVacancy,
  handleDeletedVacancy,
} = vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy`);
    dispatch(setMyVacancies({ vacancies: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

// export const createMyResume = (sendData, router) => async (dispatch) => {
//   try {
//     const res = await axios.post(`${END_POINT}/api/resume/create`, sendData);
//     router.push("/resumes");
//     dispatch(uppendResume({ newResume: res.data }));
//   } catch (error) {
//     console.log("Что то пошло не так", error);
//   }
// };

// export const editMyResume = (sendData, router) => async (dispatch) => {
//   try {
//     const res = await axios.put(`${END_POINT}/api/resume`, sendData);
//     router.push("/resumes");
//   } catch (error) {
//     console.log("Что то пошло не так", error);
//   }
// };

// export const deleteMyResume = (id) => async (dispatch) => {
//   try {
//     const confirmed = window.confirm(
//       "Вы уверены, что хотите выполнить это действие?"
//     );

//     if (confirmed) {
//       const res = await axios.delete(`${END_POINT}/api/resume/${id}`);
//       dispatch(handleDeletedResume(id));
//     }
//   } catch (error) {
//     console.log("Что то пошло не так", error);
//   }
// };

// export const getResumeById = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`${END_POINT}/api/resume/${id}`);
//     dispatch(setResume({ resume: res.data }));
//   } catch (error) {
//     console.log("Что то пошло не так", error);
//   }
// };

export default vacancySlice.reducer;
