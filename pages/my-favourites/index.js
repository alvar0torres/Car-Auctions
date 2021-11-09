// our-domain.com/my-favourites

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useSelector } from "react-redux";

import { parseCookies } from "../../helpers";

import AuctionList from "../../components/auctions/AuctionList";
import Spinner from "../../components/ui/Spinner";


const Favourites = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  const userId = useSelector((state) => state.auth.userId);

  let favouritesIds = [];
  let favouriteAuctions = [];

  // Getting the list of favourites and filtering username:
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/favourites.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          for (const value of Object.values(data)) {
            if (JSON.stringify(value.userId) === userId) {
              favouritesIds.push(value.auctionId);
            }
          }

          // Getting the list of auctions, filtering favourites and adding to final array:
          fetch(
            "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
          )
            .then((response) => response.json())
            .then((data) => {
              if (data != null) {
                for (const value of Object.values(data)) {
                  if (favouritesIds.includes(value.auctionId)) {
                    favouriteAuctions.push(value);
                  }
                }
                setFavourites(favouriteAuctions);
                setIsLoading(false);
              }
            });
        }
      });
  }, [userId]);

  return (
    <section>
      {isLoading && <Spinner />}
      <AuctionList auctions={favourites} />;
    </section>
  );
};

export default Favourites;

Favourites.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
