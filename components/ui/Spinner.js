import CircularProgress from "@mui/material/CircularProgress";

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    
      <div className={classes.progressDiv}>
        <CircularProgress className={classes.progress} />
      </div>
    
  );
};

export default Spinner;
