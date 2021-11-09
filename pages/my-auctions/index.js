// our-domain.com/my-auctions

import { useEffect, useState } from "react";

import { parseCookies } from "../../helpers";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

import Spinner from "../../components/ui/Spinner";

import AuctionList from "../../components/auctions/AuctionList";
import classes from "../../styles/myAuctions.module.css";

const MyAuctions = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [myAuctions, setMyAuctions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(
      authActions.login({
        token: data.token,
        userId: data.userId,
        username: data.username,
      })
    );
  }

  const username = useSelector((state) => state.auth.username);

  let myAuctionsData = [];

  // Getting the list of auctions and filtering userId:
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          for (const value of Object.values(data)) {
            if (value.owner === username) {
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
  }, [dispatch]);

  return (
    <section className={classes.section}>
      {isLoading && <Spinner />}
      {!isEmpty && <AuctionList auctions={myAuctions} />}
      {isEmpty && <h1>Nothing to show. No auctions were created yet.</h1>}
    </section>
  );
};

export default MyAuctions;

MyAuctions.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
