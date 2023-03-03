import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const token = JSON.parse(localStorage.getItem("token"));
const decodedToken = token ? jwt_decode(token) : false;

const initialState = {
  user: decodedToken || false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }

      state.user = jwt_decode(action.payload);
    },
  },
});

export const { login } = auth.actions;
export default auth.reducer;
