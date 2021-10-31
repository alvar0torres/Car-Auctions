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
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
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
      <header className={classes.headerDesktop}>
        <Link href="/">
          <div className={classes.logo}>Car-Auctions</div>
        </Link>
        <nav>
          <ul>
            {isLoggedIn && (
              <li>
                <Link href="/new-auction">
                  <Button className={classes.button} variant="contained">
                    New
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
            {isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/new-auction">
                  <Button
                    className={classes.button}
                    onClick={closeDrawerHandler}
                    variant="contained"
                  >
                    New
                  </Button>
                </Link>
              </li>
            )}
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
            {!isLoggedIn && (
              <li className={classes.mobileNavItem}>
                <Link href="/login">
                  <Button
                    className={classes.button}
                    onClick={closeDrawerHandler}
                    variant="contained"
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
                    onClick={closeDrawerHandler}
                    variant="contained"
                  >
                    Sign Up
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
