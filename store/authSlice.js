import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isLoggedIn: false, userId: ""},
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;

      console.log("state updated, logged in");
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.userId = "";
      console.log("logged out");
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
