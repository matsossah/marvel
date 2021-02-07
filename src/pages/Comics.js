import { useState, useEffect } from "react";
import axios from "axios";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";
import Cookies from "js-cookie";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFavorite = (comic) => {
    let elem = {
      id: comic._id,
      name: comic.title,
      description: comic.description,
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
    };
    let userFavorites = JSON.parse(Cookies.get("userFavorites"));
    if (userFavorites) {
      userFavorites.push(elem);
      var json_str = JSON.stringify(userFavorites);
      Cookies.set("userFavorites", json_str, { expires: 200 });
    } else {
      let arr = [elem];
      var json_string = JSON.stringify(arr);
      Cookies.set("userFavorites", json_string, { expires: 200 });
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=UVdhLoz6npT9W9Id`
        );
        console.log(response.data);
        setComics(response.data.results);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
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
