import React from "react";
import { useLocation, Link } from "react-router-dom";
import header__logo from "./../images/header/__logo/header__logo.svg";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={header__logo} alt="логотип" />

      {location.pathname === "/" && (
        <div className="header__logged">
          <p className="header__email">{props.email}</p>
          {/* eslint-disable-next-line-jsx-ally/anchor-is-valid */}
          <a className="header__link" onClick={props.onSignout}>
            Выйти
          </a>
        </div>
      )}
      {location.pathname === "/signup" && (
        <Link to="/signin" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/signin" && (
        <Link to="/signup" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;

