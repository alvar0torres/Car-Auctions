// our-domain.com/contact-us

import ContactForm from "../../components/contact-us/ContactForm";

import { parseCookies } from "../../helpers";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const ContactUs = ({ data }) => {
  const dispatch = useDispatch();

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  return <ContactForm />;
};

export default ContactUs;

ContactUs.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
