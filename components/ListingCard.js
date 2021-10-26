import * as React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import classes from "../styles/ListingCard.module.css";





export default function ListingCard(props) {
  return (
    <Card className={classes.card}>
      <Link href={`/product/${props.id}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.image}
          alt="car picture"
        />
        <CardContent>
          <div>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="div"
            >
              {props.title}
            </Typography>
            <Typography className={classes.title} gutterBottom component="div">
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
      </Link>
      {/* <CardActions>
        <Button size="small" color="primary">
          Add to Watchlist
        </Button>
      </CardActions> */}
    </Card>
  );
}
