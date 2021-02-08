import React, { useEffect, useState } from "react";
import cover from "../assets/marvel-cover.jpg";
import Cookies from "js-cookie";
import Card from "../components/Card.js";

const Favorites = (props) => {
  let cookieFavorites = [];
  if (Cookies.get("userFavorites")) {
    cookieFavorites = JSON.parse(Cookies.get("userFavorites"));
  }

  const [favorites, setFavorites] = useState(cookieFavorites);
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
        console.log(element);
        return (
          <Card
            key={element.id}
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
