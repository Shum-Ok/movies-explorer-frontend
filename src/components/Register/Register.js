import './Register.css';
import logo from '../../images/logo.png';


function Register() {
  return (
    <div className='register'>
      <div className='register__content'>
      <img className='register__logo' src={logo} alt='Логотип' />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='form' method="post">
          <label className='form__label'>Имя</label>
          <input className='form__input' type='text' required />
          <span className='form__input-error'>Что-то пошло не так...</span>
          <label className='form__label'>E-mail</label>
          <input className='form__input' type='email' required />
          <span className='form__input-error'>Что-то пошло не так...</span>
          <label className='form__label'>Пароль</label>
          <input className='form__input' type='password' required />
          <span className='form__input-error'>Что-то пошло не так...</span>
          <button className='form__submit' type='submit'>Зарегистрироваться</button>
          <p className='form__text'>Уже зарегистрированы? <a href='/signup' className='form__link'>Войти</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;