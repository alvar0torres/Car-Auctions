import { createSlice } from "@reduxjs/toolkit";

const DUMMY_DATA = [
  {
    model: "Toyota pick-up",
    auctionId: "p1",
    expirationTime: "1537688340217",
    price: "1,000",
    description: "very nice and fast car. Blue color",
    active: true,
    owner: "s4vitar",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgsat.jp%2Fwp-content%2Fuploads%2F2020%2F09%2FUsed-Toyota-Hilux-Pickup-2016-Automatic-2800CC-Seat-5-Door-4-RHD.43-1.jpeg",
    lastBidder: "",
  },
  {
    model: "Honda Civic black",
    auctionId: "p2",
    expirationTime: "1637288340217",
    price: "7,000",
    description: "very nice and fast car. Blue color XXX2",
    active: true,
    owner: "alvar0torres",
    lastBidder: "",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusedcars.honda.co.uk%2Fpicserver1%2Fuserdata%2F46%2F500176%2FYheRBoblFro%2Fxxl_kfz823891_dscf0007.jpg",
  },
  {
    model: "White Suv Bmw",
    auctionId: "p3",
    expirationTime: "1636888340217",
    price: "3,000",
    description: "very nice and fast car. Blue color XXX3",
    active: true,
    owner: "perikillo0x",
    lastBidder: "",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcarbazaar.co.ke%2Fwp-content%2Fuploads%2F2019%2F03%2FWhatsApp-Image-2019-01-08-at-4.34.48-PM-1.jpeg",
  },
  {
    model: "Jeep Rubicon",
    auctionId: "p4",
    expirationTime: "1537188340217",
    price: "4,000",
    description: "very nice and fast car. Blue colo XXX4 r",
    active: true,
    owner: "alvar095",
    lastBidder: "alvar0torres",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.selectjeeps.com%2Fimagetag%2F12634%2F29%2Fl%2FUsed-2011-Jeep-Wrangler-Rubicon.jpg",
  },
  {
    model: "Range Rover Red",
    auctionId: "p5",
    expirationTime: "1537348334217",
    price: "2,500",
    description: "very nice and fast car. Blue color XXX5",
    active: true,
    owner: "alvar0uu",
    lastBidder: "",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F225841%2Fpexels-photo-225841.jpeg%3Fauto%3Dcompress%26cs%3Dtinysrgb%26dpr%3D2%26h%3D650%26w%3D940&f=1&nofb=1",
  },
];

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

      console.log(existingAuction);
    },
  },
});

export default auctionsSlice;

export const auctionsActions = auctionsSlice.actions;
