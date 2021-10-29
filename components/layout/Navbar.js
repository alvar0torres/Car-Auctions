import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useCookies } from "react-cookie";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Button from "@mui/material/Button";

import Link from "next/link";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [drawerClass, setDrawerClass] = useState(classes.mobileNav);
  const [backdropClass, setBackdropClass] = useState(classes.backdrop);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);

  const logoutHandler = () => {
    removeCookie("token");
    removeCookie("userId");
    dispatch(authActions.logout());
  };

  const openDrawerHandler = () => {
    setDrawerClass(classes.mobileNavOpen);
    setBackdropClass(classes.backdropOpen);
    console.log("classes updated ");
  };

  const closeDrawerHandler = () => {
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
  };

  return (
    <section>
      <div onClick={closeDrawerHandler} className={backdropClass}></div>
      <header className={classes.header}>
        <div className={classes.logoDesktop}>Car-Auctions</div>
        <div className={classes.hamburgerAndLogo}>
          <MenuRoundedIcon
            onClick={openDrawerHandler}
            fontSize="large"
            className={classes.hamburger}
          />
          <Link href="/">
            <div className={classes.logoMobile}>Car-Auctions</div>
          </Link>
        </div>
        <nav className={classes.desktopNav}>
          <ul>
            {isLoggedIn && (
              <li>
                <Link href="/new-auction">
                  <Button variant="contained">New</Button>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link href="/">
                  <Button onClick={logoutHandler} variant="contained">
                    ({username}) Logout
                  </Button>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link href="/login">
                  <Button variant="contained">Login</Button>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link href="/sign-up">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <nav className={drawerClass}>
        <ul className={classes.mobileNavButtons}>
          {isLoggedIn && (
            <li className={classes.mobileNavItem}>
              <Link href="/new-auction">
                <Button variant="contained">New</Button>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className={classes.mobileNavItem}>
              <Link href="/">
                <Button onClick={logoutHandler} variant="contained">
                  ({username}) Logout
                </Button>
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className={classes.mobileNavItem}>
              <Link href="/login">
                <Button variant="contained">Login</Button>
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className={classes.mobileNavItem}>
              <Link href="/sign-up">
                <Button variant="contained">Sign Up</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
