import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

import { useCookies } from "react-cookie";

import Navbar from "./Navbar";
import classes from "./Layout.module.css";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";

const Layout = (props) => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(['expirationTime']);

  //////////////////AUTO-LOGOUT///////////////////////////////

  const expirationTime = parseInt(cookie.expirationTime);

  setTimeout(() => {
    dispatch(authActions.logout());
  }, calculateRemainingTime(expirationTime));

  ///////////////////////////////////////////////////////////

  return (
    <div>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
