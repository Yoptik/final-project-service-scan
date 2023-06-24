import css from './authorization.module.css'
import characters from '../authorization/Characters.png'
import lock from '../authorization/Lock.png'
import google from '../authorization/google.png'
import facebook from '../authorization/facebook.png'
import ya from '../authorization/ya.png'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import instance from '../../utils/axios'
import { Context } from '../..'
import { store } from '../../store/store'



const AutorizationPage = (props) => {
  const { isLogged, setIsLogged, update } = props

  const [username, setUsername] = useState("")
  const [userpassword, setUserpassword] = useState("")
  const [error, setError] = useState(false)

  // const {store} = useContext(Context)

  const [isactivetabenter, setIsactivetabenter] = useState(true)
  const [isactivetabreg, setIsactivetabreg] = useState(false)


  const navigate = useNavigate();
  const url = "account/login"

  // **********ПРОВЕРКА ЗАПОЛНЕНИЯ ВСЕХ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ**********
  const [formCompleted, setFormCompleted] = useState(false)
  useEffect(() => {
    if (username && userpassword) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [username, userpassword])

  // **********ОТПРАВКА ЗАПРОСА НА ВХОД**********
  const authResponse = (event) => {
    event.preventDefault()
    if (username !== null && userpassword !== null) {
      instance({
        method: 'post',
        url: url,
        data: {
          login: username,
          password: userpassword
        }
      }).then(res => {
        localStorage.setItem('expire', JSON.stringify(res.data.expire)) //expire записался
        localStorage.setItem('accesstoken', JSON.stringify(res.data.accessToken))//token записался
        setIsLogged(true)
        // onTokenChange(newToken, newExpire); // вызываем функцию из родительского компонента и передаем родителю начальные значения
        navigate('/'); // автоматический переход на роутер
      })
        .catch(error => {
          console.log('An error occurred:', error.response);
          setError(true)
        });
    }

  }

  //переключение активной вкладки в форме авторизации
  const handleActiveTab = () => {
    setIsactivetabenter(!isactivetabenter)
    setIsactivetabreg(!isactivetabreg)
  }

  return (
    <>
      {isLogged ? (
        <h1>Вы уже авторизованы. Перейдите на главную страницу</h1>
      ) : (
        <div className={css.autorization}>
          <div className={css.info}>
            <h1 className={css.title}> Для оформления подписки на тариф,
              необходимо авторизоваться.
            </h1>
            <img src={characters} className={css.characters} alt="Characters"></img>
          </div>
          <div className={css.form}>
            <img src={lock} className={css.lock} alt="Lock"></img>
            <form
              className={css.autorizationForm}
              onSubmit={authResponse}
            >
              <div className={css.tab}>
                <p
                  onClick={handleActiveTab}
                  isactivetabenter={isactivetabenter}
                  className={isactivetabenter ? `${css.enter} ${css.activeTab} ` : `${css.enter}`}
                >
                  Войти
                </p>
                <p
                  onClick={handleActiveTab}
                  isactivetabreg={isactivetabreg}
                  className={isactivetabreg ? `${css.enter} ${css.activeTab} ` : `${css.enter}`}
                >
                  Зарегистрироваться
                </p>
              </div>
              <label htmlFor="login">Логин или номер телефона:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required>
              </input>

              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                className={error && `${css.errorBorder}`}
                value={userpassword}
                name="password"
                onChange={(event) => {
                  setUserpassword(event.target.value)
                  setError(false)
                }}
                required>
              </input>
              {error && <p className={css.errorMessage}>Неправильный логин и/или пароль</p>}
              <button
                type="submit"
                disabled={!formCompleted}
                className={formCompleted ? `${css.btn__inactive}` : `${css.btn__disabled}`}
              >
                {isactivetabreg ? "Зарегистрироваться" : "Войти"}
              </button>

              {/* если пользователь хочет зарегистрироваться, он не может восстановить пароль */}
              {!isactivetabreg && (
                <>
                  <p className={css.resetPas}>Восстановить пароль</p>
                  <p className={css.subEnter}>Войти через:</p>
                  <div className={css.partners}>
                    <div className={css.icon}><img src={google} alt="icon"></img></div>
                    <div className={css.icon}><img src={facebook} alt="icon"></img></div>
                    <div className={css.icon}><img src={ya} alt="icon"></img></div>
                  </div>
                </>
              )}
            </form>

          </div>
        </div>
      )
      }
    </>
  );
}

export default AutorizationPage
