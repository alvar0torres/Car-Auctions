import calculateRemainingTime from "./remainingTimeCalculator";

function filteringFunction(status, priceRange, array) {
  let filteredArray = [];

  if (status === "" && priceRange === "") {
    filteredArray = array;
  } else if (status === "" && priceRange === "upTo5k") {
    filteredArray = array.filter(
      (auction) => parseFloat(auction.price.replace(/,/g, "")) <= 5000
    );
  } else if (status === "" && priceRange === "upTo10k") {
    filteredArray = array.filter(
      (auction) =>
        parseFloat(auction.price.replace(/,/g, "")) <= 10000 &&
        parseFloat(auction.price.replace(/,/g, "")) >= 5000
    );
  } else if (status === "" && priceRange === "upTo20k") {
    filteredArray = array.filter(
      (auction) =>
        parseFloat(auction.price.replace(/,/g, "")) <= 20000 &&
        parseFloat(auction.price.replace(/,/g, "")) >= 10000
    );
  } else if (status === "" && priceRange === "upTo50k") {
    filteredArray = array.filter(
      (auction) =>
        parseFloat(auction.price.replace(/,/g, "")) <= 50000 &&
        parseFloat(auction.price.replace(/,/g, "")) >= 20000
    );
  } else if (status === "" && priceRange === "upTo100k") {
    filteredArray = array.filter(
      (auction) =>
        parseFloat(auction.price.replace(/,/g, "")) <= 100000 &&
        parseFloat(auction.price.replace(/,/g, "")) >= 50000
    );
  } else if (status === "" && priceRange === "moreThan100k") {
    filteredArray = array.filter(
      (auction) => parseFloat(auction.price.replace(/,/g, "")) >= 100000
    );
  } else if (status === "Active" && priceRange === "") {
    filteredArray = array.filter(
      (auction) => calculateRemainingTime(auction.expirationTime) > 0
    );
  } else if (status === "Active" && priceRange === "upTo5k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter((auction) => parseFloat(auction.price.replace(/,/g, "")) <= 5000);
  } else if (status === "Active" && priceRange === "upTo10k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 10000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 5000
      );
  } else if (status === "Active" && priceRange === "upTo20k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 20000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 10000
      );
  } else if (status === "Active" && priceRange === "upTo50k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 50000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 20000
      );
  } else if (status === "Active" && priceRange === "upTo100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 100000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 50000
      );
  } else if (status === "Active" && priceRange === "moreThan100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) > 0)
      .filter(
        (auction) => parseFloat(auction.price.replace(/,/g, "")) >= 100000
      );
  } else if (status === "Sold" && priceRange === "") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "upTo5k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter((auction) => parseFloat(auction.price.replace(/,/g, "")) <= 5000)
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "upTo10k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 10000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 5000
      )
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "upTo20k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 20000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 10000
      )
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "upTo50k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 50000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 20000
      )
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "upTo100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 100000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 50000
      )
      .filter((auction) => auction.lastBidder != "");
  } else if (status === "Sold" && priceRange === "moreThan100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) => parseFloat(auction.price.replace(/,/g, "")) >= 100000
      )
      .filter((auction) => auction.lastBidder != "");
  }  else if (status === "Closed" && priceRange === "") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "upTo5k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter((auction) => parseFloat(auction.price.replace(/,/g, "")) <= 5000)
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "upTo10k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 10000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 5000
      )
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "upTo20k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 20000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 10000
      )
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "upTo50k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 50000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 20000
      )
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "upTo100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) =>
          parseFloat(auction.price.replace(/,/g, "")) <= 100000 &&
          parseFloat(auction.price.replace(/,/g, "")) >= 50000
      )
      .filter((auction) => auction.lastBidder === "");
  } else if (status === "Closed" && priceRange === "moreThan100k") {
    filteredArray = array
      .filter((auction) => calculateRemainingTime(auction.expirationTime) < 0)
      .filter(
        (auction) => parseFloat(auction.price.replace(/,/g, "")) >= 100000
      )
      .filter((auction) => auction.lastBidder === "");
  }

  return filteredArray;
}

export default filteringFunction;
