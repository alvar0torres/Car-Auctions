import SimpleCard from "../ui/SimpleCard";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auctionsActions } from "../../store/auctionsSlice";
import { favouriteActions } from "../../store/favouriteSlice";
import { alertActions } from "../../store/alertSlice";
import { authActions } from "../../store/authSlice";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import classes from "./AuctionDetail.module.css";

const AuctionDetail = (props) => {
  const [priceIsHighlighted, setPriceIsHighlighted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const bidInput = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const favourites = useSelector((state) => state.favourites.favouritesList);
  const [favourite, setFavourite] = useState(false);
  const [lastBidder, setLastBidder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [cardGridClasses, setCardGridClasses] = useState(
    classes.auctionCardGridActive
  );
  const auctionState = useSelector((state) =>
    state.auctions.auctionList.find(
      (auction) => auction.auctionId === router.query.auctionId
    )
  );

  useEffect(() => {
    if (remainingTimeinMs < 0) {
      if (auctionState.lastBidder === "") {
        setLastBidder("This auction ended with no bids");
        setIsClosed(true);
      } else {
        setLastBidder(auctionState.lastBidder);
      }
      setIsActive(false);
      setCardGridClasses(classes.auctionCardGridClosed);
    }
  }, []);

  useEffect(() => {
    let existingFavourite = null;

    if (favourites.length > 0) {
      existingFavourite = favourites.findIndex(
        (favourite) =>
          favourite.userId === userId &&
          favourite.auctionId === router.query.auctionId
      );
    }

    if (existingFavourite != null && existingFavourite >= 0) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  });

  const priceClasses = `${classes.price} ${
    priceIsHighlighted ? classes.bump : ""
  }`;

  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.auction.expirationTime)
  );

  const expirationDate = daysAndHours(remainingTimeinMs);

  useEffect(() => {
    if (remainingTimeinMs < 0) {
      setIsActive(false);
    }
  }, []);

  const onBidHandler = (event) => {
    event.preventDefault();

    const auctionId = router.query.auctionId;

    if (!isLoggedIn) {
      dispatch(
        alertActions.error(
          "Please, log in first. Then you will be able to make bids"
        )
      );
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
      return;
    } else if (
      bidInput.current.value > parseFloat(props.auction.price.replace(/,/g, ""))
    ) {
      dispatch(
        auctionsActions.bid({
          auctionId: auctionId,
          bid: parseInt(bidInput.current.value).toLocaleString("en-US"),
          username: username,
        })
      );
      bidInput.current.value = "";
      setPriceIsHighlighted(true);
      setTimeout(() => {
        setPriceIsHighlighted(false);
      }, 300);
    } else {
      dispatch(
        alertActions.error("Your bid needs to be higher than current price")
      );
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
    }
  };

  const onFavouriteHandler = () => {
    if (!isLoggedIn) {
      dispatch(
        alertActions.error(
          "Please, log in first. Then you will be able to add auctions to favourites"
        )
      );
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
      return;
    }
    dispatch(
      favouriteActions.addOrRemoveFav({
        userId: userId,
        auctionId: router.query.auctionId,
      })
    );
  };

  return (
    <section className={classes.auctionCard}>
      <SimpleCard>
        <div className={classes.auctionCardFlex}>
          {!favourite && (
            <FavoriteBorderIcon
              sx={{
                bgcolor: "white",
                color: "black",
                border: 1,
                borderColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
              fontSize="large"
              className={classes.favoriteBtn}
              onClick={onFavouriteHandler}
            />
          )}
          {favourite && (
            <FavoriteIcon
              sx={{
                bgcolor: "white",
                color: "black",
                border: 1,
                borderColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
              fontSize="large"
              className={classes.favoriteBtn}
              onClick={onFavouriteHandler}
            />
          )}
          {isActive && <h3 className={classes.activeBadge}>ACTIVE</h3>}
          {!isActive && !isClosed && (
            <h3 className={classes.soldBadge}>SOLD</h3>
          )}
          {!isActive && isClosed && (
            <h3 className={classes.closedBadge}>CLOSED</h3>
          )}
          <img
            className={classes.image}
            src={props.auction.image}
            alt="car picture"
          />
          <div className={cardGridClasses}>
            <h1 className={classes.model}>{props.auction.model}</h1>
            <div className={classes.description}>
              {props.auction.description}
            </div>
            <h1 className={priceClasses}>${props.auction.price}</h1>
            {isActive && (
              <form onSubmit={onBidHandler} className={classes.form}>
                <TextField
                  inputRef={bidInput}
                  id="outlined-number"
                  label="$ Enter your bid"
                  type="number"
                  width="100%"
                  inputProps={{ min: 0, max: 100000000000000000 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type="submit" variant="contained">
                  BID
                </Button>
              </form>
            )}

            <div className={classes.ownerAndTimeOrResult}>
              <div>
                Owner:{" "}
                <span className={classes.ownerSpan}>{props.auction.owner}</span>
              </div>
              {isClosed && <div>This auction ended with no bids</div>}
              {!isActive && !isClosed && <div>The winner is <span className={classes.lastBidder}>@{lastBidder}</span></div>}
              {isActive && (
                <div>
                  Time left:{" "}
                  <span className={classes.timeLeftSpan}>{expirationDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </SimpleCard>
    </section>
  );
};

export default AuctionDetail;
