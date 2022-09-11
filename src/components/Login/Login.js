// react
import { useState } from 'react';
import { Link } from 'react-router-dom';
// css
import './Login.css';
import '../Form/Form.css';
// img
import logo from '../../images/logo.png';


function Login({ onLogin, textError }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  function handleChange(e) {
    const {name, value} = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
    setErrors({...errors, [name]: e.target.validationMessage })
    setIsValid(e.target.closest('form').checkValidity())
  }

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(formValues.password, formValues.email)
  }

  return (
    <div className='login'>
      <div className='login__content'>
      <a href='/'><img className='login__logo' src={logo} alt='Логотип' /></a>
        <h2 className='login__title'>Рады видеть!</h2>
        <form onSubmit={handleSubmit} className='form' method='post' noValidate>
          <label className='form__label'>E-mail</label>
          <input
            onChange={handleChange}
            value={formValues.email || ''}
            name='email'
            type='email'
            className='form__input'
            required />
          <span className={`form__input-error ${errors.email ? 'form__input-error_show' : ''}`}>{errors.email}</span>
          <label className='form__label'>Пароль</label>
          <input
            onChange={handleChange}
            value={formValues.password || ''}
            minLength='6'
            name='password'
            type='password'
            className='form__input'
            required />
          <span className={`form__input-error ${errors.password ? 'form__input-error_show' : ''}`}>{errors.password}</span>
          <div className='form__submit-items'>
            <span className={`form__input-error ${textError ? 'form__input-error_show' : ''}`}>{textError}</span>
            <button className={`form__submit ${!isValid ? 'form__submit_disabled' : ''}`} type='submit' disabled={!isValid}>Войти</button>
          </div>
          <p className='form__text'>Ещё не зарегистрированы?
            <Link to='./signup' className='form__link'>
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;