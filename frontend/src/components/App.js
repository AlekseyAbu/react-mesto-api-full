import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from './contexts.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as mestoAuth from '../mestoAuth.js';
import { getToken, setToken, removeToken } from '../utils/token.js';
import InfoTooltip from './InfoTooltip.js';



function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [dataCards, setDataCards] = React.useState([]);
  const [isInfoTooltip, setisInfoTooltip] = useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleClosePopup() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisInfoTooltip(false);
    setSelectedCard({});

  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.creatProfile(data).then((res) => {
      setCurrentUser(res)
      console.log(res)
      setIsEditProfilePopupOpen(false);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.creatAvatar(avatar).then((res) => {
      setCurrentUser(res)
      console.log(res)
      setIsEditAvatarPopupOpen(false);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    const token = getToken();
    api.createInitialCards(data, token).then(res => {
      setDataCards([res, ...dataCards]);
      setIsAddPlacePopupOpen(false);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    const token = getToken();
    api.deletInitialCards(id, token).then(() => {

      const newDataCards = dataCards.filter((item) => item._id !== id);

      setDataCards(newDataCards);
    })
      .catch(err => console.error(err))
  }

  function handleCardLike(card) {
    api.likeCard(card._id).then((newCard) => {
      const newDataCards = dataCards.map((item) => item._id !== card._id ? item : newCard);
      setDataCards(newDataCards);
    })
      .catch(err => console.error(err))
  }

  function handleCardDislike(card) {
    api.dislikeCard(card._id).then((newCard) => {
      const newDataCards = dataCards.map((item) => item._id !== card._id ? item : newCard);
      setDataCards(newDataCards);
    })
      .catch(err => console.error(err))
  }

  // useEffect(() => {
  //   const token = getToken();
  //   console.log("token")
  //   api.getAppInfo(token).then((res) => {
  //     const [initialCard, profileData] = res;
  //     setCurrentUser(profileData)
  //     setDataCards(initialCard)
  //   })
  //     .catch(err => console.error(err))
  // }, [])

  function startInfo() {
    const token = getToken();
    console.log("token")
    api.getAppInfo(token).then((res) => {
      const [initialCard, profileData] = res;
      setCurrentUser(profileData)
      setDataCards(initialCard)
    })
      .catch(err => console.error(err))
  }

  //Ниже 14 проектная

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();
  const [status, setStatus] = useState('');

  const handleLogin = (userData) => {
    setUserData(userData);
    setLoggedIn(true);
  }

  const tokenCheck = () => {
    const jwt = getToken();
    console.log(jwt)

    if (!jwt) {
      removeToken(jwt);
      return;
    }

    mestoAuth.getContent(jwt)
    .then((res) => {
      if (res) {
        console.log(res)
        const userData = {

          email: res.email
        }
        setLoggedIn(true);
        setUserData(userData);
        history.push('/')
      }
    })
    .catch(err => console.log(err))
  }

console.log(localStorage)

  const authorizeMesto = (data) => {
    const { email, password } = data;
    console.log(data)
    console.log('hay')
    mestoAuth.authorize(email, password)
      .then((data) => {
        if (!data) {
          setMessage('Что-то пошло не так!')
        }
        if (data.token) {
          setToken(data.token);
          setUserData({ username: '', password: '' });
          setMessage('');
          handleLogin(data.token);
          startInfo()
          console.log()
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  const registerMesto = (data) => {
    const { email, password } = data;
    mestoAuth.register(email, password)
      .then((res) => {      
        if (res.status !== 400) {
          setMessage('');
          setisInfoTooltip(true);
          setStatus('successfully');
          history.push('/signin');
        } else {
          setMessage('Что-то пошло не так!')
          console.log('hey')
          setisInfoTooltip(true);
          setStatus('unsuccessful');
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header loggedIn={loggedIn} />

        <Switch>
          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            isPlace={isAddPlacePopupOpen}
            isAvatar={isEditAvatarPopupOpen}
            onEditAvatar={handleEditAvatarClick}
            dataCard={dataCards}
            onCardClick={handleCardClick}
            card={selectedCard}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            component={Main}
          />

          <Route path="/signin">

            <Login handleLogin={handleLogin}
              authorizeMesto={authorizeMesto}
            />


          </Route>
          <Route path='/signup'>
            <Register registerMesto={registerMesto} />
          </Route>
        </Switch>
        <ImagePopup card={selectedCard}
          onClose={handleClosePopup}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={handleClosePopup}
          onSubmitHandler={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={handleClosePopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={handleClosePopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isInfoTooltip={isInfoTooltip}
          status={status}
          isClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;

{/* <Switch>
          {/* <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route> */}
        //   <Route path="/signin">
        //     <Login /*onLogin={onLogin}*/ />
        //   </Route>
        // </Switch> */}