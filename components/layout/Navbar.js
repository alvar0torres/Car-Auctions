import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Button from "@mui/material/Button";

import AccountMenu from "./AccountMenu";

import { UserAuth } from "../../components/authentication/context/AuthContext"

import classes from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [drawerClass, setDrawerClass] = useState(classes.mobileNav);
  const [backdropClass, setBackdropClass] = useState(classes.backdrop);
  const [favouritesBtnClass, setMenuBtnClass] = useState(null);
  const [allAuctionsBtnClass, setAllAuctionsBtnClass] = useState(null);
  const [joinBtnClass, setJoinBtnClass] = useState(null);
  const [sellCarBtnClass, setSellCarBtnClass] = useState(null);
  const [newAuctionBtnClass, setNewAuctionBtnClass] = useState(null);
  const [myAuctionsBtnClass, setMyAuctionsBtnClass] = useState(null);
  const [contactBtnClass, setContactBtnClass] = useState(null);
  const currentPath = router.pathname;

  const { userData, logOut, isLoggedIn } = UserAuth();

  const username = userData?.displayName;

  const logoutHandler = (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        console.log('Signed out.');
        router.push(`/`);

        setDrawerClass(classes.mobileNav);
        setBackdropClass(classes.backdrop);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openDrawerHandler = () => {
    setDrawerClass(classes.mobileNavOpen);
    setBackdropClass(classes.backdropOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
  };

  // When clicking on a navbar button, keep it highlighted
  useEffect(() => {
    if (router.pathname.includes("my-favourites")) {
      setMenuBtnClass(classes.selectedBtn);
    } else {
      setMenuBtnClass(null);
    }
    if (router.pathname === "/") {
      setAllAuctionsBtnClass(classes.selectedBtn);
    } else {
      setAllAuctionsBtnClass(null);
    }
    if (router.pathname.includes("sign-up")) {
      setJoinBtnClass(classes.selectedBtn);
    } else {
      setJoinBtnClass(null);
    }
    if (router.pathname.includes("sell-my-car")) {
      setSellCarBtnClass(classes.selectedBtn);
    } else {
      setSellCarBtnClass(null);
    }
    if (router.pathname.includes("new-auction")) {
      setNewAuctionBtnClass(classes.selectedBtn);
    } else {
      setNewAuctionBtnClass(null);
    }
    if (router.pathname.includes("sell-my-car")) {
      setSellCarBtnClass(classes.selectedBtn);
    } else {
      setSellCarBtnClass(null);
    }
    if (router.pathname.includes("my-auctions")) {
      setMyAuctionsBtnClass(classes.selectedBtn);
    } else {
      setMyAuctionsBtnClass(null);
    }
    if (router.pathname.includes("contact-us")) {
      setContactBtnClass(classes.selectedBtn);
    } else {
      setContactBtnClass(null);
    }
  }, [currentPath]);

  return (
    <section>
      <div onClick={closeDrawerHandler} className={backdropClass}></div>
      <header className={classes.headerDesktop}>
        <Link href="/">
          <div className={classes.logo}>Car-Auctions</div>
        </Link>
        <div>
          <ul className={classes.middleButtons}>
            {!isLoggedIn && (
              <Link href="/sign-up">
                <li id={classes.joinNow} className={joinBtnClass}>
                  Join Now
                </li>
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/my-favourites">
                <li className={favouritesBtnClass}>My Favourites</li>
              </Link>
            )}
            <Link href="/">
              <li className={allAuctionsBtnClass}>All Auctions</li>
            </Link>
            {isLoggedIn && (
              <Link href="/my-auctions">
                <li className={myAuctionsBtnClass}>My Auctions</li>
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/new-auction">
                <li className={newAuctionBtnClass}>Sell My Car</li>
              </Link>
            )}
            {!isLoggedIn && (
              <Link href="/sell-my-car">
                <li className={sellCarBtnClass}>Sell My Car</li>
              </Link>
            )}

            <Link href="/contact-us">
              <li className={contactBtnClass}>Contact Us</li>
            </Link>
          </ul>
        </div>
        <nav>
          {isLoggedIn && (
            <AccountMenu username={username} logout={logoutHandler} />
          )}
          {!isLoggedIn && (
            <ul>
              {isLoggedIn && (
                <li>
                  <Link href="/new-auction">
                    <Button className={classes.button} variant="contained">
                      New Auction
                    </Button>
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link href="/">
                    <Button
                      className={classes.button}
                      onClick={logoutHandler}
                      variant="contained"
                    >
                      ({username}) Logout
                    </Button>
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link href="/login">
                    <Button className={classes.button} variant="contained">
                      Login
                    </Button>
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link href="/sign-up">
                    <Button className={classes.button} variant="contained">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>
      <header className={classes.headerMobile}>
        <Link href="/">
          <div className={classes.logo}>Car-Auctions</div>
        </Link>
        <MenuRoundedIcon
          onClick={openDrawerHandler}
          fontSize="large"
          className={classes.hamburger}
        />
        <nav className={drawerClass}>
          <ul className={classes.mobileNavButtons}>
            {!isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/login">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    Login
                  </Button>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/sign-up">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    Sign Up
                  </Button>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/my-favourites">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    My Favourites
                  </Button>
                </Link>
              </li>
            )}
            <li className={classes.mobileNavItem}>
              <Link href="/">
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={closeDrawerHandler}
                >
                  All Auctions
                </Button>
              </Link>
            </li>
            {isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/my-auctions">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    My Auctions
                  </Button>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/new-auction">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    <li className={sellCarBtnClass}>Sell My Car</li>
                  </Button>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/sell-my-car">
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={closeDrawerHandler}
                  >
                    Sell My Car
                  </Button>
                </Link>
              </li>
            )}
            <li className={classes.mobileNavItem}>
              <Link href="/contact-us">
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={closeDrawerHandler}
                >
                  Contact Us
                </Button>
              </Link>
            </li>
            {isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/">
                  <Button
                    className={classes.button}
                    onClick={logoutHandler}
                    variant="contained"
                  >
                    ({username}) Logout
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Navbar;
