import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatRupiah } from "../utils/formatRupiah";
import { tablet } from "../responsive";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 350px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffff;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
    /* border-radius: 50%; */
  }

  ${tablet({
    height: "200px",
    // minWidth: "200px",
    maxWidth: "200px",
    width: "100%",
  })}
`;

export const Title = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  align-items: center;
  letter-spacing: 2px;
  ${tablet({ fontSize: "12px", textAlign: "center", fontWeight: "400" })}
`;

export const Price = styled.p`
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #5d697a;
  ${tablet({ fontSize: "10px" })}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  /* background-color: white; */
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.imgDisplay.imgUrl} />
      <Title>{item.title}</Title>
      <Price>{formatRupiah(item.price)}</Price>
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
