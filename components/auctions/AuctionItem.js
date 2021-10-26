import NextLinkComposed from "../../src/Link";

import MaterialCard from "../ui/MaterialCard";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import classes from "./AuctionItem.module.css";

const AuctionItem = (props) => {
  return (
    <MaterialCard>
      <NextLinkComposed className={classes.link} href={`/auction/${props.id}`}>
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
                {props.remaining}
              </Typography>
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
      </NextLinkComposed>
      {/* <CardActions>
        <Button size="small" color="primary">
          Add to Watchlist
        </Button>
      </CardActions> */}
    </MaterialCard>
  );
};

export default AuctionItem;
