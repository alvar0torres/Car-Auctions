import classes from "./HomepageImage.module.css";

const HomepageImage = () => {
  return (
    <section>
      <div className={classes.desktop}>
        <h1 className={classes.text}>The most trusted source for car deals</h1>
        <img src="/bmwBlueDesktop.jpg" className={classes.image} />
      </div>

      <div className={classes.mobile}>
        <h1 className={classes.text}>The most trusted source for car deals</h1>
        <img src="/bmwBlueCropped.jpg" className={classes.image} />
      </div>
    </section>
  );
};

export default HomepageImage;
