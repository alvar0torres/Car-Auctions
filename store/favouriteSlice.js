import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: { favouritesList: [] },
  reducers: {
    addOrRemoveFav(state, action) {
      let existingFavourite = null;

      if (state.favouritesList.length > 0) {
        existingFavourite = state.favouritesList.findIndex(
          (favourite) =>
            favourite.userId === action.payload.userId &&
            favourite.auctionId === action.payload.auctionId
        );
      }

      if (existingFavourite != null && existingFavourite >= 0) {
        state.favouritesList.splice(existingFavourite, 1);
        console.log("Removed from favourites");
      } else {
        state.favouritesList.push(action.payload);
        console.log("Added to favourites!");
      }
    },
  },
});

export default favouriteSlice;

export const favouriteActions = favouriteSlice.actions;
