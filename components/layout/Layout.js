import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import { useCookies } from "react-cookie";

import Navbar from "./Navbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(['expirationTime']);

  //////////////////AUTO-LOGOUT///////////////////////////////

  const calculateRemainingTime = () => {
    const currentTime = Date.now();
    let expirationTime = "";

    expirationTime = parseInt(cookie.expirationTime);

    const remainingTime = expirationTime - currentTime;

    return remainingTime;
  };

  setTimeout(() => {
    dispatch(authActions.logout());
  }, calculateRemainingTime());

  ///////////////////////////////////////////////////////////

  return (
    <div>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
