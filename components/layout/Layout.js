import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { alertActions } from "../../store/alertSlice";

import { useCookies } from "react-cookie";

import Footer from "./Footer";

import Navbar from "./Navbar";
import Alert from "@mui/material/Alert";

import classes from "./Layout.module.css";

import {database, auth} from "../../firebase/firebase";

import calculateRemainingTime from "../../helpers/remainingTimeCalculator";

const Layout = (props) => {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["expirationTime"]);
  const alertState = useSelector((state) => state.alert);

  //////////////////AUTO-LOGOUT///////////////////////////////

  const expirationTime = parseInt(cookie.expirationTime);

  setTimeout(() => {
    dispatch(authActions.logout());
  }, calculateRemainingTime(expirationTime));

  ///////////////////////////////////////////////////////////

  const onCloseHandler = () => {
    dispatch(alertActions.close());
  };

  return (
    <div className={classes.wholePage}>
      <Navbar />
      {alertState.showAlert && (
        <Alert
          className={classes.alert}
          onClose={onCloseHandler}
          severity={alertState.type}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      )}
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
