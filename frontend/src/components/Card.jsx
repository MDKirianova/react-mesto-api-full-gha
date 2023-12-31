import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="element">
      {isOwn && <button className='element__trash' onClick={handleDeleteClick} />}
      <img className="element__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="element__title-like">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__items-like">
          <button type="button" aria-label="" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
          <span className="element__like-register">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}