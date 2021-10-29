import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";
import { auctionsActions } from "../../store/auctionsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import classes from "./NewAuctionForm.module.css";

const NewAuctionForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  const inputModel = useRef();
  const inputDescription = useRef();
  const inputPrice = useRef();
  const inputImage = useRef();
  const inputDateTime = useRef();
  const auctionId = Date.now();

  //Getting current formatted Date and Time timestamp to be used in the expirationTime input selector:

  const currentDate = new Date();
  const mins = ("0" + currentDate.getMinutes()).slice(-2);
  const time = currentDate.getHours() + ":" + mins;
  const cDay = currentDate.getDate();
  const cMonth = currentDate.getMonth() + 1;
  const cYear = currentDate.getFullYear();

  const currentFormattedDateTime =
    cYear + "-" + cMonth + "-" + cDay + "T" + time;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const expirationDate = new Date(inputDateTime.current.value);
    const expirationDateInMs = expirationDate.getTime();

    const newAuctionData = {
      model: inputModel.current.value,
      auctionId: auctionId.toString(),
      expirationTime: expirationDateInMs,
      price: parseInt(inputPrice.current.value),
      description: inputDescription.current.value,
      active: true,
      owner: username,
      image: inputImage.current.value,
    };

    console.log(newAuctionData);

    inputModel.current.value = "";
    inputDescription.current.value = "";
    inputPrice.current.value = "";
    inputImage.current.value = "";
    inputDateTime.current.value = "";

    dispatch(auctionsActions.addAuction(newAuctionData));

    router.push(`/`);
  };

  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>New Auction</h1>
          <TextField
            inputRef={inputModel}
            id="outlined-basic"
            label="Model"
            variant="outlined"
          />
          <TextField
            inputRef={inputDescription}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <TextField
            inputRef={inputPrice}
            id="outlined-number"
            label="$ Price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            inputRef={inputImage}
            id="outlined-basic"
            label="Picture (URL)"
            variant="outlined"
          />
          <TextField
            inputRef={inputDateTime}
            id="datetime-local"
            label="Ending Date"
            type="datetime-local"
            defaultValue={currentFormattedDateTime}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button className={classes.input} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </SimpleCard>
    </section>
  );
};

export default NewAuctionForm;
