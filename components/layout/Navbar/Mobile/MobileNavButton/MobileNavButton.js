import Link from "next/link";

import Button from "@mui/material/Button";

import classes from "./MobileNavButton.module.css";

const MobileNavButton = (props) => {
    return (
        <li className={classes.mobileNavItem}>
            <Link href={props.path}>
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={props.onClick}
                >
                    {props.text}
                </Button>
            </Link>
        </li>
    );
};

export default MobileNavButton;
