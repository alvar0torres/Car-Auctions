import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";

import classes from "./NewAuctionForm.module.css";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { getDatabase, update, ref as dbRef } from "firebase/database";

import { UserAuth } from "../authentication/context/AuthContext";

const NewAuctionForm = () => {
  const dispatch = useDispatch();
  const { userData } = UserAuth();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const db = getDatabase();

  const inputModel = useRef();
  const inputDescription = useRef();
  const inputPrice = useRef();
  const inputDateTime = useRef();
  const auctionId = Date.now();

  //Getting current formatted Date and Time timestamp to be used in the expirationTime input selector:
  const currentDate = new Date();
  const mins = ("0" + currentDate.getMinutes()).slice(-2);
  const time = currentDate.getHours() + ":" + mins;
  const cDay = ("0" + currentDate.getDate()).slice(-2);
  const cMonth = currentDate.getMonth() + 1;
  const cYear = currentDate.getFullYear();

  const currentFormattedDateTime =
    cYear + "-" + cMonth + "-" + cDay + "T" + time;

  // Storing uploaded image in a state
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addNewAuction = (newAuctionData) => {
    const updates = {};
    updates['/auctions/' + newAuctionData.auctionId] = newAuctionData;
    update(dbRef(db), updates)
      .then(() => {
        console.log('Auction created successfully.');
        setIsUploading(false);
        router.push(`/`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Checking if a file has been selected
    if (image === null) {
      dispatch(alertActions.error("Please, choose a valid image."));
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
      return;
    }

    const expirationDate = new Date(inputDateTime.current.value);
    const expirationDateInMs = expirationDate.getTime();

    const storage = getStorage();
    const storageRef = ref(storage, `${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Checking if the file is a valid image. If not, displaying error message.
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      dispatch(alertActions.error("Please, choose a valid image."));
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);

      // Cancelling the upload if not valid.
      uploadTask.cancel();
      return;
    }
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setIsUploading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL and create new auction
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const newAuctionData = {
            model: inputModel.current.value,
            auctionId: auctionId.toString(),
            expirationTime: expirationDateInMs,
            price: parseInt(inputPrice.current.value).toLocaleString("en-US"),
            description: inputDescription.current.value,
            owner: userData?.displayName,
            image: url,
            lastBidder: "",
          };

          addNewAuction(newAuctionData);

          // Clear inputs
          inputModel.current.value = "";
          inputDescription.current.value = "";
          inputPrice.current.value = "";
          inputDateTime.current.value = "";
        });
      }
    );
  };

  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <h1>New Auction</h1>
          <TextField
            required
            inputRef={inputModel}
            id="outlined-basic"
            label="Model"
            variant="outlined"
          />
          <TextField
            required
            inputRef={inputDescription}
            id="outlined-multiline-static"
            label="Description..."
            multiline
            rows={4}
          />
          <TextField
            required
            inputRef={inputPrice}
            id="outlined-number"
            label="$ Price"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
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
          <div className={classes.imageInput}>
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {!isUploading && (
            <Button className={classes.input} type="submit" variant="contained">
              Submit
            </Button>
          )}
          {isUploading && <CircularProgress className={classes.progress} />}
        </form>
      </SimpleCard>
    </section>
  );
};

export default NewAuctionForm;
