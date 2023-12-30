import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}){
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");
  
  React.useEffect(()=>{
    if (!isOpen){
      setPlace('');
      setLink('');
    }
  }, [isOpen])

  function handleChangePlace(evt) {
    setPlace(evt.target.value)
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onAddPlace({
      name: place,
      link,
    });
  }

    return(
      <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        type="text"
        name="fieldTitle"
        id="input-title"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        onChange={handleChangePlace}
        value={place}
        />
      <span className="popup__error" id="input-title-error"></span>
      <input
        required
        type="url"
        name="fieldLink"
        id="input-link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку" 
        onChange={handleChangeLink}
        value={link}/>
      <span className="popup__error" id="input-link-error"></span>
    </PopupWithForm>
    )
}