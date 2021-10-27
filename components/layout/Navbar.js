import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useCookies } from "react-cookie";

import Button from "@mui/material/Button";

import Link from "next/link";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    removeCookie("token");
    removeCookie("userId");
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Auctions</div>
      </Link>
      <nav>
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
                  Logout
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
                <Button variant="contained">Sign</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
