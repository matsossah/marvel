import React from "react";
import { Link, useHistory } from "react-router-dom";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";

const Home = (props) => {
  const { isLoading, data } = props;
  let history = useHistory();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div className="cards">
        {data.map((character, index) => {
          console.log(
            character.thumbnail.path + "." + character.thumbnail.extension
          );
          return (
            <Card
              key={character._id}
              name={character.name}
              description={character.description}
              thumbnail={
                character.thumbnail.path + "." + character.thumbnail.extension
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
