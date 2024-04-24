// our-domain.com/

import { useEffect, useState } from "react";

import filterAuctions from "../helpers/filteringFunction";

import AuctionList from "../components/auctions/AuctionList";
import Spinner from "../components/ui/Spinner";
import HomepageImage from "../components/ui/HomepageImage";
import Filter from "../components/filters/Filter";

import { getDatabase, ref, child, get } from "firebase/database";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [status, setStatus] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Get all auctions from db
  useEffect(() => {
    setIsLoading(true);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `auctions`))
      .then((data) => data.val())
      .then((auctions) => {
        const auctionList = Object.values(auctions);
        const filtered = filterAuctions(status, priceRange, auctionList);

        if (filtered.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        setFilteredList(filtered);
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
