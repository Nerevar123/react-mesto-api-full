import React from "react";
import cn from "classnames";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="place">
      <div className="place__img-wrapper" onClick={handleClick}>
        <img src={card.link} alt={card.name} className="place__image" />
      </div>
      <div className="place__header">
        <h3 className="place__title">{card.name}</h3>
        <div className="place__like">
          <button
            className={cn("place__like-btn", "button", {
              "place__like-btn_active": isLiked,
            })}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </div>
      <button
        className="place__delete-btn button"
        type="button"
        style={isOwn ? {} : { display: "none" }}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
