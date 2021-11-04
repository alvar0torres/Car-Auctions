import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alertSlice";

import classes from "./NewAuctionForm.module.css";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewAuctionForm = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();
  const username = cookie.username;
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (image === null) {
      dispatch(alertActions.error("Please, choose a valid image."));
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);
      return;
    }

    const expirationDate = new Date(inputDateTime.current.value);
    const expirationDateInMs = expirationDate.getTime();

    const storageRef = ref(storage, `${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      dispatch(alertActions.error("Please, choose a valid image."));
      setTimeout(() => {
        dispatch(alertActions.close());
      }, 5000);

      console.log("select valid image.");
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
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          const newAuctionData = {
            model: inputModel.current.value,
            auctionId: auctionId.toString(),
            expirationTime: expirationDateInMs,
            price: parseInt(inputPrice.current.value).toLocaleString("en-US"),
            description: inputDescription.current.value,
            active: true,
            owner: username,
            image: downloadURL,
            lastBidder: "",
          };

          console.log(newAuctionData);

          inputModel.current.value = "";
          inputDescription.current.value = "";
          inputPrice.current.value = "";
          inputDateTime.current.value = "";

          // dispatch(auctionsActions.addAuction(newAuctionData));

          fetch(
            `https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions/${newAuctionData.auctionId}.json`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAuctionData),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              setIsUploading(false);
              router.push(`/`);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    );
  };

  console.log("image: ", image);

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
            // id="outlined-basic"
            // label="Description"
            // variant="outlined"
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
