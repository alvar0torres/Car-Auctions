// our-domain.com/my-auctions

import { useEffect, useState } from "react";

import Spinner from "../../components/ui/Spinner";
import { UserAuth } from "../../components/authentication/context/AuthContext";

import AuctionList from "../../components/auctions/AuctionList";
import classes from "../../styles/myAuctions.module.css";

import { getDatabase, ref, child, get } from "firebase/database";

const MyAuctions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myAuctions, setMyAuctions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const { userData } = UserAuth();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `auctions`))
      .then((data) => {
        const auctionList = Object.values(data.val());
        const myAuctionList = auctionList.filter(action => action.owner === userData?.displayName)

        if (myAuctionList.length) {
          setIsEmpty(false);
          setMyAuctions(myAuctionList);
        }
        setIsLoading(false);
      }
      )
      .catch((error) => {
        console.error(error);
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