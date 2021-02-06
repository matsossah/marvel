import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "./assets/marvel-logo.png";
import axios from "axios";
import qs from "qs";

import Home from "./pages/Home.js";
import Comics from "./pages/Comics.js";
import Favorites from "./pages/Favorites.js";
import Header from "./components/Header.js";
import { useDebounce } from "use-debounce";

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [debouncedTitle] = useDebounce(title, 1500);

  useEffect(() => {
    const favorites = Cookies.get("favorites");
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        title: debouncedTitle,
        sort: sort,
        limit: limit,
        skip: skip,
      };
      const queryParams = qs.stringify(params);
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=UVdhLoz6npT9W9Id`
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedTitle, sort]);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event);
  };

  const handleSkip = (event) => {
    setSkip(event.target.value);
  };

  return (
    <Router>
      <Header
        logo={logo}
        title={title}
        sort={sort}
        limit={limit}
        skip={skip}
        handleTitle={handleTitle}
        handleSort={handleSort}
        handleSkip={handleSkip}
      />
      <Switch>
        <Route path="/comics">
          <Comics data={data} />
        </Route>
        <Route path="/favorites">
          <Favorites data={data} />
        </Route>
        <Route path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
