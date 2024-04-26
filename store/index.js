import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer
  },
});

export default store;
