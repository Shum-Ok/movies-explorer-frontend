import './Promo.css';
import imgErth from '../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <div className='promo'>
      <div>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href='/' className='promo__link'>Узнать больше</a>
      </div>
      <img className='promo__img' src={imgErth} alt='Картинка в виде Земного шара' />
    </div>
  );
};

export default Promo;