import SimpleCard from "../../components/ui/SimpleCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <section className={classes.formSection}>
      <SimpleCard>
        <form className={classes.form}>
          <h1>Log In</h1>
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

export default LoginForm;