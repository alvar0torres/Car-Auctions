// our-domain.com/my-favourites

import { useEffect, useState } from "react";

import AuctionList from "../../components/auctions/AuctionList";
import Spinner from "../../components/ui/Spinner";

import { UserAuth } from "../../components/authentication/context/AuthContext";

import { getDatabase, ref, child, get } from "firebase/database";


const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const { userData } = UserAuth();

  // Get the list of favourites for user
  useEffect(() => {
    setIsLoading(true);

    if (userData) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `favourites/${userData.uid}`)).then((data) => {
        if (data.exists()) {
          const favouriteIDs = [];
          for (const value of Object.values(data.val())) {
            favouriteIDs.push(value.auctionId);
          }

          favouriteIDs.map((id, index) => {
            get(child(dbRef, `auctions/${id}`))
              .then((data) => data.val())
              .then((auction) => {
                if (auction) {
                  setFavourites(prevFavorites => [...prevFavorites, auction]);
                }
                if (index === (favouriteIDs.length - 1)) {
                  setIsLoading(false);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          })
        }
      }).catch((error) => {
        console.error(error);
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