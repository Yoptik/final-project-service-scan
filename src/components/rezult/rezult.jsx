import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import apple from './apple.png'
import css from '../rezult/rezult.module.css'
import '../slider/sliderCssRezult.css'
import Loader from "../loader/loader"
import { useState, useEffect } from 'react'


const Rezult = (props) => {
  // const { rezult } = props
  const [rezult, setRezult] = useState(JSON.parse(localStorage.getItem('searchData')))
  // console.log("rezult = ", rezult)

  //**********LOADER**********
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
    }, 1000);

  }, [])

  //**********ПЕРЕБОР ДАННЫХ ПО СВОДКЕ**********

  const twoArray = (Object.values(rezult).map((value) => value.map((item) => item.data)))
  const totalDocuments = (Object.values(twoArray).map((value) => value[0])).map((item) => item)
  const riskFactors = Object.values(twoArray).map((value) => value[1]).map((item) => item.map((name) => name.value))
  const [tableData, settableData] = useState(() => {
    const storedtableData = localStorage.getItem('tableData');
    return storedtableData ? JSON.parse(storedtableData) : totalDocuments.map((item) => item.map((value, index) => {
      return { date: value.date, totalDoc: value.value, riskDoc: Object.values(riskFactors)[0][index] }
    }))
  });



  //**********СОХРАНЕНИЕ КЛЮЧЕЙ ПОИСКА**********
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);
  //**********НАСТРОЙКИ ДЛЯ СЛАЙДЕРА**********
  const settings = {
    dots: false,
    infinite: false,
    // variableWidth: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={css.publications}>
      <div className={css.info}>
        <h1>{!tableData ? "Ищем. Скоро будут результаты" : "Мы нашли для вас подходящие варианты"}</h1>
        <p>{!tableData ? "Поиск может занять некоторое время,просим сохранять терпение." : "Спасибо за терпение. Теперь вы можете посмотреть результаты"}
        </p>
        <img src={apple} alt="apple"></img>
      </div>
      <div className={css.bulletin}>
        <h3>Общая сводка</h3>
        <span>Найдено {tableData.map((item) => item.length)} вариантов</span>

        <div className={css.table}>
          <div className={`${css.table__item} ${css.table__head}`}>
            <div className={css.item}>
              <p>Период</p>
              <p>Всего</p>
              <p>Риски</p>
            </div>
          </div>

          {loader ? (<Loader />) : (
            <Slider {...settings} className={css.sliderTwo}>
              {Object.values(tableData).map((value) => value.map((item) => {
                const stringDate = item.date
                const date = new Date(stringDate)
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = (date.getDate()).toString().padStart(2, '0');
                const newDate = `${day}.${month}.${date.getFullYear()}`
                return (
                  <div className={`${css.table__item} `}>
                    <div className={css.item}>
                      <p>{newDate}</p>
                      <p>{item.totalDoc}</p>
                      <p>{item.riskDoc}</p>
                    </div>
                  </div>
                )
              }))}
            </Slider>
          )}

        </div>

      </div>


    </div>
  );
}

export default Rezult
