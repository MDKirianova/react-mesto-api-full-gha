import React from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from './../utils/Api.js';
import * as auth from "../utils/Auth.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import InfoTooltipPopup from "./InfoTooltipPopup.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const navigate = useNavigate();


  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, user]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка при получении профиля пользователя или массива карточек: ${err}`);
        });
    }
  }, [loggedIn]);

  const handleTokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getData(jwt)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.email);
          navigate('/', { replace: true })
        })
        .catch((err) => {
          console.log(`Ошибка получения токена: ${err}`);
        })
    }
  }, [navigate]);

  React.useEffect(() => {
    handleTokenCheck()
  },[handleTokenCheck]);

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(true);
        navigate('/sign-in', { replace: true })
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(false);

      })
      .finally(handleInfoTooltip);
  }

  const handleAuthorize = (email, password) => {
    auth.login(email, password)
      .then((jwt) => {
        if (jwt) {
          setLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true })
        }
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(false);
        handleInfoTooltip();
      })
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    selectedCard && setSelectedCard({});
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.includes(currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка при установке или снятии лайка на карточке: ${err}`);
      });
  }

  const handleCardDelete = (cardId) => {
    api.deleteMyCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      });
  }

  const handleUpdateUser = (data) => {
    api.setUserInfo(data.name, data.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании профиля пользователя: ${err}`);
      });
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при изменении аватарки: ${err}`);
      });
  }

  const handleAddPlaceSubmit = (data) => {
    api.createNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении новой карточки: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path="sign-up" element={
            <>
              <Header
                title="Войти"
                route="/sign-in" />
              <Register onRegister={handleRegister} />
            </>
          } ></Route>
          <Route path="sign-in" element={
            <>
              <Header
                title="Регистрация"
                route="/sign-up" />
              <Login onLogin={handleAuthorize} />
            </>
          } ></Route>
          <Route path="/*" element={loggedIn ? (<Navigate to="/" replace />) : (<Navigate to="/sign-in" replace />)} ></Route>
          <Route path="/" element={
            <>
              <Header
                title="Выйти"
                route="/sign-in"
                onSignOut={signOut}
                email={email}
              />
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards} />
              <Footer />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
              <PopupWithForm
                name="confirm"
                title="Вы уверены?"
                buttonText="Да"
                onClose={closeAllPopups}
              >
              </PopupWithForm>
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </>
          } ></Route>
        </Routes>
        <InfoTooltipPopup
          isSuccessful={isSuccessful}
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          name='tooltip'
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
