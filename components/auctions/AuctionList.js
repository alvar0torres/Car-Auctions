import AuctionItem from "./AuctionItem";

import classes from "./AuctionList.module.css";

const AuctionList = (props) => {
  return (
    <ul className={classes.list}>
      {props.auctions.map((auction) => (
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
