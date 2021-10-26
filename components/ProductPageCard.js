import SimpleCard from "./SimpleCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import classes from "../styles/ProductPageCard.module.css";

const ProductPageCard = (props) => {
  return (
    <section className={classes.productCard}>
      <SimpleCard>
        <div className={classes.cardFlex}>
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
          <h3 className={classes.badge}>ACTIVE</h3>
          <img className={classes.image} src={props.image} alt="car picture" />
          <div className={classes.cardGrid}>
            <h1 className={classes.title}>{props.model}</h1>
            <div className={classes.description}>{props.description}</div>
            <h1 className={classes.price}>${props.price}</h1>
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
              <div className={classes.owner}>Owner: {props.owner}</div>
              <div className={classes.timeLeft}>Time left: {props.remaining}</div>
            </div>
            {/* <div className={classes.yellowxd}>This is yellow button</div>
            <div className={classes.redxd}>This is red button</div>
            <div className={classes.status}>This is status</div>
            <div className={classes.creator}>This is creator</div> */}
          </div>
        </div>
      </SimpleCard>
    </section>
  );
};

export default ProductPageCard;
