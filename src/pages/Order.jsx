import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { fetchData } from "../useFetch";
import { lightGreen } from "@mui/material/colors";
import { formatRupiah } from "../utils/formatRupiah";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}/* background-color: blue; */
`;

const WrappOrder = styled.div`
  flex: 3;
`;

const WrappNavbarOrder = styled.div`
  display: flex;
  justify-content: space-between;
  /* border: 1px solid #000000; */
  width: 100%;
`;
const NavTextOrder = styled.div`
  width: 100%;
  border: 1px solid #000000;
  text-align: center;
  padding: 14px;
`;

const TextOrder = styled.p`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
`;

const ContentOrder = styled.div``;

const Product = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid black;
  margin: 20px;
  align-items: center;
  align-self: center;
  /* background-color: blue; */
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const WrappProduct = styled.div`
  /* background: red; */
  display: flex;
  flex-direction: column;
`;

const ProductDetail = styled.div`
  /* flex: 2; */
  display: flex;
  padding: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  align-self: center;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Btn = styled.button`
  /* background-color: red; */
`;

const PriceDetail = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 10px;
`;

const ProductStatus = styled.span`
  font-size: 14px;
  font-weight: 600;
  /* color: #3330e4; */
  background-color: ${(props) => {
    if (props.status === "pending") {
      return "#E9ECEF";
    } else if (props.status === "cancel") {
      return "#F6E1E6";
    } else if (props.status === "expire") {
      return "#F6E1E6";
    } else if (props.status === "settlement") {
      return "#CFEBD3";
    }
  }};
  border: 1px solid black;
  padding: 4px;
  color: ${(props) => {
    if (props.status === "pending") {
      return "#757D85";
    } else if (props.status === "cancel") {
      return "#D3385C";
    } else if (props.status === "expire") {
      return "#D3385C";
    } else if (props.status === "settlement") {
      return "#55BE63";
    }
  }};
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 600;
`;
// const ProductStatus = styled.p`
//   font-size: 12px;
//   font-weight: 600;
//   color: red
//     /* color: ${(props) => {
//       if (props.status === "pending") {
//         return "#F9D949";
//       } else if (props.status === "failed") {
//         return "#ef1010";
//       } else if (props.status === "settlement") {
//         return "#0ef80a";
//       }
//     }} */
//     ${mobile({ marginBottom: "20px" })};
// `;

const Order = () => {
  const [order, setOrder] = useState();
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await fetchData.get("/orders");
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);

  console.log(order);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <WrappOrder>
          <WrappNavbarOrder>
            <NavTextOrder>
              <TextOrder>Semua</TextOrder>
            </NavTextOrder>
            <NavTextOrder>
              <TextOrder>Belum Dibayar</TextOrder>
            </NavTextOrder>
            <NavTextOrder>
              <TextOrder>Sedang Dikemas</TextOrder>
            </NavTextOrder>
            <NavTextOrder>
              <TextOrder>Selesai</TextOrder>
            </NavTextOrder>
            <NavTextOrder>
              <TextOrder>Dibatal</TextOrder>
            </NavTextOrder>
          </WrappNavbarOrder>
          <ContentOrder>
            {order?.map((item, i) => (
              <Product>
                <WrappProduct>
                  {item?.products?.map((products, i) => (
                    <ProductDetail>
                      <Image src={products.imgDisplay} />
                      <Details>
                        <ProductName>
                          <b>Product:</b>
                          {products.title}
                        </ProductName>
                        <b>Color:</b>{" "}
                        <ProductColor color={products.variant.color} />
                        <ProductSize>
                          <b>Size:</b>
                          {products.variant.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                  ))}
                </WrappProduct>
                <PriceDetail>
                  <ProductStatus status={item.status}>
                    {item.status}
                  </ProductStatus>
                  <ProductPrice>{formatRupiah(item.total)}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </ContentOrder>
        </WrappOrder>
        <h1>order</h1>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Order;
