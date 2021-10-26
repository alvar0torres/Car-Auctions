import classes from "../styles/Navbar.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <Link href="/">
        <h1>Auctions</h1>
      </Link>
      <ul className={classes.list}>
        <Link href="/new-auction">
          <li>
            <Button variant="contained">New Auction</Button>
          </li>
        </Link>
        <Link href="/login">
          <li>
            <Button variant="contained">Login</Button>
          </li>
        </Link>
        <Link href="/sign-up">
          <li>
            <Button variant="contained">Sign Up</Button>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
