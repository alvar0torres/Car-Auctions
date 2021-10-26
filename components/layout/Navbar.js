import Button from "@mui/material/Button";

import Link from 'next/link';

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Auctions</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/new-auction">
              <Button variant="contained">New</Button>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </li>
          <li>
            <Link href="/sign-up">
              <Button variant="contained">Sign</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
