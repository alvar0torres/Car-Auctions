import { createSlice } from "@reduxjs/toolkit";

const auctionsSlice = createSlice({
  name: "auctions",
  initialState: { auctionList: [] },
  reducers: {
    toggleList(state, action) {
      state.auctionList = action.payload;
    },
    addAuction(state, action) {
      const newAuction = action.payload;
      state.auctionList.push(newAuction);
    },
    bid(state, action) {
      const existingAuction = state.auctionList.find(
        (auction) => auction.auctionId === action.payload.auctionId
      );

      existingAuction.price = action.payload.bid;
      existingAuction.lastBidder = action.payload.username;
      
    },
  },
});

export default auctionsSlice;

export const auctionsActions = auctionsSlice.actions;
