import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { authActions } from "../../store/authSlice";
import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import classes from "./LoginForm.module.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [cookie, setCookie] = useCookies();

  const emailInput = useRef();
  const passwordInput = useRef();

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
    };

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((response) => {
        const token = response.user.accessToken;
        const userId = response.user.uid;

        dispatch(
          authActions.login({ token, userId })
        );

        setCookie("token", token, {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
        setCookie("userId", userId, {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
        setCookie("expirationTime", (Date.now() + 3600000).toString(), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });

        return fetch(
          "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        )
          .then((response) => response.json())
          .then((data) => {
            let username = "";

            if (data != null) {
              for (const value of Object.values(data)) {
                if (value.userId === userId) {
                  username = value.username;

                  setCookie("username", username, {
                    path: "/",
                    maxAge: 3600,
                    sameSite: true,
                  });
                }
              }
            }

            emailInput.current.value = "";
            passwordInput.current.value = "";

            setIsLoading(false);
            router.push(`/`);

            dispatch(alertActions.success("Welcome back, " + username + "!"));
            setTimeout(() => {
              dispatch(alertActions.close());
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        dispatch(alertActions.error(error.message));
        setTimeout(() => {
          dispatch(alertActions.close());
        }, 5000);
        setIsLoading(false);
      })
    }  

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
          {!isLoading && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
          {isLoading && <CircularProgress className={classes.progress} />}
        </form>
      </SimpleCard>
    </section>
  );
};

export default LoginForm;
