// our-domain.com/auction/auctionId

import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

import AuctionDetail from "../../components/auctions/AuctionDetail";


const Auction = () => {
  const auctionList = useSelector( state => state.auctions.auctionList )
  const router = useRouter();

  console.log(auctionList);

  const auctionId = router.query.auctionId;
  let auctionInfo = {};

  auctionList.map((auction) => {
    if (auction.auctionId.toString() === auctionId) {
      auctionInfo = auction;
    }
  });

  return <AuctionDetail auction={auctionInfo} />;
};

export default Auction;
