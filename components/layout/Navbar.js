import Button from "@mui/material/Button";

import NextLinkComposed from "../../src/Link";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <NextLinkComposed className={classes.logoLink} href="/">
        <div className={classes.logo}>Auctions</div>
      </NextLinkComposed>
      <nav>
        <ul>
          <li>
            <NextLinkComposed href="/new-auction">
              <Button variant="contained">New</Button>
            </NextLinkComposed>
          </li>
          <li>
            <NextLinkComposed href="/login">
              <Button variant="contained">Login</Button>
            </NextLinkComposed>
          </li>
          <li>
            <NextLinkComposed href="/sign-up">
              <Button variant="contained">Sign</Button>
            </NextLinkComposed>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
