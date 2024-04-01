import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertActions } from "../../store/alertSlice";

import Footer from "./Footer";

import Navbar from "./Navbar";
import Alert from "@mui/material/Alert";

import classes from "./Layout.module.css";

const Layout = (props) => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alert);

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
