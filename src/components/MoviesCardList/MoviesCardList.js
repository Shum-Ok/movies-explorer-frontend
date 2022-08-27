// react
import { useLocation } from 'react-router-dom';
// components
import MoviesCard from '../MoviesCard/MoviesCard';
// css
import './MoviesCardList.css';

function MoviesCardList ({ movies, saveMovies, savedMoviesToggle, handleMore, moviesMore }) {
  const { pathname } = useLocation()

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__items'>
        { movies.length > 0 ? (
          movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              saveMovies={saveMovies}
              savedMoviesToggle={savedMoviesToggle}
            />
          ))
        ) : (
          <div className='movies-card-list__text'>Ничего не найдено</div>
        )}
      </div>

      { moviesMore.length > 0 &&  pathname !== '/saved-movies' ? (
          <button
            className='movies-card-list__button'
            type='button'
            name='more'
            onClick={handleMore} >Ещё</button>
      ) : ''}
    </section>
  );
};

export default MoviesCardList;