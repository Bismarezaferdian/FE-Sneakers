import React from "react";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "../components/Slider";
import { sliderItems } from "../data";
import { tablet } from "../responsive";

export const Container = styled.div`
  padding: 20px 40px;
  display: flex;
  max-height: 60vh;
  /* width: 100%; */
  position: relative;
  overflow: hidden;
  ${tablet({ padding: "0" })}
`;

const Banner = () => {
  return (
    <Container>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        // autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {sliderItems.map((item, i) => (
          <SwiperSlide key={i}>
            <Slider item={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Banner;
