import Link from "next/link";

import classes from "./Logo.module.css";

const Logo = () => {
    return (
        <Link href="/">
            <div className={classes.logo}>Car-Auctions</div>
        </Link>
    );
};

export default Logo;