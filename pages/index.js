// our-domain.com/

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

import { parseCookies } from "../helpers/";
import filteringFunction from "../helpers/filteringFunction";

import AuctionList from "../components/auctions/AuctionList";
import Spinner from "../components/ui/Spinner";
import HomepageImage from "../components/ui/HomepageImage";
import Filter from "../components/filters/Filter";

const HomePage = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [status, setStatus] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const dispatch = useDispatch();

  // Checking whether there are authentication cookies available or not. If available -> Login. Otherwise -> Logout.
  if (!data.token || !data.userId || !data.username || !data.expirationTime) {
    dispatch(authActions.logout());
  } else {
    dispatch(authActions.login({ token: data.token, userId: data.userId }));
  }

  // Getting the list of all auctions from database:
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app/auctions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let list = [];

        // Storing response values in a temporal list for later filtering
        if (data != null) {
          for (const value of Object.values(data)) {
            list.push(value);
          }
        }

        // Filtering results by auction state and price range
        const filtered = filteringFunction(status, priceRange, list);

        //Checking if the filtered list is empty
        if (filtered.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        // Storing filtered list in a state:
        setFilteredList(filtered);
        // Setting isLoading to false so that the loading spinner is not rendered anymore
        setIsLoading(false);
      });
  }, [status, priceRange]);

  return (
    <section>
      <HomepageImage />
      <Filter
        status={status}
        setStatus={setStatus}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      {isLoading && <Spinner />}
      {isEmpty && <h1 id="noResults">No results found with these filters</h1>}
      <AuctionList auctions={filteredList} />
    </section>
  );
};

export default HomePage;

HomePage.getInitialProps = async ({ req }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
