import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";
import useWindowSize from "../hooks/useWindowSize";

function Header({ button, username, onLogout }) {
  const size = useWindowSize();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  function handleButtonClick() {
    setIsButtonClicked(!isButtonClicked);
  }
  return (
    <header className="header">
      <img src={logo} alt="Mesto логотип" className="header__logo" />
      {button === "login" && (
        <Link
          to="/sign-in"
          className="header__link header__link_type_login link"
        >
          Войти
        </Link>
      )}
      {button === "register" && (
        <Link
          to="/sign-up"
          className="header__link header__link_type_login link"
        >
          Регистрация
        </Link>
      )}
      {button === "notFound" && (
        <Link to="/" className="header__link header__link_type_login link">
          На главную
        </Link>
      )}
      {button === "isLogged" && (
        <>
          {size.width < 915 && (
            <button
              className={cn("header__menu-button", "button", {
                "header__menu-button_clicked": isButtonClicked,
              })}
              onClick={handleButtonClick}
            />
          )}
          <div
            className={cn("header__text-container", {
              "header__text-container_closed": !isButtonClicked,
            })}
          >
            <span className="header__name">{username}</span>
            <Link
              to="/sign-in"
              className="header__link header__link_type_logout link"
              onClick={onLogout}
            >
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
