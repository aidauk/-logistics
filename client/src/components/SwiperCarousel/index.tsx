"use client";
import { Navigation, Pagination, Zoom } from "swiper/modules";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import '../../styles/swiper.css';
import 'swiper/css/zoom';

const SwiperCarousel = ({
  data,
  slidesPerView,
  navigation,
  pagination,
  zoom,
  breakpoints,
}: {
  data?: React.ReactNode[];
  slidesPerView: number;
  navigation: boolean;
  zoom?: boolean;
  pagination: boolean;
  breakpoints: Array<number>;
}) => {

  return (
    <Swiper
      breakpoints={{
        100: {
          slidesPerView: breakpoints[3],
        },
        480: {
          slidesPerView: breakpoints[2],
        },
        640: {
          slidesPerView: breakpoints[1],
        },
        768: {
          slidesPerView: breakpoints[0],
        },
        1024: {
          slidesPerView: slidesPerView,
        },
      }}
      // slidesPerView={slidesPerView}
      spaceBetween={20}
      zoom={zoom}
      navigation={navigation}
      pagination={{
        clickable: pagination,
      }}
      modules={[Zoom, Navigation, Pagination]}
      className="mySwiper"
    >
      {data?.map((item: any, i): React.ReactNode => {
        return <SwiperSlide key={i}>{item}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default SwiperCarousel;
