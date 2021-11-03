// our-domain.com/auction/auctionId

import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import AuctionDetail from "../../components/auctions/AuctionDetail";

import { parseCookies } from "../../helpers";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const Auction = ({ data }) => {
  const dispatch = useDispatch();
  const [auctionId, setAuctionId] = useState("");
  const [auctionInfo, setAuctionInfo] = useState(null);
  const router = useRouter();

  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  // Making sure the router params are available:
  useEffect(() => {
    if (router && router.query) {
      console.log(router.query);
      setAuctionId(router.query.auctionId);
    }
  }, [router]);

  // Getting the list of auctions:
  useEffect(() => {
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          for (const value of Object.values(data)) {
            console.log(auctionId);
            console.log(value);
            if (value.auctionId === auctionId) {
              setAuctionInfo(value);
            }
          }
        }
      });
  }, [auctionId]);

  return (
    <Fragment>
      {auctionInfo && <AuctionDetail auction={auctionInfo} />}
    </Fragment>
  );
};

export default Auction;

Auction.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
