import React from "react";

const Card = (props) => {
  const { thumbnail, name, description, handleFavorite, display } = props;
  return (
    <div className="card">
      <img src={thumbnail} alt="thumbnail" />
      <div className="card-body">
        <div className="card-top">
          <h2>{name}</h2>
          {description && <p>{description}</p>}
        </div>

        <div className="card-bottom">
          <h5>LVQM</h5>
          <button className={`favorite ${display}`} onClick={handleFavorite}>
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
