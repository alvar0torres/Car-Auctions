import SimpleCard from "../ui/SimpleCard";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";

import { ref, update, remove, getDatabase, get, push, child } from "firebase/database";
import { UserAuth } from "../../components/authentication/context/AuthContext";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import classes from "./AuctionDetail.module.css";

const AuctionDetail = (props) => {
  const [priceIsHighlighted, setPriceIsHighlighted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const bidInput = useRef();
  const { isLoggedIn, userData } = UserAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteKey, setFavouriteKey] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isClosed, setIsClosed] = useState(false);
  const [price, setPrice] = useState();
  const [cardGridClasses, setCardGridClasses] = useState(
    classes.auctionCardGridActive
  );
  const db = getDatabase();
  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.auction.expirationTime)
  );
  const expirationDate = daysAndHours(remainingTimeinMs);
  const priceClasses = `${classes.price} ${priceIsHighlighted ? classes.bump : ""}`;

  useEffect(() => {
    setPrice(props.auction.price);
  }, [props]);

  useEffect(() => {
    checkIfAuctionClosed();
    checkIfActive();
    if (isLoggedIn) {
      checkIfFavourite();
    }
  });

  function checkIfActive() {
    if (remainingTimeinMs < 0) {
      setIsActive(false);
    }
  }

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
      +bidInput.current.value > price) {
      //Update displayed price
      setPrice(bidInput.current.value);
      setPriceIsHighlighted(true);
      setTimeout(() => {
        setPriceIsHighlighted(false);
      }, 300);

      //Update price and last bidder in database:
      function addBid(bid, username) {
        const updates = {};
        updates["/auctions/" + auctionId + "/price/"] = bid;
        updates["/auctions/" + auctionId + "/lastBidder/"] = username;
        bidInput.current.value = "";
        return update(ref(db), updates);
      }

      addBid(
        bidInput.current.value,
        userData.displayName
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

  function checkIfAuctionClosed() {
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
  }

  function checkIfFavourite() {
    let isFav = false;
    let favKey;

    const dbRef = ref(db);
    get(child(dbRef, 'favourites/' + userData.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        for (const [key, value] of Object.entries(data)) {
          if (
            value.auctionId === router.query.auctionId
          ) {
            isFav = true;
            favKey = key;
          }
        }

        if (isFav) {
          setIsFavourite(true);
          setFavouriteKey(favKey);
        }
      } else {
        console.log("No favourites");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function addFav() {
    const favData = {
      auctionId: router.query.auctionId
    };
    const newFavKey = push(child(ref(db), 'favourites/' + userData.uid)).key;
    const favUpdates = {};
    favUpdates['favourites/' + userData.uid + '/' + newFavKey] = favData;

    update(ref(db), favUpdates)
      .then(() => {
        console.log('Fav added successfully!');
        setIsFavourite(!isFavourite);
        setFavouriteKey(newFavKey);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  function removeFav(key) {
    remove(ref(db, "favourites/" + userData.uid + '/' + key))
      .then(() => {
        console.log('Fav removed successfully!');
        setIsFavourite(!isFavourite);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  const onToggleFavourite = () => {
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

    isFavourite ? removeFav(favouriteKey) : addFav();
  };

  return (
    <section className={classes.auctionCard}>
      <SimpleCard>
        <div className={classes.auctionCardFlex}>
          {!isFavourite && (
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
              onClick={onToggleFavourite}
            />
          )}
          {isFavourite && (
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
              onClick={onToggleFavourite}
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
