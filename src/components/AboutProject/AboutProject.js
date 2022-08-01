import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
      <h3 className='about-project__title'>О проекте</h3>
      <ul className='about-project__list'>
        <li className='about-project__list-element'>
          <h4 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h4>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about-project__list-element'>
          <h4 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h4>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <ul className='about-project__time-info'>
        <li className='about-project__time-info-element'>
          <p className='about-project__time about-project__time_color'>1 неделя</p>
          <p className='about-project__webwork'>Back-end</p>
        </li>
        <li className='about-project__time-info-element'>
          <p className='about-project__time about-project__time_size'>4 недели</p>
          <p className='about-project__webwork'>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;