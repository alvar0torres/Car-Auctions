// our-domain.com/new-auction

import NewAuctionForm from "../../components/auctions/NewAuctionForm";

import { parseCookies } from "../../helpers";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const NewAuctionPage = ({ data }) => {
  const dispatch = useDispatch();

  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  return <NewAuctionForm />;
};

export default NewAuctionPage;

NewAuctionPage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
