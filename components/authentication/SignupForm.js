import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import classes from "./SignupForm.module.css";

const SignupForm = () => {
  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form className={classes.form}>
          <h1>Sign Up</h1>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Username"
            type="text"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button className={classes.input} type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </SimpleCard>
    </section>
  );
};

export default SignupForm;
