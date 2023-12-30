import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}){
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(()=>{
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeName(evt){
    setName(evt.target.value)
  }

  function handleChangeDescription(evt){
    setDescription(evt.target.value)
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  return(
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      required
      minLength="2"
      maxLength="40"
      type="text"
      name="fieldName"
      id="input-name"
      className="popup__input popup__input_type_name"
      placeholder="Имя автора"
      onChange={handleChangeName}
      value={name || ''}
    />
    <span className="popup__error" id="input-name-error">Вы пропустили это поле.</span>
    <input
      required
      minLength="2"
      maxLength="200"
      type="text"
      name="fieldJob"
      id="input-job"
      className="popup__input popup__input_type_job"
      placeholder="Должность автора" 
      onChange={handleChangeDescription}
      value={description || ''}
      />
    <span className="popup__error" id="input-job-error">Вы пропустили это поле.</span>
  </PopupWithForm>
  )
}