// our-domain.com/

import { parseCookies } from "../helpers/";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

import AuctionList from "../components/auctions/AuctionList";

import HomepageImage from "../components/ui/HomepageImage";

const HomePage = ({ data }) => {
  const dispatch = useDispatch();
  const auctionList = useSelector((state) => state.auctions.auctionList);

  if (!data.token || !data.userId) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  return (
    <section>
      <HomepageImage />

      <AuctionList auctions={auctionList} />
    </section>
  );
};

export default HomePage;

HomePage.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  // if (res) {
  //     if (Object.keys(data).length === 0 && data.constructor === Object) {
  //       res.writeHead(301, { Location: "/" })
  //       res.end()
  //     }
  //   }

  return {
    data: data && data,
  };
};
