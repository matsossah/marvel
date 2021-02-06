import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const {
    logo,
    title,
    handleTitle,
    sort,
    handlePriceSort,
    limit,
    handleLimit,
    skip,
    handleSkip,
  } = props;
  return (
    <header>
      <div className="headerNav">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="headerLink">
          <p>Characters</p>
        </Link>
        <Link to="/comics" className="headerLink">
          <p>Comics</p>
        </Link>
        <Link to="/favorites" className="headerLink">
          <p>Favorites</p>
        </Link>
      </div>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Search..."
          onChange={(event) => {
            handleTitle(event);
          }}
        />
      </div>
    </header>
  );
};

export default Header;
