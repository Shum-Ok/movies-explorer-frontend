// react
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation, withRouter } from 'react-router-dom';
// context
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// components
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
// utils
import mainApi from '../../utils/MainApi';
// css
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
  const [messageError, setMessageError] = useState(false)

  const history = useHistory()
  const { pathname } = useLocation()

  useEffect(() => {
    handlTokenCheck()
  }, [])

  // проверка токена
  function handlTokenCheck() {
    const token = localStorage.getItem('token')

    if(token) {
      mainApi.tokenValid(token)
        .then((user) => {
          if(user) {
            setCurrentUser(user)
            setLoggedIn(true)
          } else {
            setLoggedIn(false)
          }
        })
        .catch((err) => {
          console.log('Ошибка при провеке токена ', err);
        });
      }
  }
  // регистрация
  function handleRegister(password, email, name) {
    mainApi.register(password, email, name)
      .then(user => {
        if(user) {
          handleLogin(password, user.email)
        }
      })
      .catch(setMessageError(true))
  }
  // логирование
  function handleLogin(password, email) {
    mainApi.login(password, email)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token)
          mainApi.updateToken()
          setLoggedIn(true)
          handlTokenCheck()
          history.push('/movies')
        } else {
          setMessageError(true)
        }
      })
      .catch((err) => console.log('Ошибка при провеке авторизации ', err))
  }

  function onSignOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('movies')
    localStorage.removeItem('moviesTumbler')
    localStorage.removeItem('moviesInputSearch')
    localStorage.removeItem('savedMoviesTumbler')
    localStorage.removeItem('savedMoviesInputSearch')
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {pathname === '/' || pathname === '/profile' || pathname === '/movies' || pathname === '/saved-movies'  ?
          <Header loggedIn={!loggedIn} /> : ''}
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={!loggedIn}
            component={Movies}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={!loggedIn}
            component={SavedMovies}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={!loggedIn}
            component={Profile}
            onSignOut={onSignOut}
          />

          <Route path='/signup'>
            {!loggedIn ? <Register onRegister={handleRegister} textError={messageError} /> : <Redirect to='/movies' />}
          </Route>

          <Route path='/signin'>
            {!loggedIn ? <Login onLogin={handleLogin} /> : <Redirect to='/movies' />}
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);