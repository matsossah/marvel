import { useState, useEffect } from "react";
import axios from "axios";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";
import Cookies from "js-cookie";
import qs from "qs";
import { useDebounce } from "use-debounce";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comicSearch, setComicSearch] = useState("");
  const [debouncedComicSearch] = useDebounce(comicSearch, 1500);

  const handleFavorite = (comic) => {
    let elem = {
      id: comic._id,
      name: comic.title,
      description: comic.description,
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
    };

    let userFavorites = [];
    if (Cookies.get("userFavorites")) {
      userFavorites = [...JSON.parse(Cookies.get("userFavorites"))];
    }

    userFavorites.push(elem);
    var json_str = JSON.stringify(userFavorites);
    Cookies.set("userFavorites", json_str, { expires: 200 });
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const params = {
          title: debouncedComicSearch,
          // sort: sort,
          // limit: limit,
          // skip: skip,
        };
        const queryParams = qs.stringify(params);
        const response = await axios.get(
          `https://marvel-backend-28.herokuapp.com/comics?${queryParams}`
        );
        console.log(response);
        let newData = [...response.data.results];
        newData.sort((a, b) => (a.title > b.title ? 1 : -1));
        setComics(newData);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedComicSearch]);

  const handleComicSearch = (event) => {
    setComicSearch(event.target.value);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div>
        <input
          className="search-bar"
          type="text"
          value={comicSearch}
          placeholder="Search..."
          onChange={(event) => {
            handleComicSearch(event);
          }}
        />
      </div>
      <div className="cards">
        {comics.map((comic, index) => {
          return (
            <Card
              key={comic._id}
              name={comic.title}
              handleFavorite={() => handleFavorite(comic)}
              description={comic.description}
              thumbnail={comic.thumbnail.path + "." + comic.thumbnail.extension}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
