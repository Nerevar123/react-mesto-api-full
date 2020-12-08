import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  if (props.cards.length === 0) {
    return (
      <section className="profile">
        <h1 className="profile__loading">Загрузка...</h1>
      </section>
    );
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-box">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar button"
          />
          <button
            className="profile__avatar-btn button"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__title">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__desc">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteClick={props.onDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
