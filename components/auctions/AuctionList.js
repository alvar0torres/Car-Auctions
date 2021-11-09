import AuctionItem from "./AuctionItem";

import classes from "./AuctionList.module.css";

const AuctionList = (props) => {
  let auctions = [];

  if (props && props.auctions) {
    auctions = props.auctions;
  }

  return (
    <ul className={classes.list}>
      {auctions.map((auction) => (
        <li key={auction.auctionId}>
          <AuctionItem
            model={auction.model}
            expirationTime={auction.expirationTime}
            price={auction.price}
            image={auction.image}
            id={auction.auctionId}
            lastBidder={auction.lastBidder}
          />
        </li>
      ))}
    </ul>
  );
};

export default AuctionList;
