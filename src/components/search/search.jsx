import css from '../search/search.module.css'
import list from '../search/list.png'
import folder from '../search/folders.png'
import window from '../search/window.png'
// import arrow from '../search/arrowBottom.png'

import { useState, useEffect } from 'react'
import instance from '../../utils/axios'
// import validateInn from '../../utils/functions/validateInn'
import Rezult from "../rezult/rezult"
import Documents from '../documents/documents'

const Search = (props) => {
    const { initToken } = props
    //   console.log("Текущий токен в поиске =" + initToken)

    //**********ФУНКЦИЯ ПОИСКА ПО ДАННЫМ ИЗ ФОРМЫ**********
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [inn, setInn] = useState('')
    // const [error, setError] = useState('')
    const [tonality, setTonality] = useState('')
    const [quantity, setQuantity] = useState('')

    const [maxFullness, setCheckboxOne] = useState(true)
    const [inBusinessNews, setCheckboxTwo] = useState(true)
    const [onlyMainRole, setCheckboxThree] = useState(true)
    const [onlyWithRiskFactor, setCheckboxFour] = useState(false)
    const [excludeTechNews, setCheckboxFive] = useState(false)
    const [excludeAnnouncements, setCheckboxSix] = useState(true)
    const [excludeDigests, setCheckboxSeven] = useState(false)

    const buf = JSON.parse(localStorage.getItem("searchData"))
    const [rezult, setRezult] = useState(buf || "")
    const url = "/objectsearch/histograms"
    const searchResponse = (event) => {
        event.preventDefault()
        instance({
            method: 'post',
            url: url,
            data: {
                "issueDateInterval": {
                    "startDate": startDate,
                    "endDate": endDate
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        "targetSearchEntities": [
                            {
                                "type": "company",
                                "sparkId": null,
                                "entityId": null,
                                "inn": inn, //инн
                                "maxFullness": maxFullness, //максимальная полнота
                                "inBusinessNews": inBusinessNews //упоминание в бизнес-контексте
                            }
                        ],
                        "onlyMainRole": onlyMainRole, //главная роль в публикации
                        "tonality": "any", //"tonality"
                        "onlyWithRiskFactors": onlyWithRiskFactor, //только риск-факторы
                        "riskFactors": { //риск-факторы
                            "and": [],
                            "or": [],
                            "not": []
                        },
                        "themes": {
                            "and": [],
                            "or": [],
                            "not": []
                        }
                    },
                    "themesFilter": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "attributeFilters": { // это чекбоксы исключения
                    "excludeTechNews": excludeTechNews,
                    "excludeAnnouncements": excludeAnnouncements,
                    "excludeDigests": excludeDigests
                },
                "similarMode": "duplicates", //Фильтр похожих публикаций
                "limit": quantity,
                "sortType": "sourceInfluence", //тип сортировки по всем источникам
                "sortDirectionType": "asc",
                "intervalType": "month",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ]
            },
            headers: {
                'Authorization': `Bearer ${initToken}`
            }
        })
            .then(response => {
                const rezult = response.data
                // console.log("Данные по общей сводке = " , rezult)
                localStorage.setItem("searchData", JSON.stringify(rezult))
                setRezult(rezult)
            })
            .catch(error => {
                // console.log('Ошибка выгрузки сводки', error.response);
            });
    }

    //**********ФУНКЦИЯ ПОИСКА ID ВСЕХ СУЩЕСТВУЮЩИХ ПУБЛИКАЦИЙ**********
    const bufTwo = JSON.parse(localStorage.getItem("searchDocumentsID"))
    const [documents, setDocuments] = useState(bufTwo || "")
    useEffect(() => {
        if (rezult) { 
            documentsId()
        }
    }, [rezult])


    const urlDocuments = "/objectsearch"
    const documentsId = (event) => {
        // event.preventDefault()
        instance({
            method: 'post',
            url: urlDocuments,
            data: {
                "issueDateInterval": {
                    "startDate": startDate,
                    "endDate": endDate
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        "targetSearchEntities": [
                            {
                                "type": "company",
                                "sparkId": null,
                                "entityId": null,
                                "inn": inn, //инн
                                "maxFullness": maxFullness, //максимальная полнота
                                "inBusinessNews": inBusinessNews //упоминание в бизнес-контексте
                            }
                        ],
                        "onlyMainRole": onlyMainRole, //главная роль в публикации
                        "tonality": "any", //"tonality"
                        "onlyWithRiskFactors": onlyWithRiskFactor, //только риск-факторы
                        "riskFactors": { //риск-факторы
                            "and": [],
                            "or": [],
                            "not": []
                        },
                        "themes": {
                            "and": [],
                            "or": [],
                            "not": []
                        }
                    },
                    "themesFilter": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "attributeFilters": { // это чекбоксы исключения
                    "excludeTechNews": excludeTechNews,
                    "excludeAnnouncements": excludeAnnouncements,
                    "excludeDigests": excludeDigests
                },
                "similarMode": "duplicates", //Фильтр похожих публикаций
                "limit": quantity,
                "sortType": "sourceInfluence", //тип сортировки по всем источникам
                "sortDirectionType": "asc",
                "intervalType": "month",
                "histogramTypes": [
                    "totalDocuments",
                    "riskFactors"
                ]
            },
            headers: {
                'Authorization': `Bearer ${initToken}`
            }
        })
            .then(response => {
                const rezult = response.data
                localStorage.setItem("searchDocumentsID", JSON.stringify(rezult))
                setDocuments(rezult)
            })
            .catch(error => {
                // console.log('Ошибка выгрузки ID', error.response);
            });
    }
    //**********ВАЛИДАЦИЯ ФОРМЫ**********
    const [validInn, setValidinn] = useState("")
    const [errorMessage, setErrormessage] = useState("ИНН пуст")
    const [validQuan, setValidQuan] = useState("")
    const [errorMessageQuan, setErrormessagequan] = useState("Введите корректные данные")
    const [validStartDate, setValidStartDate] = useState(false)
    const [errorMessageStartDate, setErrorMessageStartDate] = useState("Дата начала не может быть пустой")
    const [validEndDate, setValidEndDate] = useState(false)
    const [errorMessageEndDate, setErrorMessageEndDate] = useState("Дата окончания не может быть пустой")
    const ValidateInn = (inn) => {
        let error = {
            code: null,
            message: null
        };

        var result = false;
        if (typeof inn === 'number') {
            inn = inn.toString();
            // console.log("inn =" + inn);
        } else if (typeof inn !== 'string') {
            inn = '';
        }
        if (!inn.length) {
            error.code = 1;
            error.message = 'ИНН пуст';
            setErrormessage('ИНН пуст')
            setValidinn(false)
        } else if (/[^0-9]/.test(inn)) {
            error.code = 2;
            error.message = 'ИНН может состоять только из цифр';
            setErrormessage('ИНН может состоять только из цифр')
            setValidinn(false)
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.code = 3;
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
            setErrormessage('ИНН может состоять только из 10 или 12 цифр')
            setValidinn(false)
        } else {
            var checkDigit = function (inn, coefficients) {
                var n = 0;
                for (var i in coefficients) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10);
            };
            switch (inn.length) {
                case 10:
                    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9])) {
                        result = true
                        setErrormessage("")
                        setValidinn(true)
                    }
                    break;
                case 12:
                    var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                        result = true
                        setErrormessage("")
                        setValidinn(true)
                    }
                    break;
            }
            if (!result) {
                error.code = 4;
                error.message = 'Неправильное контрольное число';
                setErrormessage('Неправильное контрольное число')
                setValidinn(false)
            }
        }
        // console.log("Error = " + error.message)
    }
    const Validatequantity = (quantity) => {
        if (quantity > 0 && quantity < 1000) {
            setValidQuan(true)
            setErrormessagequan("")
        } else {
            setValidQuan(false)
            setErrormessagequan("Введите корректные данные")
        }
    }
    useEffect(() => {
        Validatequantity(quantity)
    }, [quantity])

    const ValidateStartDate = (date, endDate) => {
        const d = new Date(date)
        const now = new Date()
        if (d.getTime() > now.getTime()) {
            setErrorMessageStartDate("Дата в будущем времени")
            setValidStartDate(false)
        }
        else {
            setErrorMessageStartDate("")
            setValidStartDate(true)

        }
        if (endDate) {
            const end = new Date(endDate)
            if (d.getTime() > end.getTime()) {
                setErrorMessageStartDate("Дата начала не может быть позже даты окончания")
                setValidStartDate(false)
            } else {
                setErrorMessageStartDate("")
                setValidStartDate(true)
            }

        }
    }

    const ValidateEndDate = (date) => {
        const d = new Date(date)
        const now = new Date()
        if (d > now) {
            setErrorMessageEndDate("Дата не может быть в будущем времени")
            setValidEndDate(false)
        } else {
            setErrorMessageEndDate("")
            setValidEndDate(true)
        }
    }


    // **********ПРОВЕРКА ЗАПОЛНЕНИЯ ВСЕХ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ**********
    const [formCompleted, setFormCompleted] = useState(false)
    useEffect(() => {
        if (validInn && validQuan && validStartDate && validEndDate) {
            setFormCompleted(true);
        } else {
            setFormCompleted(false);
        }
    }, [validInn, validQuan, validStartDate, validEndDate])


    return (
        <>
            {!rezult ? (
                <div className={css.search}>
                    <div className={css.info}>
                        <h1 className={css.title}> Найдите необходимые данные в пару кликов.</h1>
                        <p>Задайте параметры поиска. <br></br>
                            Чем больше заполните, тем точнее поиск</p>

                        <form className={css.searchForm} onSubmit={searchResponse}>
                            <div className={css.flexboxSearch}>
                                <div className={css.blockLeft}>
                                    <label htmlFor="inn">ИНН компании <sup>*</sup></label>
                                    <input
                                        maxLength="12"
                                        type="text"
                                        id="inn"
                                        name="inn"
                                        placeholder='10 или 12 цифр'
                                        className={validInn == false ? (`${css.errorBorder}`) : ('')}
                                        value={inn}
                                        onChange={(event) => {
                                            setInn(event.target.value)
                                            ValidateInn(event.target.value)
                                        }}
                                    ></input>
                                    {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}

                                    <label htmlFor="ton">Тональность <sup>*</sup></label>
                                    <select
                                        id="tonality"
                                        value={tonality}
                                        onChange={(event) => setTonality(event.target.value)}
                                    >
                                        <option value="Позитивная">Позитивная</option>
                                        <option value="Негативная">Негативная</option>
                                        <option value="any">Любая</option>
                                    </select>

                                    <label htmlFor="numberDocument">Количество документов в выдаче <sup>*</sup></label>
                                    <input
                                        type="number"
                                        id="numberDocument"
                                        name="numberDocument"
                                        placeholder='От 1 до 1000'
                                        className={validQuan == false ? (`${css.errorBorder}`) : ('')}
                                        value={quantity}
                                        onChange={(event) => {
                                            setQuantity(event.target.value)
                                            // Validatequantity(event.target.value)
                                        }}>
                                    </input>
                                    {!validQuan && <p className={`${css.errorMessage} ${css.errorQuan}`}>{errorMessageQuan}</p>}
                                    <label htmlFor="date">Диапазон поиска <sup>*</sup></label>
                                    <div className={css.dateInput}>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="data"
                                            placeholder='Дата начала'
                                            className={validStartDate == false ? (`${css.errorBorder}`) : ('')}
                                            value={startDate}
                                            onChange={(event) => {
                                                setStartDate(event.target.value)
                                                ValidateStartDate(event.target.value, endDate)
                                            }}></input>
                                        {!validStartDate && <p className={`${css.errorMessage} ${css.errorStartDate}`}>{errorMessageStartDate}</p>}
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="data"
                                            value={endDate}
                                            className={validEndDate == false ? (`${css.errorBorder}`) : ('')}
                                            onChange={(event) => {
                                                setEndDate(event.target.value)
                                                ValidateEndDate(event.target.value)
                                            }}
                                            placeholder='Дата конца'></input>
                                        {!validEndDate && <p className={`${css.errorMessage} ${css.errorEndDate}`}>{errorMessageEndDate}</p>}
                                    </div>

                                </div>
                                <div className={css.blockRight}>
                                    <label htmlFor="checked1" className={css.signs}>
                                        <input defaultChecked
                                            type="checkbox"
                                            id="checked1"
                                            className={css.checkbox}
                                            onClick={() => setCheckboxOne(!maxFullness)}
                                            value={maxFullness}></input>
                                        <span className={css.fake}></span>
                                        <span className={maxFullness ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Признак максимальной полноты</span>
                                    </label>

                                    <label htmlFor="checked2" className={css.signs}>
                                        <input defaultChecked
                                            type="checkbox"
                                            id="checked2"
                                            className={css.checkbox}
                                            onClick={() => setCheckboxTwo(!inBusinessNews)}
                                            value={inBusinessNews}></input>
                                        <span className={css.fake}></span>
                                        <span className={inBusinessNews ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Упоминания в бизнес-контексте</span>
                                    </label>

                                    <label htmlFor="checked3" className={css.signs}>
                                        <input defaultChecked
                                            type="checkbox"
                                            id="checked3"
                                            className={css.checkbox}
                                            value={onlyMainRole}
                                            onClick={() => setCheckboxThree(!onlyMainRole)}></input>
                                        <span className={css.fake}></span>
                                        <span className={onlyMainRole ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Главная роль в публикации</span>
                                    </label>

                                    <label htmlFor="checked4" className={css.signs}>
                                        <input
                                            type="checkbox"
                                            id="checked4"
                                            className={css.checkbox}
                                            value={onlyWithRiskFactor}
                                            onClick={() => setCheckboxFour(!onlyWithRiskFactor)}></input>
                                        <span className={css.fake}></span>
                                        <span className={onlyWithRiskFactor ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Публикации только с риск-факторами</span>
                                    </label>

                                    <label htmlFor="checked5" className={css.signs}>
                                        <input
                                            type="checkbox"
                                            id="checked5"
                                            className={css.checkbox}
                                            value={excludeTechNews}
                                            onClick={() => setCheckboxFive(!excludeTechNews)}></input>
                                        <span className={css.fake}></span>
                                        <span className={excludeTechNews ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Включать технические новости рынков</span>
                                    </label>

                                    <label htmlFor="checked6" className={css.signs}>
                                        <input defaultChecked
                                            type="checkbox"
                                            id="checked6"
                                            className={css.checkbox}
                                            value={excludeAnnouncements}
                                            onClick={() => setCheckboxSix(!excludeAnnouncements)}></input>
                                        <span className={css.fake}></span>
                                        <span className={excludeAnnouncements ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>Включать анонсы и календари</span>
                                    </label>

                                    <label htmlFor="checked7" className={css.signs}>
                                        <input
                                            type="checkbox"
                                            id="checked7"
                                            className={css.checkbox}
                                            value={excludeDigests}
                                            onClick={() => setCheckboxSeven(!excludeDigests)}></input>
                                        <span className={css.fake}></span>
                                        <span className={excludeDigests ? `${css.agree} ${css.checkboxActive}` : `css.agree`}>
                                            Включать сводки новостей</span>
                                    </label>
                                </div>
                            </div>
                            <div className={css.sub}>
                                <button
                                    type="submit"
                                    disabled={!formCompleted}
                                    className={formCompleted ? `${css.btn__inactive}` : `${css.btn__disabled}`}>
                                    Поиск
                                </button>
                                <p className={css.comment}><sup>*</sup> Обязательные к заполнению поля</p>
                            </div>

                        </form>
                    </div>
                    <div className={css.imageBlock}>
                        <img className={css.list} src={list} alt="list"></img>
                        <img className={css.folder} src={folder} alt="folder"></img>
                        <img className={css.window} src={window} alt="window"></img>
                    </div>
                </div>
            ) : (
                <Rezult rezult={rezult} {...props} />
            )}
            {documents && <Documents documents={documents} {...props} />}
        </>

    );
}

export default Search
