import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const beerUrl =
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json";
const imageUrl =
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [originalBeers, setOriginalBeers] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    const beerResponse = fetch(beerUrl).then((res) => res.json());
    const imageResponse = fetch(imageUrl).then((res) => res.json());

    Promise.all([beerResponse, imageResponse]).then((values) => {
      console.log("CALLED");
      if (values.length > 0) {
        let beers = values[0];
        let images = values[1];
        let newBeers = beers.map((item, index) => {
          return { ...item, image: images[index % images.length].image };
        });
        // console.log(newBeers);

        setCocktails(newBeers);
        setOriginalBeers(newBeers);
        setLoading(false);
      } else {
        setCocktails([]);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  useEffect(() => {
    if (searchTerm !== "") {
      let newBeers = originalBeers.filter((beer) => {
        return beer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      setCocktails(newBeers);
    } else {
      setCocktails(originalBeers);
    }
  }, [searchTerm, originalBeers]);
  return (
    <AppContext.Provider
      value={{ loading, cocktails, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
