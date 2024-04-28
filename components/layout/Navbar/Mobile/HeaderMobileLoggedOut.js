import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MobileNavButton from "./MobileNavButton/MobileNavButton";
import Logo from "../Logo/Logo";

import classes from "./HeaderMobile.module.css";

const HeaderMobileLoggedOut = (props) => {
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
                            path='/login'
                            text='Login'
                            onClick={props.closeDrawerHandler}
                        />
                        <MobileNavButton
                            path='/sign-up'
                            text='Sign Up'
                            onClick={props.closeDrawerHandler}
                        />
                        <MobileNavButton
                            path='/'
                            text='All Auctions'
                            onClick={props.closeDrawerHandler}
                        />
                        <MobileNavButton
                            path='/sell-my-car'
                            text='New Auction'
                            onClick={props.closeDrawerHandler}
                        />
                        <MobileNavButton
                            path='/contact-us'
                            text='Contact Us'
                            onClick={props.closeDrawerHandler}
                        />
                    </ul>
                </nav>
            </header>
        </section>
    );
};

export default HeaderMobileLoggedOut;
