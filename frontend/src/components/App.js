import React from "react";
import { Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ClosablePopup from "./hocs/ClosablePopup";
import ProtectedRoute from "./hocs/ProtectedRoute";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";
import { CSSTransition } from "react-transition-group";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmClick] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    Promise.all([api.getInitCards(), api.getUserInfo(), handleCookiesCheck()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleDeleteClick(card) {
    setConfirmClick(true);
    setDeletedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegisterClick() {
    if (isSuccess) {
      history.push("/login");
    }
    closeAllPopups();
  }

  function handleLogin() {
    setIsLoggedIn(true);
    history.push("/");
  }

  function handleCookiesCheck() {
    api
      .checkCookies()
      .then(() => {
        handleLogin();
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }

  function handleAuthorize(user) {
    api
      .authorize(user)
      .then(() => {
        handleLogin();
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  }

  function handleRegister(user) {
    api
      .register(user)
      .then(() => {
        setIsSuccess(true);
        setRegisterClick(true);
      })
      .catch((err) => {
        setRegisterClick(true);
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  }

  function handleLogout() {
    api
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    setIsSaving(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api
      .patchUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api
      .patchAvatar(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(card) {
    setIsSaving(true);
    api
      .addCard(card)
      .then((card) => setCards([...cards, card]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function closeAllPopups() {
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setEditAvatarClick(false);
    setConfirmClick(false);
    setRegisterClick(false);
    setSelectedCard({});
    setDeletedCard({});
    setIsSaving(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 500);
  }

  if (isLoggedIn === null) {
    return (
      <>
        <section className="profile">
          <h1 className="profile__loading">Загрузка...</h1>
        </section>
      </>
    );
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Router history={history} basename="/">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
              <>
                <Header
                  button="isLogged"
                  username={currentUser.email}
                  onLogout={handleLogout}
                />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onDeleteClick={handleDeleteClick}
                />
                <Footer />
              </>
            </ProtectedRoute>
            <Route exact path="/sign-up">
              <>
                <Header button="login" />
                <Register
                  validation={validation}
                  onRegister={handleRegister}
                  isOpen={isRegisterPopupOpen}
                  onClose={handleRegisterClick}
                  isSuccess={isSuccess}
                />
              </>
            </Route>
            <Route exact path="/login">
              <>
                <Header button="register" />
                <Login onAuthorize={handleAuthorize} validation={validation} />
              </>
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
            </Route>
          </Switch>
          <CSSTransition
            nodeRef={nodeRef}
            in={isEditProfilePopupOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ClosablePopup>
              <EditProfilePopup
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isSaving={isSaving}
                validation={validation}
                refs={nodeRef}
              />
            </ClosablePopup>
          </CSSTransition>
          <CSSTransition
            nodeRef={nodeRef}
            in={isAddPlacePopupOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ClosablePopup>
              <AddPlacePopup
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isSaving={isSaving}
                validation={validation}
                refs={nodeRef}
              />
            </ClosablePopup>
          </CSSTransition>
          <CSSTransition
            nodeRef={nodeRef}
            in={isEditAvatarPopupOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ClosablePopup>
              <EditAvatarPopup
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isSaving={isSaving}
                validation={validation}
                refs={nodeRef}
              />
            </ClosablePopup>
          </CSSTransition>
          <CSSTransition
            nodeRef={nodeRef}
            in={Boolean(selectedCard.link)}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ClosablePopup>
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                refs={nodeRef}
              />
            </ClosablePopup>
          </CSSTransition>
          <CSSTransition
            nodeRef={nodeRef}
            in={isConfirmPopupOpen}
            timeout={300}
            classNames="modal"
            unmountOnExit
          >
            <ClosablePopup>
              <ConfirmPopup
                onClose={closeAllPopups}
                onConfirm={handleCardDelete}
                isSaving={isSaving}
                refs={nodeRef}
              />
            </ClosablePopup>
          </CSSTransition>
        </Router>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
