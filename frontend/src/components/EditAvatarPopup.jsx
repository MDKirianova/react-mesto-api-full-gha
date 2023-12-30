import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
  const avatarRef = React.useRef();

  React.useEffect(()=>{
    if (!isOpen){
      avatarRef.current.value = ''
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit} 
      >
        <input
          required
          type="url"
          name="fieldAvatar"
          id="input-avatar"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на изображение"
          ref={avatarRef}
          />
        <span className="popup__error" id="input-avatar-error">Вы пропустили это поле.</span>
      </PopupWithForm>
  )
}