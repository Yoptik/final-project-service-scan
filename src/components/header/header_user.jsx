import css from '../header/header.module.css'
import avatar from './avatar__user.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from "axios"
import instance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

const HeaderUser = (props) => {
    const { initToken, isLogged, setIsLogged } = props
    // console.log("isLogged в HeaderUser = " + isLogged)

    // console.log("initToken in header_user" + initToken)
    //проверяем пользователя, если зареган, то показываем полные данные
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);
    const url = "/account/info"
    useEffect(() => {
        if (initToken !== null) {
            instance({
                method: 'get',
                url: url,
                headers: {
                    'Authorization': `Bearer ${initToken}`
                }
            })
                .then(response => {
                    const rezult = response.data.eventFiltersInfo
                    setUsedCompanyCount(rezult.usedCompanyCount)
                    setCompanyLimit(rezult.companyLimit)
                })
                .catch(error => {
                    console.log('Ошибка:', error.response);
                });
        }

    }, [initToken]);

    //**********ФУНКЦИЯ ВЫХОДА ИЗ АККАУНТА**********
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("accesstoken")
        localStorage.removeItem("expire")
        setIsLogged(false)
        navigate('/'); // автоматический переход на роутер
    }
    return (
        <>
            {isLogged ? (
                <>
                    <div className={css.counter}>
                        <p className={css.counter__title}>Использовано компаний
                            <span className={css.usedCompanyCount}>{usedCompanyCount}</span>
                        </p>
                        <p className={css.counter__title}>Лимит по компаниям
                            <span className={css.companyLimit}>{companyLimit}</span>
                        </p>
                    </div>
                    <div className={css.user}>
                        <div className={css.user__info}>
                            <p className={css.user__name}>Алексей А.</p>
                            <button
                                className={css.user__status}
                                onClick={logout}
                            >Выйти</button>
                        </div>
                        <div className={css.box__user}>
                            <img src={avatar} alt="Аватар пользователя"></img>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={css.isLoggedBlock}>
                        <Link to='/autorization'>
                            <button className={css.transparent}>Зарегистрироваться</button>
                        </Link>
                        <Link to='/autorization'>
                            <button className={css.btnUser}>Войти</button>
                        </Link>

                    </div>
                </>
            )
            }
        </>
    )
}

export default HeaderUser