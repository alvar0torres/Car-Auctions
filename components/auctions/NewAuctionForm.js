import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";
import { auctionsActions } from "../../store/auctionsSlice";
import { useDispatch } from "react-redux";

import classes from "./NewAuctionForm.module.css";

const NewAuctionForm = () => {
  const dispatch = useDispatch();

  const inputModel = useRef();
  const inputDescription = useRef();
  const inputPrice = useRef();
  const inputImage = useRef();
  const inputDateTime = useRef();

  // TODO:
  // 1) Add username/uid from localStorage.
  // 2) Add active = true;
  // 3) Add productId

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(inputModel.current.value);
    console.log(inputDescription.current.value);
    console.log(inputPrice.current.value);
    console.log(inputImage.current.value);
    console.log(inputDateTime.current.value);

    const newAuctionData = {
      model: inputModel.current.value,
      auctionId: Date.now(),
      remaining: "10h",
      price: inputPrice.current.value,
      description: inputDescription.current.value,
      active: true,
      owner: "alvaro2021",
      image: inputImage.current.value,
    };

    inputModel.current.value = "";
    inputDescription.current.value = "";
    inputPrice.current.value = "";
    inputImage.current.value = "";
    inputDateTime.current.value = "";

    dispatch(auctionsActions.addAuction(newAuctionData));
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
            defaultValue="2017-05-24T10:30"
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
