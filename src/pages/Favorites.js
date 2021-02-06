import React from "react";
import { Link, useHistory } from "react-router-dom";
import cover from "../assets/marvel-cover.jpg";

const Favorites = (props) => {
  const { isLoading, data } = props;
  let history = useHistory();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div>Favorites</div>
    </div>
  );
};

export default Favorites;
