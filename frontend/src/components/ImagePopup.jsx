export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-zoom ${card.link ? "popup_opened" : ""}`}>
      <div className="popup-zoom__container">
        <button type="reset" aria-label="Кнопка для скрытия попапа" className="popup__close-btn" onClick={onClose}></button>
        <img className="popup-zoom__image" alt={card.name} src={card.link} />
        <p className="popup-zoom__text">{card.name}</p></div>
    </div>
  )
}