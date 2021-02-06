import React from "react";
import cover from "../assets/marvel-cover.jpg";

const Comics = (props) => {
  return (
    <div>
      <div className="cover">
        <img className="cover" src={cover} alt="logo" />
      </div>
      <div>Comics</div>
    </div>
  );
};

export default Comics;
