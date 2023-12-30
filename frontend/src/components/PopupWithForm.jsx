import React from "react";
export default function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="Кнопка для скрытия попапа" className="popup__close-btn" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form-element popup__form-element_${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__save-btn popup__save-btn_${name}`} >{buttonText}</button>
        </form>
      </div>
    </div>
  )
}