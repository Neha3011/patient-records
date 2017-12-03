import React from 'react';
import { Link } from 'react-router-dom';

const headerImg = require('../../images/pharmeasy.png');

const Header = () => {
  return (
    <div className="pharm__header">
      <img src={headerImg} alt="header img" />
      <Link to="/"> Logout </Link>
    </div>
  );
};

export default Header;
