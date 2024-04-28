import Link from "next/link";

import AccountMenu from "../../AccountMenu";
import Logo from "../Logo/Logo";

import classes from "./HeaderDesktop.module.css";

const HeaderDesktopLoggedIn = (props) => {
  return (
    <section>
      <header className={classes.headerDesktop}>
        <Logo />
        <div>
          <ul className={classes.DesktopNavBarButtons}>
            <Link href="/my-favourites">
              <li className={props.favouritesBtnClass}>My Favourites</li>
            </Link>
            <Link href="/">
              <li className={props.allAuctionsBtnClass}>All Auctions</li>
            </Link>
            <Link href="/my-auctions">
              <li className={props.myAuctionsBtnClass}>My Auctions</li>
            </Link>
            <Link href="/new-auction">
              <li className={props.newAuctionBtnClass}>New Auction</li>
            </Link>
            <Link href="/contact-us">
              <li className={props.contactBtnClass}>Contact Us</li>
            </Link>
          </ul>
        </div>
        <nav>
          <AccountMenu username={props.username} logout={props.logoutHandler} />
        </nav>
      </header>
    </section>
  );
};

export default HeaderDesktopLoggedIn;
