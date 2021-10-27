import { useRef, useState } from "react";

import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import classes from "./SignupForm.module.css";

const SignupForm = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const usernameInput = useRef();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

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
          console.log(data.error.message);
          setError(data.error.message);
        }

        const IdAndUsername = { userId: data.localId, username: username };

        return fetch(
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
            inputRef={emailInput}
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
          />
          <TextField
            inputRef={usernameInput}
            id="outlined-basic"
            label="Username"
            type="text"
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

export default SignupForm;
