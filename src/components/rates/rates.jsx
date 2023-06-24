import lamp from '../rates/Lamp.png'
import apple from '../rates/Apple.png'
import computer from '../rates/computer.png'

import css from '../rates/rates.module.css'

const Rates = (props) => {
  const { isLogged } = props

  return (
    <div className={css.block__rates}>
      <h1 className={css.block__rates__title} id="rates">Наши тарифы</h1>

      <div className={css.rates__cards}>

        <div className={isLogged ?(`${css.rates__card} ${css.card_active}`): (`${css.rates__card}`)}>
          <div className={css.card__header}>
            <div className={css.flex__header}>
              <p className={css.card__title}>Beginner</p>
              <p className={css.card__subtitle}>Для небольшого исследования</p>
            </div>
            <img className={css.vector} src={lamp} alt="Картинка вектор"></img>
          </div>
          <div className={css.card__content}>
            {isLogged && <button className={css.btn__actual}>Текущий тариф</button>}
            <h2>799 ₽ <span>1 200 ₽</span></h2>
            <p className={css.subtitle}>или 150 ₽/мес. при рассрочке на 24 мес.</p>
            <p className={css.text}>В тариф входит:</p>
            <ul>
              <li className={css.checkMark}>Безлимитная история запросов</li>
              <li className={css.checkMark}>Безопасная сделка</li>
              <li className={css.checkMark}>Поддержка 24/7</li>
            </ul>
            {isLogged ? (
              <button className={`${css.btn} ${css.btn_active} ${css.btnMarginTop}`}>Перейти в личный кабинет</button>
            ) : (
              <button className={`${css.btn} ${css.btnMarginTop}`}>Подробнее</button>
            )}

          </div>
        </div>

        <div className={css.rates__card}>
          <div className={`${css.card__header} ${css.card__header__pro}`}>
            <div className={css.flex__header}>
              <p className={css.card__title}>Pro</p>
              <p className={css.card__subtitle}>Для HR и фрилансеров</p>
            </div>
            <img className={css.vector} src={apple} alt="Картинка вектор"></img>
          </div>
          <div className={css.card__content}>
            <h2>1 299 ₽ <span>2 600 ₽</span></h2>
            <p className={css.subtitle}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
            <p className={css.text}>В тариф входит:</p>
            <ul>
              <li className={css.checkMark}>Все пункты тарифа Beginner</li>
              <li className={css.checkMark}>Экспорт истории</li>
              <li className={css.checkMark}>Рекомендации по приоритетам</li>
            </ul>
            <button className={`${css.btn} ${css.btnMarginTop}`}>Подробнее</button>
          </div>
        </div>

        <div className={css.rates__card}>
          <div className={`${css.card__header} ${css.card__header__business}`}>
            <div className={css.flex__header}>
              <p className={css.card__title}>Business</p>
              <p className={css.card__subtitle}>Для корпоративных клиентов</p>
            </div>
            <img className={css.vector} src={computer} alt="Картинка вектор"></img>
          </div>
          <div className={css.card__content}>
            <h2>2 379 ₽ <span>3 700 ₽</span></h2>
            <p className={css.subtitle}>или 279 ₽/мес. при рассрочке на 24 мес.</p>
            <p></p>
            <p className={css.text}>В тариф входит:</p>
            <ul>
              <li className={css.checkMark}>Безлимитная история запросов</li>
              <li className={css.checkMark}>Безопасная сделка</li>
              <li className={css.checkMark}>Поддержка 24/7</li>
            </ul>
            <button className={`${css.btn} ${css.btnMarginTop}`}>Подробнее</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Rates;
