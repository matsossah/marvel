import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./assets/marvel-logo.png";
import axios from "axios";
import qs from "qs";

import Characters from "./pages/Characters.js";
import Character from "./pages/Character.js";
import Comics from "./pages/Comics.js";
import Favorites from "./pages/Favorites.js";
import Header from "./components/Header.js";
import { useDebounce } from "use-debounce";

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [characterSearch, setCharacterSearch] = useState("");
  const [debouncedCharacterSearch] = useDebounce(characterSearch, 1500);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        name: debouncedCharacterSearch,
        // sort: sort,
        // limit: limit,
        // skip: skip,
      };
      const queryParams = qs.stringify(params);
      try {
        const response = await axios.get(
          `https://marvel-backend-28.herokuapp.com?${queryParams}`
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedCharacterSearch]);

  const handleCharacterSearch = (event) => {
    setCharacterSearch(event.target.value);
  };

  return (
    <Router>
      <Header logo={logo} />
      <Switch>
        <Route path="/comics/:characterId">
          <Character />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/favorites">
          <Favorites data={data} />
        </Route>
        <Route path="/">
          <Characters
            data={data}
            isLoading={isLoading}
            characterSearch={characterSearch}
            handleCharacterSearch={handleCharacterSearch}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
