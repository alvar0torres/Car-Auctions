import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import classes from "./Navbar.module.css";
import HeaderDesktopLoggedIn from "./Desktop/HeaderDesktopLoggedIn";
import HeaderDesktopLoggedOut from "./Desktop/HeaderDesktopLoggedOut";
import HeaderMobileLoggedIn from "./Mobile/HeaderMobileLoggedIn";
import HeaderMobileLoggedOut from "./Mobile/HeaderMobileLoggedOut";

import { UserAuth } from "../../authentication/context/AuthContext"

const Navbar = () => {
  const router = useRouter();
  const [drawerClass, setDrawerClass] = useState(classes.mobileNav);
  const [backdropClass, setBackdropClass] = useState(classes.backdrop);
  const [favouritesBtnClass, setMenuBtnClass] = useState(null);
  const [allAuctionsBtnClass, setAllAuctionsBtnClass] = useState(null);
  const [joinBtnClass, setJoinBtnClass] = useState(null);
  const [sellCarBtnClass, setSellCarBtnClass] = useState(null);
  const [newAuctionBtnClass, setNewAuctionBtnClass] = useState(null);
  const [myAuctionsBtnClass, setMyAuctionsBtnClass] = useState(null);
  const [contactBtnClass, setContactBtnClass] = useState(null);
  const currentPath = router.pathname;
  const { userData, logOut, isLoggedIn } = UserAuth();
  const username = userData?.displayName;

  const logoutHandler = (event) => {
    event.preventDefault();
    logOut()
      .then(() => {
        console.log('Signed out.');
        router.push(`/`);

        setDrawerClass(classes.mobileNav);
        setBackdropClass(classes.backdrop);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openDrawerHandler = () => {
    setDrawerClass(classes.mobileNavOpen);
    setBackdropClass(classes.backdropOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerClass(classes.mobileNav);
    setBackdropClass(classes.backdrop);
  };

  // Highlight navBar button
  useEffect(() => {
    const paths = [
      { path: "/my-favourites", setter: setMenuBtnClass },
      { path: "/", setter: setAllAuctionsBtnClass },
      { path: "/sign-up", setter: setJoinBtnClass },
      { path: "/sell-my-car", setter: setSellCarBtnClass },
      { path: "/new-auction", setter: setNewAuctionBtnClass },
      { path: "/my-auctions", setter: setMyAuctionsBtnClass },
      { path: "/contact-us", setter: setContactBtnClass }
    ];

    paths.forEach(({ path, setter }) => {
      if (currentPath === path) {
        setter(classes.selectedBtn);
      } else {
        setter(null);
      }
    });
  }, [currentPath]);

  return (
    <section>
      <div onClick={closeDrawerHandler} className={backdropClass}></div>
      {isLoggedIn && <HeaderDesktopLoggedIn
        logoutHandler={logoutHandler}
        joinBtnClass={joinBtnClass}
        allAuctionsBtnClass={allAuctionsBtnClass}
        sellCarBtnClass={sellCarBtnClass}
        contactBtnClass={contactBtnClass}
        newAuctionBtnClass={newAuctionBtnClass}
        favouritesBtnClass={favouritesBtnClass}
        myAuctionsBtnClass={myAuctionsBtnClass}
        username={username}
      />
      }
      {!isLoggedIn && <HeaderDesktopLoggedOut
        joinBtnClass={joinBtnClass}
        allAuctionsBtnClass={allAuctionsBtnClass}
        sellCarBtnClass={sellCarBtnClass}
        contactBtnClass={contactBtnClass}
      />
      }
      {isLoggedIn && <HeaderMobileLoggedIn
         openDrawerHandler={openDrawerHandler}
         closeDrawerHandler={closeDrawerHandler}
         logoutHandler={logoutHandler}
         drawerClass={drawerClass}
      />
      }
      {!isLoggedIn && <HeaderMobileLoggedOut
        openDrawerHandler={openDrawerHandler}
        closeDrawerHandler={closeDrawerHandler}
        drawerClass={drawerClass}
      />
      }
    </section>
  );
};

export default Navbar;
