import './Profile.css';

function Profile() {
  return (
    <section className='profile'>
      <div className='profile__content'>
        <h2 className='profile__title'>Привет, Алексей!</h2>
        <div className='profile__item'>
          <p className='profile__item-value profile__item-value_weight'>Имя</p>
          <p className='profile__item-value'>Алексей</p>
        </div>
        <div className='profile__item'>
          <p className='profile__item-value profile__item-value_weight'>E-mail</p>
          <p className='profile__item-value'>pochta@yandex.ru</p>
        </div>
      </div>
      <div className='profile__nav-link'>
        <a className='profile__link' href='/'>Редактировать</a>
        <a className='profile__link profile__link_out' href='/'>Выйти из аккаунта</a>
      </div>
    </section>
  )
}

export default Profile;