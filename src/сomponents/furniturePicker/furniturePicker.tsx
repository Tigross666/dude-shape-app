import { Button } from "../button/button";
import { Icon } from "../icon/icon";
import styles from "./furniturePicker.module.css";
import interiorFour from "../../assets/interiorFour.png";
import { CATEGORIES } from "./constants";
import { CategoryButton } from "../categoryButton/categoryButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const FurniturePicker = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>All Furniture</h1>
      <div className={styles.tabBar}>
        <Button>
          <h3 className={styles.tabText}>Shop By Room</h3>
        </Button>
        <Button>
          <h3 className={styles.tabText}>Shop By Category</h3>
        </Button>
        <Button>
          <h3 className={styles.tabText}>Shop By Style</h3>
        </Button>
      </div>

      <div className={styles.contentWrapper}>
        <Icon src={interiorFour} alt="interiorFour" />
        
        {/* Десктопная версия - сетка */}
        <div className={styles.grid}>
          {CATEGORIES.map((buttonOfSelection, index) => (
            <CategoryButton
              key={`desktop-${index}`}
              image={buttonOfSelection.image}
              title={buttonOfSelection.title}
            />
          ))}
        </div>

        {/* Мобильная версия - слайдер */}
        <div className={styles.mobileSlider}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            style={{ height: '300px' }} // добавить инлайн стиль
          >
            {CATEGORIES.map((buttonOfSelection, index) => (
              <SwiperSlide key={`mobile-${index}`}>
                <CategoryButton
                  image={buttonOfSelection.image}
                  title={buttonOfSelection.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};