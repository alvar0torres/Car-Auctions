// our-domain.com/

import ListingCard from "../components/ListingCard";

import classes from "../styles/HomePage.module.css";

const DUMMY_DATA = [
  {
    title: "Mustang",
    remaining: "2d 1h remaining",
    price: 1000,
    description: "very nice and fast car. Blue color",
    status: "active",
    creator: "alvar0torres",
    image: "https://images.barrons.com/im-133736?width=1280",
    productId: "p1"
  },
  {
    title: "Red Car",
    productId: "p2",
    remaining: "4d 3h remaining",
    price: 7000,
    description: "very nice and fast car. Blue color",
    status: "active",
    creator: "alvar0torres",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ZS5XB3SXLYs%2FTozDlwvnn1I%2FAAAAAAAAAKI%2FPx7xH6hVjTQ%2Fs1600%2Fold%2Bclassic%2Bcars%2Bfor%2Bcheap%2B5.jpg",
  },
  {
    title: "Yellow",
    productId: "p3",
    remaining: "3d 1h remaining",
    price: 3000,
    description: "very nice and fast car. Blue color",
    status: "active",
    creator: "alvar0torres",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-hrGuEwRgs0w%2FTnl4JgUtzNI%2FAAAAAAAAAAc%2FgDQ_G0gk7zo%2Fs1600%2Fclassic%2Bcars-3.jpg",
  },
  {
    title: "Very Old",
    productId: "p4",
    remaining: "1d 6h remaining",
    price: 4000,
    description: "very nice and fast car. Blue color",
    status: "active",
    creator: "alvar0torres",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fjpg%2F200606%2Fclassic-cars-definit.jpg",
  },
  {
    title: "Fast One",
    productId: "p5",
    remaining: "3d 4h remaining",
    price: 2500,
    description: "very nice and fast car. Blue color",
    status: "active",
    creator: "alvar0torres",
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffarm9.staticflickr.com%2F8028%2F7683757076_bb42241dc2.jpg",
  },
];

const HomePage = () => {
  return (
    <section className={classes.cardsGrid}>
      {DUMMY_DATA.map((item) => (
        <ListingCard
          title={item.title}
          remaining={item.remaining}
          price={item.price}
          image={item.image}
          id={item.productId}
        />
      ))}
    </section>
  );
};

export default HomePage;
