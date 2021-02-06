import React from "react";
import { Link } from "react-router-dom";
import cover from "../assets/marvel-cover.jpg";
import Card from "../components/Card.js";

const Home = (props) => {
  const { isLoading, data } = props;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div className="cards">
        {data.map((character, index) => {
          return (
            <Link to={`/comics/${character._id}`} key={character._id}>
              <Card
                name={character.name}
                description={character.description}
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

export default Home;
