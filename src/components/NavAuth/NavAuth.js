// react
import { Link } from 'react-router-dom';
// css
import './NavAuth.css';

function NavAuth() {
  return (
    <div className='auth'>
      <a className='auth__signup' href='/signup'>Регистрация</a>
      <a className='auth__signin' href='/signin'>Войти</a>
    </div>
  );
}

export default NavAuth;