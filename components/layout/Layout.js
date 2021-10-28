import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { alertActions } from "../../store/alertSlice";

import { useCookies } from "react-cookie";

import Navbar from "./Navbar";
import Alert from "@mui/material/Alert";

import classes from "./Layout.module.css";

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
    <div>
      <Navbar />
      {alertState.showAlert && (
        <Alert
          onClose={onCloseHandler}
          severity={alertState.type}
          sx={{ width: "100%" }}
        >
          {alertState.message}
        </Alert>
      )}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
