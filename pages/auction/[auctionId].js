// our-domain.com/auction/auctionId

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AuctionDetail from "../../components/auctions/AuctionDetail";

const Auction = ({ data }) => {
  const [auctionId, setAuctionId] = useState("");
  const [auctionInfo, setAuctionInfo] = useState(null);
  const router = useRouter();

  // Make sure the router params are available:
  useEffect(() => {
    if (router && router.query) {
      setAuctionId(router.query.auctionId);
    }
  }, [router]);

  // Get the list of auctions:
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