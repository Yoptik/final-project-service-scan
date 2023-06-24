import { Link } from 'react-router-dom'
import logo from '../footer/logo__footer.png'
import css from './footer.module.css';

const Footer = (props) => {

  return (
    <div className={css.footer}>
      <div className={css.logo}>
        <Link to="/"><img src={logo} alt="Логотип СКАН" /></Link>
      </div>
      <div className={css.footer__navigation}>
        <ul className={css.navigation}>
          <li className={css.footer__item}>г. Москва, Цветной б-р,40</li>
          <li className={css.footer__item}><a href="tel:74957712111" className={css.footer__item}>+7 495 771 21 11</a></li>
          <li className={css.footer__item}><a href="mailto:info@skan.ru">info@skan.ru</a></li>
          <li></li>
          <li className={css.footer__item}>Copyright. 2022</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer
