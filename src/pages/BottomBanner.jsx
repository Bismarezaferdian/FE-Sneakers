import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { tablet } from "../responsive";

const BottomBannerContainer = styled.div`
  height: 80vh;
  max-width: 100vw;
  padding: 10px;
  background-color: #fcfdfd;
  ${tablet({ height: "50vh" })}/* background-color: aliceblue; */
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
  align-items: center;
  justify-content: center;
`;

const ContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${tablet({
    width: "70%",
    height: "70%",
  })}
`;

const BottomBannerContentSecond = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
`;

const TxtBannerTitle = styled.p`
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  color: #34364a;
  text-transform: capitalize;
  ${tablet({ fontSize: "18px" })}
`;
const TxtBannerDesc = styled.p`
  font-size: 18px;
  color: #5d697a;
  ${tablet({ fontSize: "12px" })}
`;

const BottomBanner = () => {
  const { products } = useSelector((state) => state.product);
  const imgUrl = products[9]?.imgDisplay.imgUrl;

  return (
    <BottomBannerContainer>
      <BottomBannerWrapp>
        <BottomBannerContent>
          <ContentImgWrapp>
            <ContentImg src={imgUrl} />
          </ContentImgWrapp>
        </BottomBannerContent>
        <BottomBannerContentSecond>
          <TxtBannerTitle>{products[9]?.title}</TxtBannerTitle>
          {""}
          <TxtBannerDesc>{products[9]?.desc}</TxtBannerDesc>
        </BottomBannerContentSecond>
      </BottomBannerWrapp>
    </BottomBannerContainer>
  );
};

export default BottomBanner;
