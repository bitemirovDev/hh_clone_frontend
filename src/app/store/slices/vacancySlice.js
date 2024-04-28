import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
    cities: [],
    experiences: [],
    skills: [],
    employmentTypes: [],
  },
  reducers: {
    setVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies;
    },
    setVacancy: (state, action) => {
      state.vacancy = action.payload.vacancy;
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies = vacancies.filter((item) => item.id !== action.payload);
      state.vacancies = vacancies;
    },
    setSpecializaions: (state, action) => {
      state.specializations = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setExperiences: (state, action) => {
      state.experiences = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setEmploymentTypes: (state, action) => {
      state.employmentTypes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setVacancies,
  setVacancy,
  handleDeletedVacancy,
  setSpecializaions,
  setCities,
  setExperiences,
  setSkills,
  setEmploymentTypes,
  handleDeleteVacancy,
} = vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy`);
    dispatch(setVacancies({ vacancies: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getSpecializations = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/specializations`);
    dispatch(setSpecializaions(res.data));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/region/cities`);
    dispatch(setCities(res.data));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getExperiences = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/experiences`);
    dispatch(setExperiences(res.data));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getSkills = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/skills`);
    dispatch(setSkills(res.data));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getEmploymentTypes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/employment-types`);
    dispatch(setEmploymentTypes(res.data));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const createVacancy = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/vacancy`, sendData);
    router.push("/vacancy");
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const deleteVacancy = (id) => async (dispatch) => {
  try {
    const confirmed = window.confirm(
      "Вы уверены, что хотите выполнить это действие?"
    );

    if (confirmed) {
      const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`);
      dispatch(handleDeleteVacancy(id));
    }
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getVacancyById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
    dispatch(setVacancy({ vacancy: res.data }));
  } catch (error) {
    console.log("Что то пошло не так", error);
  }
};

export const getSearchedVacancies = (params, router) => async (dispatch) => {
  try {
    const {
      q,
      specialization_id,
      city_id,
      salary,
      salary_type,
      experience_id,
      employmentType_id,
    } = params;

    let queryString = "?";

    if (queryString) queryString += `q=${q}&`;
    if (specialization_id)
      queryString += `specialization_id=${specialization_id}&`;
    if (city_id) queryString += `city_id=${city_id}&`;
    if (employmentType_id)
      queryString += `employmentType_id=${employmentType_id}&`;
    if (salary) queryString += `salary=${salary}&`;
    if (salary_type) queryString += `salary_type=${salary_type}&`;
    if (experience_id) queryString += `experience_id=${experience_id}&`;

    router.push(`/search/vacancy${queryString}`);

    const res = await axios.get(
      `${END_POINT}/api/vacancy/search${queryString}`
    );

    dispatch(setVacancies({ vacancies: res.data }));
  } catch (error) {
    dispatch(setVacancies({ vacancies: [] }));
    console.log("Что то пошло не так", error);
  }
};

export default vacancySlice.reducer;
