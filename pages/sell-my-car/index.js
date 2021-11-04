// our-domain.com/sell-my-car

import Button from "@mui/material/Button";

import Link from "next/link";

import { parseCookies } from "../../helpers";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import classes from "../../styles/SellCarPage.module.css";

const SellCarPage = ({ data }) => {
  const dispatch = useDispatch();

  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  return (
    <section className={classes.section}>
      <h1>
        If you want to sell a car in Car-Auctions, you first need to create an
        account:
      </h1>
      <Link href="/sign-up">
        <Button className={classes.button} variant="contained">
          Create Account
        </Button>
      </Link>
      <h1>Already got an account?</h1>
      <Link href="/login">
        <Button className={classes.button} variant="contained">
          Log In
        </Button>
      </Link>
    </section>
  );
};

export default SellCarPage;

SellCarPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};