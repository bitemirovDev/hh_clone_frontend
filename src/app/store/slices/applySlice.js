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
    setApplyStatus: (state, action) => {
      let applies = [...state.applies];
      applies = applies.filter((item) => {
        if (item.id === action.payload.apply_id) {
          item.status = action.payload.status;
        }
        return item;
      });
      state.applies = applies;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appendApply, setApplies, handleDeletedApply, setApplyStatus } =
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

export const getAppliesByVacancy = (id) => (dispatch) => {
  axios
    .get(`${END_POINT}/api/apply/vacancy/${id}`)
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

export const acceptApply = (apply_id) => (dispatch) => {
  axios
    .put(`${END_POINT}/api/apply/accept/employee`, { apply_id })
    .then((res) => {
      dispatch(setApplyStatus({ apply_id, status: "INVITATION" }));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const declineApply = (apply_id) => (dispatch) => {
  axios
    .put(`${END_POINT}/api/apply/accept/employee`, { apply_id })
    .then((res) => {
      dispatch(setApplyStatus({ apply_id, status: "DECLINED" }));
    })
    .catch((e) => {
      console.log(e);
    });
};

export default applySlice.reducer;
