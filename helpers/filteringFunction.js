import calculateRemainingTime from "./remainingTimeCalculator";

function filterAuctions(status, priceRange, array) {

  function isActive(auction) {
    return calculateRemainingTime(auction.expirationTime) > 0;
  }

  function isSold(auction) {
    return (
      calculateRemainingTime(auction.expirationTime) < 0 &&
      auction.lastBidder !== ""
    );
  }

  function isClosed(auction) {
    return (
      calculateRemainingTime(auction.expirationTime) < 0 &&
      auction.lastBidder === ""
    );
  }

  function isPriceInRange(auction) {
    const price = parseFloat(auction.price.replace(/,/g, ""));
    switch (priceRange) {
      case "upTo5k":
        return price <= 5000;
      case "upTo10k":
        return price <= 10000 && price >= 5000;
      case "upTo20k":
        return price <= 20000 && price >= 10000;
      case "upTo50k":
        return price <= 50000 && price >= 20000;
      case "upTo100k":
        return price <= 100000 && price >= 50000;
      case "moreThan100k":
        return price >= 100000;
      default:
        return true;
    }
  }

  let filteredArray = array;
  switch (status) {
    case "Active":
      filteredArray = filteredArray.filter(isActive);
      break;
    case "Sold":
      filteredArray = filteredArray.filter(isSold);
      break;
    case "Closed":
      filteredArray = filteredArray.filter(isClosed);
      break;
    default:
      break;
  }

  if (priceRange) {
    filteredArray = filteredArray.filter(isPriceInRange);
  }

  return filteredArray;
}


export default filterAuctions;
