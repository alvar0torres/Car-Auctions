import SimpleCard from "../ui/SimpleCard";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alertSlice";
import { useCookies } from "react-cookie";

import { ref, update, remove, set } from "firebase/database";
import database from "../../firebase/firebase";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import classes from "./AuctionDetail.module.css";

const AuctionDetail = (props) => {
  const [priceIsHighlighted, setPriceIsHighlighted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const bidInput = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [favourite, setFavourite] = useState(false);
  const [lastBidder, setLastBidder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const userId = cookie.userId;
  const username = cookie.username;
  const [price, setPrice] = useState(props.auction.price);
  const [cardGridClasses, setCardGridClasses] = useState(
    classes.auctionCardGridActive
  );

  useEffect(() => {
    if (remainingTimeinMs < 0) {
      if (props.auction.lastBidder === "") {
        setLastBidder("This auction ended with no bids");
        setIsClosed(true);
      } else {
        setLastBidder(props.auction.lastBidder);
      }
      setIsActive(false);
      setCardGridClasses(classes.auctionCardGridClosed);
    }
  }, []);

  useEffect(() => {
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/favourites.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          for (const value of Object.values(data)) {
            if (
              value.auctionId === router.query.auctionId &&
              value.userId === userId
            ) {
              setFavourite(true);
            }
          }
        }
      });
  }, []);

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
      //Setting price so that change is displayed in-page
      setPriceIsHighlighted(true);
      setTimeout(() => {
        setPriceIsHighlighted(false);
      }, 300);
      setPrice(parseInt(bidInput.current.value).toLocaleString("en-US"));

      //Updating price and last bidder in database:
      function addBid(bid, username) {
        const updates = {};
        updates["/auctions/" + auctionId + "/price/"] = bid;
        updates["/auctions/" + auctionId + "/lastBidder/"] = username;
        bidInput.current.value = "";
        return update(ref(database), updates);
      }

      addBid(
        parseInt(bidInput.current.value).toLocaleString("en-US"),
        username
      );
    } else {
      dispatch(
        alertActions.error("Your bid needs to be higher than current price")
      );
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
    }
  };

  function addFav() {
    const favData = {
      auctionId: router.query.auctionId,
      userId: userId,
    };

    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/favourites.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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

    // Getting favourites list from database:
    setFavourite(!favourite);
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/favourites.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          let counter = 0;
          for (const [key, value] of Object.entries(data)) {
            if (
              value.auctionId === router.query.auctionId &&
              value.userId === userId
            ) {
              remove(ref(database, "favourites/" + key));
            } else {
              counter++;
            }

            if (counter === Object.keys(data).length) {
              ///// Adding Favourite to Database /////////
              addFav();
            }
          }
        } else {
          ///// Adding Favourite to Database /////////
          addFav();
        }
      });
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
            <h1 className={priceClasses}>${price}</h1>
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
              {!isActive && !isClosed && (
                <div>
                  The winner is{" "}
                  <span className={classes.lastBidder}>@{lastBidder}</span>
                </div>
              )}
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
