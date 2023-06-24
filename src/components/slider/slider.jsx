import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import icon1 from '../swiper/icon1.png';
import icon2 from '../swiper/icon2.png';
import icon3 from '../swiper/icon3.png';
import manager from '../swiper/Group 14.png';
import css from '../slider/slider.module.css'
import  '../slider/sliderCss.css'


const SliderComponent = (props) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        variableWidth: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
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
        <div className={css.block__advantages}>
          <h1 className={css.advantages__title}>Почему именно мы</h1>

            <Slider {...settings} className={css.slider}>
                <div className={css.slide}>
                    <img src={icon1} alt="Картинка время"></img>
                    <p>Высокая и оперативная скорость обработки заявки</p>
                </div>
                <div className={css.slide}>
                    <img src={icon2} alt="Картинка лупа"></img>
                    <p>Огромная комплексная база данных, обеспечивающая объективный 
                    ответ на запрос
                    </p>
                </div>
                <div className={css.slide}>
                    <img src={icon3} alt="Картинка защита"></img>
                    <p>Защита конфеденциальных сведений, не подлежащих разглашению 
                    по федеральному законодательству
                    </p>
                </div>
                <div className={css.slide}>
                    <img src={icon1} alt="Картинка время"></img>
                    <p>Высокая и оперативная скорость обработки заявки</p>
                </div>
            </Slider>
            <img src={manager} className={css.manager} alt="Картинка менеджер"></img>          
        </div>
  );
}

export default SliderComponent;
