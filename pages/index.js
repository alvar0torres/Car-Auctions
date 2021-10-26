// our-domain.com/

import { useSelector } from 'react-redux';

import AuctionList from "../components/auctions/AuctionList";

const HomePage = () => {
  const auctionList = useSelector( state => state.auctions.auctionList )

  return <AuctionList auctions={auctionList} />;
};

export default HomePage;
