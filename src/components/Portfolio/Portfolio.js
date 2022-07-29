import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a class='portfolio__link' href="https://shum-ok.github.io/how-to-learn/" target='_blank' rel='noreferrer'>Статичный сайт</a>
        </li>
        <li className='portfolio__list-item'>
          <a class='portfolio__link' href='https://shum-ok.github.io/yet-another-project/' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
        </li>
        <li className='portfolio__list-item'>
          <a class='portfolio__link' href='https://zubkov.nomoredomains.xyz/' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;