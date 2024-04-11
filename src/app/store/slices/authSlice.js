import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from "@/config/end-point";
import { jwtDecode } from "jwt-decode";

let initialState = {
  isAuth: false,
  currentUser: null,
  tokenExp: 0,
  error: null,
};

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");

  if (token) {
    let decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 > Date.now()) {
      initialState = {
        isAuth: true,
        currentUser: {
          id: decodedToken.id,
          email: decodedToken.email,
          full_name: decodedToken.full_name,
          phone: decodedToken.phone,
          role: decodedToken.role,
        },
        tokenExp: decodedToken.exp,
      };

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      const decoded = jwtDecode(action.payload.token);
      state.currentUser = {
        id: decoded.id,
        email: decoded.email,
        full_name: decoded.full_name,
        phone: decoded.phone,
        role: decoded.role,
      };
      state.isAuth = true;
      state.tokenExp = decoded.exp;
    },
    logout: (state) => {
      state.isAuth = false;
      state.currentUser = null;
      state.exp = 0;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const sendVerificationEmail = (email) => (dispatch) => {
  axios.post(`${END_POINT}/api/auth/sendmail`, {
    email,
  });
};

export const verifyCode = (email, code) => (dispatch) => {
  axios
    .post(`${END_POINT}/api/auth/verifycode`, {
      email,
      code,
    })
    .then((res) => {
      dispatch(authorize(res.data));
    });
};

export const signUpEmployer = (data, router) => (dispatch) => {
  const fd = new FormData();
  fd.append("full_name", data.full_name);
  fd.append("email", data.email);
  fd.append("password", data.password);
  fd.append("password2", data.password2);
  fd.append("company_name", data.company_name);
  fd.append("company_description", data.company_description);
  fd.append("company_address", data.company_address);
  fd.append("company_logo", data.company_logo);

  axios
    .post(`${END_POINT}/api/auth/signUp`, fd)
    .then((res) => {
      router.push("/employer/signin");
    })
    .catch((e) => {
      dispatch(setError(e.response.data));
    });
};

// Action creators are generated for each case reducer function
export const { authorize, logout, setError } = authSlice.actions;

export default authSlice.reducer;
