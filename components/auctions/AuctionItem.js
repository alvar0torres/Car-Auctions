import { useState, useEffect } from "react";
import Link from "next/link";
import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import SimpleCard from "../ui/SimpleCard";

import CardMedia from "@mui/material/CardMedia";

import classes from "./AuctionItem.module.css";

const AuctionItem = (props) => {
  const [lastBidder, setLastBidder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.expirationTime)
  );

  const expirationDate = daysAndHours(remainingTimeinMs);

  useEffect(() => {
    if (remainingTimeinMs < 0) {
      if (props.lastBidder === "") {
        setLastBidder("This auction ended with no bids");
        setIsClosed(true);
      } else {
        setLastBidder(props.lastBidder);
      }
      setIsActive(false);
    }
  }, []);

  return (
    <Link href={`/auction/${props.id}`}>
      <section className={classes.cardSection}>
        <SimpleCard>
          <CardMedia
            className={classes.image}
            component="img"
            height="200"
            image={props.image}
            alt="car picture"
          />
          <div className={classes.cardContent}>
            {isActive && <h3 className={classes.activeBadge}>ACTIVE</h3>}
            {!isActive && !isClosed && (
              <h3 className={classes.soldBadge}>SOLD</h3>
            )}
            {!isActive && isClosed && (
              <h3 className={classes.closedBadge}>CLOSED</h3>
            )}

            <h1>
              {props.model}
            </h1>
            {isActive && (
              <div className={classes.timeLeftOrResult}>
                Left: {expirationDate}
              </div>
            )}
            {!isActive && !isClosed && (
              <div className={classes.timeLeftOrResult}>
                The winner is @{lastBidder}
              </div>
            )}
            {!isActive && isClosed && (
              <div className={classes.timeLeftOrResult}>
                {lastBidder}
              </div>
            )}

            <h1 className={classes.price}>${props.price}</h1>
          </div>
        </SimpleCard>
      </section>
    </Link>
  );
};

export default AuctionItem;
