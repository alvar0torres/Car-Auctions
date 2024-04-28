import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MobileNavButton from "./MobileNavButton/MobileNavButton";
import Logo from "../Logo/Logo";

import classes from "./HeaderMobile.module.css";

const HeaderMobileLoggedIn = (props) => {
    return (
        <section>
            <header className={classes.headerMobile}>
                <Logo />
                <MenuRoundedIcon
                    onClick={props.openDrawerHandler}
                    fontSize="large"
                    className={classes.hamburger}
                />
                <nav className={props.drawerClass}>
                    <ul className={classes.mobileNavButtons}>
                        <MobileNavButton
                            path='/my-favourites'
                            onClick={props.closeDrawerHandler}
                            text='My favourites'
                        />
                        <MobileNavButton
                            path='/'
                            onClick={props.closeDrawerHandler}
                            text='All Auctions'
                        />
                        <MobileNavButton
                            path='/my-auctions'
                            onClick={props.closeDrawerHandler}
                            text='My Auctions'
                        />
                        <MobileNavButton
                            path='/new-auction'
                            onClick={props.closeDrawerHandler}
                            text='New Auction'
                        />
                        <MobileNavButton
                            path='/contact-us'
                            onClick={props.closeDrawerHandler}
                            text='Contact Us'
                        />
                        <MobileNavButton
                            path='/'
                            onClick={props.logoutHandler}
                            text='Logout'
                        />
                    </ul>
                </nav>
            </header>
        </section>
    );
};

export default HeaderMobileLoggedIn;
