import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { fetchData } from "../useFetch";
import { lightGreen } from "@mui/material/colors";

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
  /* justify-content: space-between; */

  ${mobile({ flexDirection: "column" })}
`;

const WrappProduct = styled.div`
  background: red;
  display: flex;
  flex-direction: column;
`;

const ProductDetail = styled.div`
  flex: 2;
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

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Btn = styled.button`
  /* background-color: red; */
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  color: #404b69;
  ${mobile({ marginBottom: "20px" })};
`;

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
                {item?.products?.map((products, i) => (
                  <WrappProduct>
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
                  </WrappProduct>
                ))}
                <PriceDetail>
                  <ProductAmountContainer></ProductAmountContainer>
                  <ProductPrice>{item.status}</ProductPrice>
                  <ProductPrice>{item.total}</ProductPrice>
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
