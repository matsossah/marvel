import React, { useEffect, useState } from "react";
import cover from "../assets/marvel-cover.jpg";
import Cookies from "js-cookie";
import Card from "../components/Card.js";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(Cookies.get("userFavorites")) || null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (favorites) {
      setFavorites(favorites);
      setIsLoading(false);
    }
  }, [favorites]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="cards">
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      {favorites.map((element, index) => {
        return (
          <Card
            key={element._id}
            name={element.name}
            description={element.description}
            display={"none"}
            thumbnail={element.thumbnail}
          />
        );
      })}
    </div>
  );
};

export default Favorites;
