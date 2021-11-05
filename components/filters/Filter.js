import classes from "./Filter.module.css";

import BasicSelect from "../ui/BasicSelect";

const Filter = (props) => {
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>Filter results:</h1>
      <BasicSelect status={props.status} setStatus={props.setStatus} priceRange={props.priceRange} setPriceRange={props.setPriceRange}/>
    </section>
  );
};

export default Filter;
