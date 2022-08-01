import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header loggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route exact path='/profile'>
          <Header loggedIn={true} />
          <Profile />
        </Route>
        <Route exact path='/saved-movies'>
          <Header loggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header loggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;