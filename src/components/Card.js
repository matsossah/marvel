import React from "react";

const Card = (props) => {
  const { thumbnail, name, description, handleFavorite, display } = props;
  return (
    <div className="card">
      <img src={thumbnail} alt="thumbnail" />
      <div className="card-body">
        <h2>{name}</h2>
        {description && <p>{description}</p>}
        <div className="card-bottom">
          <h5>LVQM</h5>
          <button className={`favorite ${display}`} onClick={handleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default Card;
