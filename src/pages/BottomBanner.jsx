import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import Sliders from "../components/Slider";
import Swiper, { Navigation, Pagination } from "swiper";
import { tablet } from "../responsive";

const BottomBannerContainer = styled.div`
  height: 80vh;
  max-width: 100vw;
  padding: 10px;
  /* background-color: aliceblue; */
`;
const BottomBannerWrapp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  ${tablet({ flexDirection: "column" })}
`;
const BottomBannerContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  /* justify-content: center; */
`;

const ContentImgWrapp = styled.div`
  display: flex;
  /* align-items: center; */
  /* justify-content: flex-end; */
`;

const ContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BottomBannerContentSecond = styled.div`
  flex: 1;
`;

const BottomBanner = () => {
  const { products } = useSelector((state) => state.product);
  const imgUrl = products[5].imgDisplay.imgUrl;

  console.log(products);
  return (
    <BottomBannerContainer>
      <BottomBannerWrapp>
        <BottomBannerContent>
          <ContentImgWrapp>
            <ContentImg src={imgUrl} />
          </ContentImgWrapp>
        </BottomBannerContent>
        <BottomBannerContentSecond>
          <h1>{products[5].title}</h1>
          {""}
          <p>{products[5].desc}</p>
        </BottomBannerContentSecond>
      </BottomBannerWrapp>
    </BottomBannerContainer>
  );
};

export default BottomBanner;
