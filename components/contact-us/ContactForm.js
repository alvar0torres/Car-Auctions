import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";

import SimpleCard from "../ui/SimpleCard";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import classes from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const inputName = useRef();
  const inputEmail = useRef();
  const inputMessage = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const currentDate = new Date().toString();

    const data = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      message: inputMessage.current.value,
      date: currentDate,
    };

    // Storing data in database
    fetch(
      `https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/contact.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setIsLoading(false);
        dispatch(
          alertActions.success("Message sent! We will contact you soon.")
        );
        setTimeout(() => {
          dispatch(alertActions.close());
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    inputName.current.value = "";
    inputEmail.current.value = "";
    inputMessage.current.value = "";
  };

  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>Contact Us</h1>
          <TextField
            required
            inputRef={inputName}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
          <TextField
            required
            inputRef={inputEmail}
            id="outlined-basic"
            type="email"
            label="E-mail"
            variant="outlined"
          />
          <TextField
            required
            inputRef={inputMessage}
            id="outlined-multiline-static"
            label="Write something..."
            multiline
            rows={4}
          />
          {!isLoading && (
            <Button className={classes.input} type="submit" variant="contained">
              Send
            </Button>
          )}
          {isLoading && <CircularProgress className={classes.progress} />}
        </form>
      </SimpleCard>
    </section>
  );
};

export default ContactForm;
