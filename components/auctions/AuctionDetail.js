import SimpleCard from "../ui/SimpleCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import classes from "./AuctionDetail.module.css";

const AuctionDetail = (props) => {
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
            <FormControl className={classes.form} fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Your bid
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
              <Button variant="contained">BID</Button>
            </FormControl>
            <div className={classes.ownerAndTime}>
              <div className={classes.owner}>Owner: {props.auction.owner}</div>
              <div className={classes.timeLeft}>
                Time left: {props.auction.remaining}
              </div>
            </div>
          </div>
        </div>
      </SimpleCard>
    </section>
  );
};

export default AuctionDetail;
