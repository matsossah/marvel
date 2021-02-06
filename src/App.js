import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "./assets/marvel-logo.png";
import axios from "axios";
// import qs from "qs";

import Home from "./pages/Home.js";
import Character from "./pages/Character.js";
import Comics from "./pages/Character.js";
import Favorites from "./pages/Favorites.js";
import Header from "./components/Header.js";
import { useDebounce } from "use-debounce";

const App = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [title, setTitle] = useState("");
  const [debouncedTitle] = useDebounce(title, 1500);

  useEffect(() => {
    const favorites = Cookies.get("favorites");
    if (favorites) {
      setFavorites(favorites);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const params = {
      //   title: debouncedTitle,
      //   sort: sort,
      //   limit: limit,
      //   skip: skip,
      // };
      // const queryParams = qs.stringify(params);
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
  }, [debouncedTitle]);

  return (
    <Router>
      <Header logo={logo} title={title} />
      <Switch>
        <Route path="/comics/:characterId">
          <Character />
        </Route>
        <Route path="/comics/">
          <Comics />
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
