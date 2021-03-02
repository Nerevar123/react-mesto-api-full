import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";
import useWindowSize from "../hooks/useWindowSize";
import { TranslationContext } from "../contexts/TranslationContext";

function Header({ button, username, onLogout, lang, setLang }) {
  const size = useWindowSize();
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const translation = React.useContext(TranslationContext);

  function handleButtonClick() {
    setIsButtonClicked(!isButtonClicked);
  }

  function handleMenuClick() {
    setMenuOpen(!isMenuOpen);
  }

  function handleLangClick(lang) {
    setLang(lang);
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <img src={logo} alt="Mesto логотип" className="header__logo" />
      <div className="header__info">
        <div
          class={`lang ${isMenuOpen ? "open" : ""}`}
          onClick={handleMenuClick}
        >
          <div class="lang__trigger">
            <span>{lang === "en" ? "Eng" : "Ru"}</span>
            <div class="lang__arrow"></div>
          </div>
          <div class="lang__options">
            <span class="lang__option" onClick={() => handleLangClick("en")}>
              English
            </span>
            <span class="lang__option" onClick={() => handleLangClick("ru")}>
              Русский
            </span>
          </div>
        </div>
        {button === "login" && (
          <Link
            to="/sign-in"
            className="header__link header__link_type_login link"
          >
            {translation.loginButton}
          </Link>
        )}
        {button === "register" && (
          <Link
            to="/sign-up"
            className="header__link header__link_type_login link"
          >
            {translation.registerButton}
          </Link>
        )}
        {button === "notFound" && (
          <Link to="/" className="header__link header__link_type_login link">
            {translation.toMain}
          </Link>
        )}
        {button === "isLogged" && (
          <>
            {size.width > 914 && (
              <>
                <span className="header__name">{username}</span>
                <Link
                  to="/sign-in"
                  className="header__link header__link_type_logout link"
                  onClick={onLogout}
                >
                  {translation.logout}
                </Link>
              </>
            )}
          </>
        )}
      </div>
      {size.width < 915 && (
          <>
            {button === "isLogged" && (
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
                {translation.logout}
              </Link>
            </div>
          </>
        )}
    </header>
  );
}

export default Header;
