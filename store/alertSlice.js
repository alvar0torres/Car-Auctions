import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { showAlert: false, type: "", message: "" },
  reducers: {
    error(state, action) {
      state.showAlert = true;
      state.type = "error";
      state.message = action.payload;
    },
    success(state, action) {
      state.showAlert = true;
      state.type = "success";
      state.message = action.payload;
    },
    close(state) {
      state.showAlert = false;
      state.type = "";
      state.message = "";
    },
  },
});

export default alertSlice;

export const alertActions = alertSlice.actions;
