import Card from "@mui/material/Card";

import classes from "./MaterialCard.module.css";

const MaterialCard = (props) => {
  return <Card className={classes.card}>{props.children}</Card>;
};

export default MaterialCard;
