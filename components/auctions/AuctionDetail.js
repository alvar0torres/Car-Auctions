import SimpleCard from "../ui/SimpleCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { auctionsActions } from "../../store/auctionsSlice";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";
import daysAndHours from "../../helpers/daysAndHoursConverter";

import classes from "./AuctionDetail.module.css";

const AuctionDetail = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const bidInput = useRef(); 

  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.auction.expirationTime)
  );

  const expirationDate = daysAndHours(remainingTimeinMs);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const auctionId = router.query.auctionId;

    dispatch(auctionsActions.bid({auctionId: auctionId, bid: bidInput.current.value}))
  };

  return (
    <section className={classes.auctionCard}>
      <SimpleCard>
        <div className={classes.auctionCardFlex}>
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
          />
          <h3 className={classes.statusBadge}>ACTIVE</h3>
          <img
            className={classes.image}
            src={props.auction.image}
            alt="car picture"
          />
          <div className={classes.auctionCardGrid}>
            <h1 className={classes.model}>{props.auction.model}</h1>
            <div className={classes.description}>
              {props.auction.description}
            </div>
            <h1 className={classes.price}>${props.auction.price}</h1>
            <form onSubmit={onSubmitHandler}>
              <FormControl className={classes.form} fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Your bid
                </InputLabel>
                <OutlinedInput
                  inputRef={bidInput}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
                <Button type="submit" variant="contained">
                  BID
                </Button>
              </FormControl>
            </form>
            <div className={classes.ownerAndTime}>
              <div className={classes.owner}>Owner: {props.auction.owner}</div>
              <div className={classes.timeLeft}>
                Time left: {expirationDate}
              </div>
            </div>
          </div>
        </div>
      </SimpleCard>
    </section>
  );
};

export default AuctionDetail;
