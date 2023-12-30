import React from "react";
import succes_icon from '../images/succes_icon.svg';
import error_icon from '../images/error_icon.svg';

export default function InfoTooltipPopup({ name, isSuccessful, isOpen, onClose }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="Кнопка для скрытия попапа" className="popup__close-btn" onClick={onClose} />
        <img className="popup__tooltip-icon" alt={isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."} src={isSuccessful ? succes_icon : error_icon} />
        <h2 className="popup__subtitle">{isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}</h2>
      </div>
    </div>
  )
}