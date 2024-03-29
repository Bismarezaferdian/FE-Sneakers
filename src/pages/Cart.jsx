// import { Add, Remove } from "@material-ui/icons";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { deleteProductCart, getCart, updatecart } from "../redux/apiCall";
import { addCartStart, addQty, removeQty } from "../redux/cartRedux";
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { formatRupiah } from "../utils/formatRupiah";
import { ToastContainer } from "react-toastify";
import { errorMessage } from "../utils/Toastify";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
var debounce = require("lodash.debounce");

const Container = styled.div`
  overflow: hidden;
  background-color: #fcfdfd;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${tablet({ padding: "10px" })}
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const TopTexts = styled.div`
  ${tablet({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid black;
  margin: 20px;
  ${tablet({ flexDirection: "column", margin: "0px" })}
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  padding: 10px;
  ${tablet({
    flexDirection: "column",
    justifyContent: "center",
    flex: "1",
    padding: "0px",
  })};
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;

  ${tablet({ padding: "10px" })}
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
  ${tablet({
    alignItems: "start",
    marginLeft: "10px",
  })}/* background-color: red; */
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Btn = styled.button`
  /* background-color: red; */
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.p`
  font-size: 30px;
  font-weight: 200;
  font-size: 2rem;
  color: #404b69;
  ${tablet({
    marginTop: "20px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#5d697a",
  })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: #f7f7f7;
  ${tablet({ marginTop: "10px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span`
  color: #3330e4;
  opacity: 0.8;
`;

const Button = styled.button`
  width: 100%;
  /* padding: 10px; */
  background-color: #3330e4;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
`;

const Cart = () => {
  const cart = useSelector((state) => state?.cart);
  const { isFetch } = useSelector((state) => state?.cart);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dipindah ke halaman home
  useEffect(() => {
    getCart(userId, dispatch);
  }, [userId, dispatch]);

  //handle button dengan bounce /untuk kasi jeda user bisa click button plus
  const debouncedHandleQty = debounce((item, action) => {
    if (action === "plus") {
      updatecart(
        userId,
        {
          products: item,
        },
        dispatch
      );
      dispatch(addQty(item));
    } else if (action === "minus") {
      deleteProductCart(userId, {
        products: item,
      });
      dispatch(removeQty(item));
    }
  }, 1000);

  const handleQty = async (item, action) => {
    dispatch(addCartStart());
    debouncedHandleQty(item, action);
  };

  // notyfy();
  const handleCheckout = () => {
    if (cart.products.length > 0) {
      navigate("/checkout");
    } else {
      errorMessage("Tidak ada barang !");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  // useEffect(() => {
  //   const getOrder = async () => {
  //     try {
  //       const res = await fetchData.get(`/orders/63bcedad32a24fe7f8452c79`);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getOrder();
  // }, []);

  return (
    <Container>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetch}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <LinkTo to={"/products"}>CONTINUE SHOPPING</LinkTo>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart?.products?.map((item, i) => (
              <Product key={i}>
                <ProductDetail>
                  <Image src={item.imgDisplay} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <b>Color:</b> <ProductColor color={item.variant.color} />
                    <ProductSize>
                      <b>Size:</b> {item.variant.size}
                    </ProductSize>
                    <ProductSize>
                      <p>sisa stock:{item.variant.stock}</p>
                    </ProductSize>
                    <ProductSize>
                      <p>berat:{item.weight}</p>
                    </ProductSize>
                    <ProductPrice>{formatRupiah(item.price)}</ProductPrice>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Btn
                      disabled={isFetch ? true : false}
                      onClick={() => handleQty(item, "minus")}
                    >
                      {item.quantity === 1 ? "delete" : <Remove />}
                    </Btn>
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Btn
                      disabled={isFetch ? true : false}
                      id="plus"
                      onClick={() => handleQty(item, "plus")}
                    >
                      <Add />
                    </Btn>
                  </ProductAmountContainer>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total Discount</SummaryItemText>
              <SummaryItemPrice>Rp. 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total Berat Product</SummaryItemText>
              <SummaryItemPrice>{cart.weight} g</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{formatRupiah(cart?.total)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
