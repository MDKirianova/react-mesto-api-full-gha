export const cardsContainer = '.grid-elements__list';
export const ImagePopup = '.popup-zoom';
export const popupAdd = '.popup_add';
export const popupConfirm = '.popup_confirm';
export const popupProfile = '.popup_profile';
export const popupAvatar = '.popup_avatar';
export const profileTitle = '.profile__info-title';
export const profileSubtitle = '.profile__info-subtitle';
export const profileAvatar = '.profile__avatar';
export const profileClickAvatar = document.querySelector('.profile__element-avatar');
export const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
export const formElementPopupAdd = document.querySelector('.popup__form-element_add');
export const formElementPopupProfile = document.querySelector('.popup__form-element_profile');
export const formElementPopupAvatar = document.querySelector('.popup__form-element_avatar');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const validators = {
  formSelector: '.popup__form-element',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const apiSettings = {
  baseUrl: `${process.env.REACT_APP_API_URL}`,
}; 