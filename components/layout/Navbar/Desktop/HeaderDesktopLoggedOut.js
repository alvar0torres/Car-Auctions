import Link from "next/link";

import Button from "@mui/material/Button";

import classes from "./HeaderDesktop.module.css";

import Logo from "../Logo/Logo";

const HeaderDesktopLoggedOut = (props) => {
    return (
        <section>
            <header className={classes.headerDesktop}>
                <Logo />
                <div>
                    <ul className={classes.DesktopNavBarButtons}>
                        <Link href="/sign-up">
                            <li className={props.joinBtnClass}>
                                Join Now
                            </li>
                        </Link>
                        <Link href="/">
                            <li className={props.allAuctionsBtnClass}>All Auctions</li>
                        </Link>
                        <Link href="/sell-my-car">
                            <li className={props.sellCarBtnClass}>New Auction</li>
                        </Link>
                        <Link href="/contact-us">
                            <li className={props.contactBtnClass}>Contact Us</li>
                        </Link>
                    </ul>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/login">
                                <Button className={classes.button} variant="contained">
                                    Login
                                </Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/sign-up">
                                <Button className={classes.button} variant="contained">
                                    Sign Up
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </section>
    );
};

export default HeaderDesktopLoggedOut;
