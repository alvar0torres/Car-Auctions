// our-domain.com/auction/auctionId

import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useRouter } from "next/router";

import AuctionDetail from "../../components/auctions/AuctionDetail";

import { parseCookies } from "../../helpers";

const Auction = ({ data }) => {
  const dispatch = useDispatch();
  const [auctionId, setAuctionId] = useState("");
  const [auctionInfo, setAuctionInfo] = useState(null);
  const router = useRouter();

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  // Making sure the router params are available:
  useEffect(() => {
    if (router && router.query) {
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
