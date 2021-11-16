import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Button from "@mui/material/Button";

import AccountMenu from "./AccountMenu";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();
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

  // Checking in redux store if user is logged in.
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Getting username from cookies and storing it in a variable.
  const username = cookie.username;

  // When dispatching the logout action, we also remove all the user cookies. This way, user will be kept logged out if refreshes the page.
  const logoutHandler = (event) => {
    event.preventDefault();
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
    removeCookie("token", { path: "/" });
    removeCookie("userId", { path: "/" });
    removeCookie("expirationTime", { path: "/" });
    removeCookie("username", { path: "/" });
    dispatch(authActions.logout());
    router.push(`/`);
  };

  const openDrawerHandler = () => {
    setDrawerClass(classes.mobileNavOpen);
    setBackdropClass(classes.backdropOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
  };

  // When clicking on a menu botton, we want to keep the button selected. So this Useffect checks the url route and assing the right class to the button.
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
                      ({cookie.username}) Logout
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
