import logo from './logo.png';
import logo1 from './logo_1.png';

// import avatar from './avatar__user.png'
import css from './header.module.css'
import { useState } from 'react'
import HeaderUser from './header_user'
import { Link } from 'react-router-dom'

const Header = (props) => {
  const { isLogged, initToken, setIsLogged } = props
  const [isburgervisible, setburgervisible] = useState(false)

  // console.log("isLogged в header = " + isLogged)
  const showBurger = () => {
    setburgervisible(!isburgervisible)
  }
  const clicksubmenu = () => {
    setburgervisible(!isburgervisible)
  }

  return (
    <div className={css.header}>
      <div className={css.logo}>
        <Link to="/"><img src={logo} alt="Логотип СКАН" /></Link>
      </div>
      <div className={css.header__navigation}>
        <ul className={css.navigation}>
          <li>
            <Link to="/" className={css.navigation__item}>Главная </Link>
          </li>
          <li>
            <Link to="/" className={css.navigation__item}>Тарифы</Link>
          </li>
          <li>
            <Link to="/" className={css.navigation__item}>FAQ</Link>
          </li>
        </ul>
      </div>

      <HeaderUser
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        initToken={initToken}
      />

      <div className={css.burger} onClick={showBurger}>
        <div className={css.burger_line}></div>
        <div className={css.burger_line}></div>
        <div className={css.burger_line}></div>
      </div>


      {isburgervisible && (
        <div className={css.burger__menu}>
          <div className={`${css.logo} ${css.logo1}`}>
            <img src={logo1} alt="Логотип СКАН" />
          </div>
          <ul>
            <Link to="/" className={css.navigation__item} onClick={clicksubmenu}><li>Главная</li> </Link>
            <Link to="/" className={css.navigation__item} onClick={clicksubmenu}><li>Тарифы</li></Link>
            <Link to="/" className={css.navigation__item} onClick={clicksubmenu}><li>FAQ</li></Link>
            {!isLogged && (
              <>
                <li className={css.navigation__item}>Зарегистрироваться</li>
                <li className={css.navigation__item}>
                  <button className={css.btn_enter}>Войти</button>
                </li>
              </>
            )}

          </ul>
        </div>
      )}

    </div>
  );
}

export default Header
