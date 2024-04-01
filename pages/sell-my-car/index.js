// our-domain.com/sell-my-car

import Link from "next/link";

import Button from "@mui/material/Button";

import classes from "../../styles/SellCarPage.module.css";

const SellCarPage = () => {
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