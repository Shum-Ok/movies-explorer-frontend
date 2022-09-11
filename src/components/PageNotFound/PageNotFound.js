// react
import { useHistory } from 'react-router-dom';
// css
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory()

  function goToBack() {
    history.goBack()
  }

  return (
    <section className='not-found'>
      <div className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <button onClick={goToBack} className='not-found__link'>Назад</button>
    </section>
  );
};

export default PageNotFound;