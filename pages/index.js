// our-domain.com/

import { useEffect } from "react";

import { parseCookies } from "../helpers/";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { auctionsActions } from "../store/auctionsSlice";

import AuctionList from "../components/auctions/AuctionList";

import HomepageImage from "../components/ui/HomepageImage";

const HomePage = ({ data }) => {
  const dispatch = useDispatch();
  const auctionList = useSelector((state) => state.auctions.auctionList);

  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  // Getting the list of auctions:
  useEffect(() => {
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let list = [];

        if (data != null) {
          for (const value of Object.values(data)) {
            console.log(value);
            list.push(value);
          }
        }

        dispatch(auctionsActions.toggleList(list));
      });
  }, [dispatch]);

  return (
    <section>
      <HomepageImage />

      <AuctionList auctions={auctionList} />
    </section>
  );
};

export default HomePage;

HomePage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
