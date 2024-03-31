// our-domain.com/my-favourites

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { parseCookies } from "../../helpers";

import AuctionList from "../../components/auctions/AuctionList";
import Spinner from "../../components/ui/Spinner";

import { UserAuth } from "../../components/authentication/context/AuthContext";


const Favourites = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);

  const { userData } = UserAuth();

  // Get the list of favourites for user
  useEffect(() => {
    setIsLoading(true);
    
    let favouritesIds = [];
    let favouriteAuctions = [];

    if (userData) {
      fetch(
        `https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/favourites/${userData.uid}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            for (const value of Object.values(data)) {
              favouritesIds.push(value.auctionId);
            }

            // Filter user favourites
            fetch(
              "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
            )
              .then((response) => response.json())
              .then((data) => {
                if (data) {
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
    }

  }, [userData]);

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
