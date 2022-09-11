// react
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// utils
import mainApi from '../../utils/MainApi';
// css
import './Profile.css';

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext)
  const [userName, setUserName] = useState(currentUser.name)
  const [newUserName, setNewUserName] = useState(currentUser.name)
  const [userEmail, setUserEmail] = useState(currentUser.email)
  const [newUserEmail, setNewUserEmail] = useState(currentUser.email)
  const [textInfo, setTextInfo] = useState(null)
  const [isVisibleButton, setVisibleButton] = useState(false)

  function handelSubmit(e) {
    e.preventDefault()

    mainApi.setUserInfo(newUserName, newUserEmail)
      .then((res) => {
        setVisibleButton(false)
        setUserName(newUserName)
        setUserEmail(newUserEmail)
        setTextInfo('Данные успешно изменены.')
      })
      .catch(err => {
        setTextInfo('Что то пошло не так.')
        console.log('Ошибка сохранения данных ', err)
      })
  }

  function handleNameChange(e) {
    const name = e.target.value
    setNewUserName(name)

    if(name !== userName) {
      setVisibleButton(true)
    } else {
      setVisibleButton(false)
    }
  }

  function handleEmailChange(e) {
    const email = e.target.value
    setNewUserEmail(email)

    if(email !== userEmail) {
      setVisibleButton(true)
    } else {
      setVisibleButton(false)
    }
  }

  return (
    <section className='profile'>
      <form className='profile-form' onSubmit={handelSubmit}>
        <div className='profile-form__content'>
          <h2 className='profile-form__title'>{`Привет, ${newUserName}!`}</h2>
          <div className='profile-form__item'>
            <p className='profile-form__item-value profile-form__item-value_weight'>Имя</p>
            <input className='profile-form__item-value profile-form__item-value_input' value={newUserName} onChange={handleNameChange} />
          </div>
          <div className='profile-form__item'>
            <p className='profile-form__item-value profile-form__item-value_weight'>E-mail</p>
            <input className='profile-form__item-value profile-form__item-value_input' value={newUserEmail} onChange={handleEmailChange} />
          </div>
        </div>
        <div className='profile-form__buttons'>
          <span>{textInfo}</span>
          <button className='profile-form__button profile-form__button_submit' type='submit' disabled={!isVisibleButton}>Редактировать</button>
          <button className='profile-form__button profile-form__button_out' type='button' onClick={onSignOut}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  )
}

export default Profile;