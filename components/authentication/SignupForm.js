import { useRef, useState } from "react";
import { useRouter } from "next/router";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { alertActions } from "../../store/alertSlice";
import { useDispatch } from "react-redux";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

    const email = emailInput.current.value;
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    emailInput.current.value = "";
    passwordInput.current.value = "";
    usernameInput.current.value = "";

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          dispatch(alertActions.success("Account succesfully created! You can now log in."));
          setTimeout(() => {
            dispatch(alertActions.close());
          }, 5000);

          setIsLoading(false);
          router.push(`/login`);
        }).catch((error) => {
          console.log(error);

          dispatch(alertActions.error(error.message));
          setTimeout(() => {
            dispatch(alertActions.close());
          }, 5000);

          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);

        dispatch(alertActions.error(error.message));
        setTimeout(() => {
          dispatch(alertActions.close());
        }, 5000);

        setIsLoading(false);
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
          {isLoading && <CircularProgress className={classes.progress} />}
        </form>
      </SimpleCard>
    </section>
  );
};

export default SignupForm;
