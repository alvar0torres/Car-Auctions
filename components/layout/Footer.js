import classes from "./Footer.module.css";

const Footer = () => {
  return <footer className={classes.footer}>© {new Date().getFullYear()} Alvaro Torres</footer>;
};

export default Footer;
