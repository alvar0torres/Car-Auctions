import classes from "./SimpleCard.module.css";

const SimpleCard = (props) => {
    return <div className={classes.card}>{props.children}</div>
};

export default SimpleCard;