import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();
  const [isSuccess, setSuccess] = React.useState(false);

  const checkToken = React.useCallback(() => {
    auth.checkToken()
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        setEmail(data.email);
        history.push('/');
      } else {
        setSuccess(false);
        setIsInfoTooltipOpen(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [history])

  React.useEffect(() => {
    checkToken();
  }, [checkToken])

  React.useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((result) => {
        setCurrentUser(result[0]);
        setCards(result[1].reverse());
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((resolve) => {
        setCards(() => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api
      .newAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        history.push("/signin");
        setSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    auth
    .signOut()
    .then((res) => {
    setEmail("");
    setLoggedIn(false);
    history.push("/signin");
    })
    .catch((err) => {
      console.error(err);
      setSuccess(false);
      setIsInfoTooltipOpen(true);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__container">
          <Header loggedIn={loggedIn} email={email} onSignout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route> {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}</Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={isSuccess} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
