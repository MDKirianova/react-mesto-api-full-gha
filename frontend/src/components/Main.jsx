import React from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";



export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__autor">
          <div className="profile__element-avatar" onClick={onEditAvatar}>
            <img src={avatar} alt="Аватарка автора" className="profile__avatar" />
          </div>
          <div className="profile__info">
            <div className="profile__title-button">
              <h1 className="profile__info-title">{name}</h1>
              <button aria-label="Кнопка редатирования профиля" className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__info-subtitle">{about}</p>
          </div>
        </div>
        <button aria-label="Кнопка добавления" className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="grid-elements">
        <ul className="grid-elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  )
}