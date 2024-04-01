import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import auctionsSlice from "./auctionsSlice";
import favouriteSlice from "./favouriteSlice";

const store = configureStore({
  reducer: {
    auctions: auctionsSlice.reducer,
    alert: alertSlice.reducer,
    favourites: favouriteSlice.reducer,
  },
});

export default store;
