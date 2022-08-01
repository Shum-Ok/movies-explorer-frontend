import './AboutMe.css';
import authorImg from '../../images/me.JPG';

function AboutMe() {
  return (
    <section className='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <img className='about-me__img' src={authorImg} alt='Фотография автора' />
      <h4 className='about-me__name'>Алексей</h4>
      <p className='about-me__jop'>Фронтенд-разработчик, 30 лет</p>
      <p className='about-me__about'>Я родился в Хабаровске, сейчси живу в Воронеже. Я люблю слушать музыку, а ещё нравится ремонтировать машины. Недавно начал кодить. Работал в разных компаниях, от мала до велика. После того, как пройду курс по веб-разработке, начну заниматься фриланс-заказами и хочу уйти с постоянной работы.</p>
      <ul className='about-me__link-soc'>
        <li className='about-me__link-soc_item'><a className='about-me__link' href='https://vk.com' target='_blank' rel='noreferrer'>VK</a></li>
        <li className='about-me__link-soc_item'><a className='about-me__link' href='https://github.com/Shum-Ok/' target='_blank' rel='noreferrer'>GitHub</a></li>
      </ul>
    </section>
  );
};

export default AboutMe;