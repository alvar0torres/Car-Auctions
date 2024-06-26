import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import classes from "./LoginForm.module.css";

import { UserAuth } from "./context/AuthContext";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const emailInput = useRef();
  const passwordInput = useRef();

  const { logIn } = UserAuth();

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value
    };


    logIn(loginData.email, loginData.password)
      .then(({ user }) => {
        const username = user.displayName;

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
