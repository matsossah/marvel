import { useState, useEffect } from "react";
import axios from "axios";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              key={index}
              name={comic.title}
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
