import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isLoggedIn: false, userId: "", username: "" },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      if (action.payload.username) {
        state.username = action.payload.username;
      }

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
