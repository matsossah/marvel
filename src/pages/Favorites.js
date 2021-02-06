import React from "react";
import cover from "../assets/marvel-cover.jpg";

const Favorites = (props) => {
  return (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div>Favorites</div>
    </div>
  );
};

export default Favorites;
