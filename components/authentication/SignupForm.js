import { useRef, useState } from "react";
import { useRouter } from "next/router";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";

import classes from "./SignupForm.module.css";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const emailInput = useRef();
  const passwordInput = useRef();
  const usernameInput = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const enteredData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      returnSecureToken: true,
    };

    const username = usernameInput.current.value;

    emailInput.current.value = "";
    passwordInput.current.value = "";
    usernameInput.current.value = "";

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtfB7Tgz0D94hYlzsnrPoipQHWhCM_qKY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          let message = null;
          console.log(data.error.message);

          if (data.error.message === "EMAIL_EXISTS") {
            message = "The email address is already in use by another account.";
          } else if (data.error.message === "OPERATION_NOT_ALLOWED") {
            message = "Password sign-in is disabled for this project.";
          } else if (data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
            message =
              "We have blocked all requests from this device due to unusual activity. Try again later.";
          } else if (data.error.message === "WEAK_PASSWORD") {
            message = "Password should be at least 6 characters";
          }

          dispatch(alertActions.error(message || data.error.message));
          setTimeout(() => {
            dispatch(alertActions.close());
          }, 5000);
          setIsLoading(false);
          return;
        }

        const IdAndUsername = { userId: data.localId, username: username };

        fetch(
          `https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(IdAndUsername),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);

            dispatch(alertActions.success("Account succesfully created! You can now log in."));
            setTimeout(() => {
              dispatch(alertActions.close());
            }, 5000);

            setIsLoading(false);
            router.push(`/login`);
          })
          .catch((error) => {
            console.error("Error:", error);
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
          <h1>Sign Up</h1>
          <TextField
            required
            inputRef={emailInput}
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
          />
          <TextField
            required
            inputRef={usernameInput}
            id="outlined-basic"
            label="Username"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            inputRef={passwordInput}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          {!isLoading && <Button type="submit" variant="contained">
            Submit
          </Button>}
          {isLoading && <CircularProgress className={classes.progress}/>}
        </form>
      </SimpleCard>
    </section>
  );
};

export default SignupForm;
