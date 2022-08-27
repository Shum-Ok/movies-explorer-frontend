// react
import { NavLink } from 'react-router-dom';
// img
import accountIcon from '../../images/account-icon.svg';
// css
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <input className='navigation__toggle' id='navigation__toggle' type='checkbox' />
      <label className='navigation__btn' htmlFor='navigation__toggle'>
        <span className='navigation__btn-img'></span>
      </label>
      <div className='navigation__container'>
        <ul className='navigation__items'>
          <li className='navigation__item navigation__item_type_main'>
            <NavLink className='navigation__link' to='/'>Главная</NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink className='navigation__link' to='/movies'>Фильмы</NavLink>
          </li>
          <li className='navigation__item'>
            <NavLink className='navigation__link' to='/saved-movies'>Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <div className='navigation__item navigation__item_account'>
          <img className='navigation__link-img' src={accountIcon} alt='Иконка аккауна' />
          <NavLink className='navigation__link navigation__link_account' to='/profile'>Аккаунт</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;