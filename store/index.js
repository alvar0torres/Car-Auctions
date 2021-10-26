import { configureStore } from "@reduxjs/toolkit";
import auctionsSlice from "./auctionsSlice";

const store = configureStore({ reducer: { auctions: auctionsSlice.reducer } });

export default store;
