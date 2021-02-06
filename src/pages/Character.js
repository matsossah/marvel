import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";

const Character = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?characterId=${characterId}&apiKey=UVdhLoz6npT9W9Id&c`
        );

        console.log({ response });
        setComics(response.data.results);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [characterId]);

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

export default Character;
