// react
import { useState, useEffect } from 'react';
// components
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
// utils
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
// css
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState(null)
  const [saveMovies, setSaveMovies] = useState([])
  const [moviesTumbler, setMoviesTumbler] = useState(false)
  const [moviesInputSearch, setMoviesInputSearch] = useState('')
  const [moviesShowed, setMoviesShowed] = useState([])
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([])
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([])

  const [MoviesCount, setMoviesCount] = useState([])
  const [errorText, setErrorText] = useState('')
  const [preloader, setPreloader] = useState(false)

  useEffect(() => {
    setMoviesCount(getMoviesCount())
    const handlerResize = () => setMoviesCount(getMoviesCount())
    window.addEventListener('resize', handlerResize)

    return () => {
      window.removeEventListener('resize', handlerResize)
    };
  }, [])

  useEffect(() => {
    mainApi.getMovies()
      .then(data => {
        setSaveMovies(data)
      })
      .catch((err) => {
        console.log('Ошибка при запросе ', err)
      });

    const localStorageMovies = localStorage.getItem('movies')

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies)
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]))
      setMovies(filterData)
      setPreloader(false)
    }

    const localStorageMoviesTumbler = localStorage.getItem('moviesTumbler')
    const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch')

    if (localStorageMoviesTumbler) {
      setMoviesTumbler(localStorageMoviesTumbler === 'true')
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch)
    }
  }, [])

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth
    const MoviesCountConfig = {
      '1200': [12, 3],
      '900': [9, 3],
      '768': [8, 2],
      '240': [5, 2],
    }
    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key]
        }
      });

    return countCards
  }

  async function savedMoviesToggle(movies, favorite) {
    if (favorite) {
      const objMovies = {
        image: `https://api.nomoreparties.co${movies.image.url}`,
        trailerLink: movies.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movies.image.url}`,
        movieId: movies.id,
        country: movies.country || 'Неизвестно',
        director: movies.director,
        duration: movies.duration,
        year: movies.year,
        description: movies.description,
        nameRU: movies.nameRU,
        nameEN: movies.nameEN,
      }
      try {
        await mainApi.addMovie(objMovies)
        const newSaved = await mainApi.getMovies()
        setSaveMovies(newSaved)
      } catch (err) {
        console.log('Ошибка', err)
      }
    } else {
      try {
        await mainApi.deleteMovie(movies._id)
        const newSaved = await mainApi.getMovies()
        setSaveMovies(newSaved)
      } catch (err) {
        console.log('Ошибка', err)
      }
    }
  }

  function handleGetMovies(inputSearch) {
    setMoviesTumbler(false)
    localStorage.setItem('moviesTumbler', false)
    if (!inputSearch) {
      setErrorText('Ошибка')
      return false
    }
    setErrorText('')
    setPreloader(true)

    moviesApi.getMovies()
      .then(data => {
        let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()))

        localStorage.setItem('movies', JSON.stringify(filterData))
        localStorage.setItem('moviesInputSearch', inputSearch)

        const spliceData = filterData.splice(0, MoviesCount[0])

        setMoviesShowed(spliceData)
        setMovies(filterData)
        setMoviesShowedWithTumbler(spliceData)
        setMoviesWithTumbler(filterData)
      })
      .catch(err => {
        setErrorText('Ошибка')

        setMovies([])
        localStorage.removeItem('movies')
        localStorage.removeItem('moviesTumbler')
        localStorage.removeItem('moviesInputSearch')
      })
      .finally(() => {
        setPreloader(false)
      })
  }

  function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = []
    let filterData = []

    if (tumbler) {
      setMoviesShowedWithTumbler(moviesShowed)
      setMoviesWithTumbler(movies)
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40)
      filterData = movies.filter(({ duration }) => duration <= 40)
    } else {
      filterDataShowed = moviesShowedWithTumbler
      filterData = moviesWithTumbler
    }

    setMoviesShowed(filterDataShowed)
    setMovies(filterData)
  }

  function handleMore() {
    const spliceMovies = movies
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, MoviesCount[1]))
    setMoviesShowed(newMoviesShowed)
    setMovies(spliceMovies)
  }

  return (
    <section className='movies'>
      <SearchForm
        handleGetMovies={handleGetMovies}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
      />
      <div className='movies__border'></div>
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && saveMovies !== null && moviesShowed !== null && (
        <MoviesCardList
          movies={moviesShowed}
          saveMovies={saveMovies}
          handleMore={handleMore}
          savedMoviesToggle={savedMoviesToggle}
          moviesMore={movies}
        />
      )}
    </section>
  );
};

export default Movies;