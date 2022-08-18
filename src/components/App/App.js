import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import components
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
// HOC
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import utils
import mainApi from '../../utils/MainApi';

function App() {
  const history = useHistory()

  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);

  const [messageError, setMessageError] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    handlTokenCheck();
  }, []);

  // проверка токена
  function handlTokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      mainApi
        .tokenValid(token)
        .then((user) => {
          if(user) {
            setLoggedIn(true);
            setCurrentUser(user);
            mainApi.updateToken();
          }
          console.log('user =>', user)
        })
        .catch((err) => {
          console.log('err =>', err);
        });
      }
  }
  // регистрация
  function handleRegister(password, email, name) {
    mainApi
      .register(password, email, name)
      .then(user => {
        console.log('user = ', user)
        if(user) {
          console.log('Успешно зарегистриоровались')
          console.log('Сразу идет авторизация')
          handleLogin(password, user.email)
        }
      })
      .catch(setMessageError({
        text: 'Такой E-mail уже занят'
      }))
      // .finally(() => setIsInfoTooltipPopupOpen(true)) // что делать в любои случае
  }
  // логирование
  function handleLogin(password, email) {
    mainApi
      .login(password, email) // при логировании сервер возвращает чисто токен
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token)
          setCurrentUser(null)
          handlTokenCheck()
          console.log('Успешно авторизовались и перенаправлено на страницу movies')
        } else {
          setMessageError({
            text: 'Что-то пошло не так! Попробуйте ещё раз.'
          })
        }
      })
      .catch((err) => console.log('err =><', err))
  }

  function onSignOut() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    history.push('/')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header loggedIn={loggedIn} /> : ''}
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            component={Movies}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMovies}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={onSignOut}
          />

          <Route path='/signup'>
            {!loggedIn ? <Register onRegister={handleRegister} textError={messageError.text} /> : <Redirect to='/movies' />}
          </Route>
          {/* <Route exact path='/signup'>
            <Register onRegister={handleRegister} textError={messageError.text} />
          </Route> */}
          <Route path='/signin'>
            {!loggedIn ? <Login onLogin={handleLogin} /> : <Redirect to='/movies' />}
          </Route>
          {/* <Route exact path='/signin'>
            <Login onLogin={handleLogin} textError={messageError.text} />
          </Route> */}

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;