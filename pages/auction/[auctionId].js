// our-domain.com/auction/auctionId

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AuctionDetail from "../../components/auctions/AuctionDetail";

import { getDatabase, ref, child, get } from "firebase/database";

const Auction = () => {
  const [auctionId, setAuctionId] = useState("");
  const [auctionInfo, setAuctionInfo] = useState(null);
  const router = useRouter();

  // Make sure the router params are available:
  useEffect(() => {
    if (router && router.query) {
      setAuctionId(router.query.auctionId);
    }
  }, [router]);

  // Get current auction
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `auctions/${auctionId}`))
      .then((data) => setAuctionInfo(data.val()))
      .catch((error) => {
        console.error(error);
      });
  }, [auctionId]);

  return (
    <Fragment>
      {auctionInfo && <AuctionDetail auction={auctionInfo} />}
    </Fragment>
  );
};

export default Auction;