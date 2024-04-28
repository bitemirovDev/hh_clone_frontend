import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";

export const applySlice = createSlice({
  name: "apply",
  initialState: {
    applies: [],
    apply: {},
  },
  reducers: {
    appendApply: (state, action) => {
      state.applies = [...state.applies, action.payload];
    },
    setApplies: (state, action) => {
      state.applies = action.payload;
    },
    handleDeletedApply: (state, action) => {
      let applies = [...state.applies];
      applies = applies.filter((item) => item.id !== action.payload);
      state.applies = applies;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appendApply, setApplies, handleDeletedApply } =
  applySlice.actions;

export const createApply = (data) => (dispatch) => {
  axios
    .post(`${END_POINT}/api/apply`, data)
    .then((res) => {
      dispatch(appendApply(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getEmployeeAplies = (data) => (dispatch) => {
  axios
    .get(`${END_POINT}/api/apply/employee`, data)
    .then((res) => {
      dispatch(setApplies(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteApply = (id) => (dispatch) => {
  try {
    const confirmed = window.confirm(
      "Вы уверены, что хотите выполнить это действие?"
    );

    if (confirmed) {
      axios.delete(`${END_POINT}/api/apply/${id}`);
      dispatch(handleDeletedApply(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export default applySlice.reducer;
