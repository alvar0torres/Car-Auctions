import { configureStore } from "@reduxjs/toolkit";
import auctionsSlice from "./auctionsSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: { auctions: auctionsSlice.reducer, auth: authSlice.reducer },
});

export default store;
