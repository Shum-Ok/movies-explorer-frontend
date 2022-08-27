// react
import { Link, useLocation } from 'react-router-dom';
// component
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';
// images
import logo from '../../images/logo.png';
import accountIcon from '../../images/account-icon.svg';
// css
import './Header.css';

function Header({ loggedIn }) {
  const { pathname } = useLocation()

  return (
    <header className={`header ${pathname === '/' ? 'header_type_auth' : '' }`}>
      <Link to='/'>
        <img className='header__logo' src={logo} alt='Логотип Movies Explorer'></img>
      </Link>
      {loggedIn
        ? <NavAuth />
        : <><Navigation />
          <Link className='header__link header__link_account' to='/profile'>
            <img className='header__img' src={accountIcon} alt='' /> Аккаунт
          </Link></>
      }
    </header>
  );
};

export default Header;