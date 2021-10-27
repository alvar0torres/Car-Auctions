import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { authActions } from "../../store/authSlice";
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
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
    };

    emailInput.current.value = "";
    passwordInput.current.value = "";

    router.push(`/`);

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
          setError(data.error.message);
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
