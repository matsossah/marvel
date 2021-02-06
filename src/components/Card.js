import React from "react";

const Card = (props) => {
  const { thumbnail, name, description } = props;
  return (
    <div className="card">
      <img src={thumbnail} alt="thumbnail" />
      <div className="card-body">
        <h2>{name}</h2>
        {description && <p>{description}</p>}
        <h5>LVQM</h5>
      </div>
    </div>
  );
};

export default Card;
