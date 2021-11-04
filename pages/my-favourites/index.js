// our-domain.com/my-favourites

import { useEffect, useState } from "react";

import AuctionList from "../../components/auctions/AuctionList";

import { parseCookies } from "../../helpers";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useSelector } from "react-redux";

import Spinner from "../../components/ui/Spinner";

const Favourites = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);

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
              console.log("Favorito encontrado!");
              favouritesIds.push(value.auctionId);
            }
          }
          console.log("The list of favourites is: " + favouritesIds);

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
                console.log(favouriteAuctions);
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
