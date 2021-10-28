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
  const remainingTimeinMs = calculateRemainingTime(
    parseInt(props.expirationTime)
  );

  const expirationDate = daysAndHours(remainingTimeinMs);

  let formattedPrice = null;

  if (props) {
    formattedPrice = props.price.toLocaleString("en-US")
  }

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
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {props.model}
              </Typography>
              <Typography gutterBottom component="div">
                Left: {expirationDate}
              </Typography>
            </div>
            <Typography
              className={classes.price}
              gutterBottom
              variant="h5"
              component="div"
            >
              ${formattedPrice.toLocaleString("en-US")}
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
