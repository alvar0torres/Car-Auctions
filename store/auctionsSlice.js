import { createSlice } from '@reduxjs/toolkit';

const DUMMY_DATA = [
    {
      model: "Mustang",
      auctionId: "p1",
      remaining: "2d 1h",
      price: 1000,
      description: "very nice and fast car. Blue color",
      active: true,
      owner: "s4vitar",
      image: "https://images.barrons.com/im-133736?width=1280",
    },
    {
      model: "Red Car",
      auctionId: "p2",
      remaining: "4d 3h",
      price: 7000,
      description: "very nice and fast car. Blue color XXX2",
      active: true,
      owner: "alvar0torres",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ZS5XB3SXLYs%2FTozDlwvnn1I%2FAAAAAAAAAKI%2FPx7xH6hVjTQ%2Fs1600%2Fold%2Bclassic%2Bcars%2Bfor%2Bcheap%2B5.jpg",
    },
    {
      model: "Yellow",
      auctionId: "p3",
      remaining: "3d 1h",
      price: 3000,
      description: "very nice and fast car. Blue color XXX3",
      active: true,
      owner: "perikillo0x",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-hrGuEwRgs0w%2FTnl4JgUtzNI%2FAAAAAAAAAAc%2FgDQ_G0gk7zo%2Fs1600%2Fclassic%2Bcars-3.jpg",
    },
    {
      model: "Very Old",
      auctionId: "p4",
      remaining: "1d 6h",
      price: 4000,
      description: "very nice and fast car. Blue colo XXX4 r",
      active: true,
      owner: "alvar095",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fjpg%2F200606%2Fclassic-cars-definit.jpg",
    },
    {
      model: "Fast One",
      auctionId: "p5",
      remaining: "3d 4h",
      price: 2500,
      description: "very nice and fast car. Blue color XXX5",
      active: true,
      owner: "alvar0uu",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffarm9.staticflickr.com%2F8028%2F7683757076_bb42241dc2.jpg",
    },
  ];

const auctionsSlice = createSlice({
    name: "auctions",
    initialState: {auctionList: DUMMY_DATA},
    reducers: {
        addAuction(state, action) {
            state.auctionList.push(action.payload)
        }
    }
})


export default auctionsSlice;

export const auctionsActions = auctionsSlice.actions;