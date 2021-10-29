import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import MaterialCard from "../ui/MaterialCard";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import classes from "./AuctionItem.module.css";

const AuctionItem = (props) => {
  const auctionState = useSelector((state) =>
    state.auctions.auctionList.find((auction) => auction.auctionId === props.id)
  );
  const [lastBidder, setLastBidder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.expirationTime)
  );

  const expirationDate = daysAndHours(remainingTimeinMs);

  useEffect(() => {
    if (remainingTimeinMs < 0) {
      if (auctionState.lastBidder === "") {
        setLastBidder("This auction ended with no bids");
        setIsClosed(true);
      } else {
        setLastBidder(auctionState.lastBidder);
      }
      setIsActive(false);
    }
  }, []);

  return (
    <MaterialCard>
      <Link href={`/auction/${props.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt="car picture"
          />
          <CardContent>
            {isActive && <h3 className={classes.activeBadge}>ACTIVE</h3>}
            {!isActive && !isClosed && (
              <h3 className={classes.soldBadge}>SOLD</h3>
            )}
            {!isActive && isClosed && (
              <h3 className={classes.closedBadge}>CLOSED</h3>
            )}
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {props.model}
              </Typography>
              {isActive && (
                <Typography gutterBottom component="div">
                  Left: {expirationDate}
                </Typography>
              )}
              {!isActive && !isClosed && (
                <Typography gutterBottom component="div">
                  The winner is @{lastBidder}
                </Typography>
              )}
              {!isActive && isClosed && (
                <Typography gutterBottom component="div">
                  {lastBidder}
                </Typography>
              )}
            </div>
            <Typography
              className={classes.price}
              gutterBottom
              variant="h5"
              component="div"
            >
              ${props.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {/* <CardActions>
        <Button size="small" color="primary">
          Add to Watchlist
        </Button>
      </CardActions> */}
    </MaterialCard>
  );
};

export default AuctionItem;
