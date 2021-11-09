// our-domain.com/new-auction

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import { parseCookies } from "../../helpers";

import NewAuctionForm from "../../components/auctions/NewAuctionForm";


const NewAuctionPage = ({ data }) => {
  const dispatch = useDispatch();

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
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
