import React from 'react';
import icon1 from '../swiper/icon1.png';
import icon2 from '../swiper/icon2.png';
import icon3 from '../swiper/icon3.png';
import manager from '../swiper/Group 14.png';

import { Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import css from '../swiper/swiper.module.css'





const SwiperComponent = (props) => {
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
  return (
        <div className={css.block__advantages}>
          <h1 className={css.advantages__title}>Почему именно мы</h1>

          <Swiper
            className={css.swiper} 
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
            }}

            modules={[Navigation]}            
            // spaceBetween={35}
            // slidesPerView={3}
            breakpoints= {
              {
                375: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },

                500: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },

                700: {
                  slidesPerView: 3,
                  spaceBetween: 40
                }
              }
            }
          >
            <SwiperSlide> 
              <div className={css.slide}>
                <img src={icon1} alt="Картинка время"></img>
                <p>Высокая и оперативная скорость обработки заявки</p>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
              <div className={css.slide}>
                <img src={icon2} alt="Картинка лупа"></img>
                <p>Огромная комплексная база данных, обеспечивающая объективный 
                  ответ на запрос
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
              <div className={css.slide}>
                <img src={icon3} alt="Картинка защита"></img>
                <p>Защита конфеденциальных сведений, не подлежащих разглашению 
                  по федеральному законодательству
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
              <div className={css.slide}>
                <img src={icon1} alt="Картинка время"></img>
                <p>Высокая и оперативная скорость обработки заявки</p>
              </div>
            </SwiperSlide>

            <div ref={navigationPrevRef} className={css.swiper_button_prev}></div>
            <div ref={navigationNextRef} className={css.swiper_button_next}></div>
          </Swiper>
          <img src={manager} className={css.manager} alt="Картинка менеджер"></img>
        </div>
  );
}

export default SwiperComponent;
