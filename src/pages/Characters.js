import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";
import Cookies from "js-cookie";

const Characters = (props) => {
  const { isLoading, data, characterSearch, handleCharacterSearch } = props;

  const handleFavorite = (character) => {
    let elem = {
      id: character._id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
    };
    let userFavorites = [];
    if (Cookies.get("userFavorites") !== undefined) {
      userFavorites = [...JSON.parse(Cookies.get("userFavorites"))];
    }

    userFavorites.push(elem);
    var json_str = JSON.stringify(userFavorites);
    Cookies.set("userFavorites", json_str, { expires: 200 });
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
          value={characterSearch}
          placeholder="Search..."
          onChange={(event) => {
            handleCharacterSearch(event);
          }}
        />
      </div>
      <div className="cards">
        {data.map((character, index) => {
          return (
            <Link to={`/comics/${character._id}`} key={character._id}>
              <Card
                name={character.name}
                description={character.description}
                handleFavorite={() => handleFavorite(character)}
                thumbnail={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
