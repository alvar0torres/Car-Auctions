import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isLoggedIn: false, userId: "", username: "" },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;

      console.log("state updated, logged in");
    },
    updateUsername(state, action) {
      state.username = action.payload;
    },
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.userId = "";
      state.username = "";

      console.log("logged out");
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
