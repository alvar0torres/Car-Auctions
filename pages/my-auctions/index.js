// our-domain.com/my-auctions

import { useEffect, useState } from "react";

import Spinner from "../../components/ui/Spinner";

import AuctionList from "../../components/auctions/AuctionList";
import classes from "../../styles/myAuctions.module.css";

import { UserAuth } from "../../components/authentication/context/AuthContext";

const MyAuctions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myAuctions, setMyAuctions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const { userData } = UserAuth();

  // Get the list of auctions for user:
  useEffect(() => {
    setIsLoading(true);
    let myAuctionsData = [];
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          for (const value of Object.values(data)) {
            if (value.owner === userData?.displayName) {
              myAuctionsData.push(value);
            }
          }
          if (myAuctionsData.length != 0) {
            setIsEmpty(false);
            setMyAuctions(myAuctionsData);
          }
          setIsLoading(false);
        }
      });
  }, [userData]);

  return (
    <section className={classes.section}>
      {isLoading && <Spinner />}
      {!isEmpty && <AuctionList auctions={myAuctions} />}
      {isEmpty && <h1>Nothing to show. No auctions were created yet.</h1>}
    </section>
  );
};

export default MyAuctions;