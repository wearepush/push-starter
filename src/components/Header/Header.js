import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <header className="header">
    <div className="header__container">
      <Link className="header__link" to="/">
        Home
      </Link>
      <Link className="header__link" to="/users">
        Users
      </Link>
    </div>
  </header>
);

export default Header;
