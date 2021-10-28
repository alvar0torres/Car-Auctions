import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { authActions } from "../../store/authSlice";
import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies();

  const emailInput = useRef();
  const passwordInput = useRef();
  

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtfB7Tgz0D94hYlzsnrPoipQHWhCM_qKY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.idToken) {
          dispatch(
            authActions.login({ token: data.idToken, userId: data.localId })
          );
        }
        if (data.error) {
          console.log(data.error.message);
          let message = null;

          if (data.error.message === "INVALID_EMAIL") {
            message = "Please enter a valid e-mail address.";
          } else if (data.error.message === "EMAIL_NOT_FOUND") {
            message =
              "The entered email address is not registered. Please sign up first.";
          } else if (data.error.message === "INVALID_PASSWORD") {
            message = "The password is not correct.";
          } else if (data.error.message === "MISSING_PASSWORD") {
            message = "The password is missing.";
          }

          dispatch(alertActions.error(message || data.error.message));
          setTimeout(() => {
            dispatch(alertActions.close());
          }, 5000);
          return;
        }

        setCookie("token", JSON.stringify(data.idToken), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setCookie("userId", JSON.stringify(data.localId), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setCookie("expirationTime", JSON.stringify(Date.now() + 3600000), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

        const id = data.localId;

        return fetch(
          "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        )
          .then((response) => response.json())
          .then((data) => {
            let username = "";

            if (data != null) {
              for (const value of Object.values(data)) {
                if (value.userId === id) {
                  username = value.username;
                  dispatch(authActions.updateUsername(username));
                }
              }
            }

            router.push(`/`);

            emailInput.current.value = "";
            passwordInput.current.value = "";

            dispatch(alertActions.success("Welcome back, " + username + "!"));
            setTimeout(() => {
              dispatch(alertActions.close());
            }, 5000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>Log In</h1>
          <TextField
            inputRef={emailInput}
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
          />
          <TextField
            inputRef={passwordInput}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </SimpleCard>
    </section>
  );
};

export default LoginForm;
