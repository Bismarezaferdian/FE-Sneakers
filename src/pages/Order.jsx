import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { formatRupiah } from "../utils/formatRupiah";
import {
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { getOrder, getStatusMidtrans } from "../redux/apiCall";
import CopyToClipboard from "react-copy-to-clipboard";
import { tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background-color: #f5f5f5;
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}/* background-color: blue; */
`;

const WrappOrder = styled.div`
  flex: 3;
`;

// const WrappNavbarOrder = styled.div`
//   display: flex;
//   justify-content: space-between;
//   /* border: 1px solid #000000; */
//   width: 100%;
// `;
// const NavTextOrder = styled.div`
//   width: 100%;
//   border: 1px solid #000000;
//   text-align: center;
//   padding: 14px;
// `;

// const TextOrder = styled.p`
//   font-size: 18px;
//   font-weight: 600;
//   white-space: nowrap;
// `;

const ContentOrder = styled.div`
  background-color: #ffff;
  padding: 0 10px;
`;

const Product = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 0.5px solid black;
  margin-top: 20px;
  align-items: center;
  align-self: center;
  /* background-color: blue; */
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const WrappProduct = styled.div`
  /* background: red; */
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ProductContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${tablet({ flexDirection: "column", alignItems: "start " })}
`;

const ProductDetail = styled.div`
  /* flex: 2; */
  display: flex;
  padding: 10px;
  ${tablet({ justifyContent: "space-between", padding: "0px" })}
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

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

// const ProductAmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

export const Btn = styled.button`
  /* background-color: red; */
`;

const PriceDetail = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: end;
  /* justify-content: center; */
  gap: 10px;
  /* background-color: red; */
`;

const ActionWrapp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-items: end;
  background-color: #fffefb;
  ${tablet({
    alignItems: "start",
    padding: "10px 0",
  })}/* border-bottom: 2px solid black; */
`;

const ActionContent = styled.div``;

const ButtonPayment = styled.button`
  width: 160px;
  /* padding: 10px; */
  background-color: #3330e4;
  border: none;
  color: white;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
`;
// const AcceptOrder = styled.button`
//   width: 160px;
//   /* padding: 10px; */
//   background-color: #3330e4;
//   border: none;
//   color: white;
//   padding: 10px 0;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-weight: 600;
//   font-size: 16px;
//   white-space: nowrap;
// `;

const ProductStatus = styled.span`
  font-size: 18px;
  font-weight: 600;
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
  /* border: 1px solid black; */
  width: 120px;
  text-align: center;
  padding: 8px 0;
  border-radius: 4px;
  /* align-self: end; */
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

// const BankInfo = styled.div`
//   display: flex;
// `;

const InputVa = styled.input`
  /* background-color: black; */
  border: none;
  color: white;
  font-size: 18px;
  /* background-color: red; */
  width: 120px;
`;

const ButtonCopy = styled.button`
  background-color: #3330e4;
  color: #ffff;
  border: none;
  cursor: pointer;
  :disabled {
    background-color: gray;
  }
`;
//for modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Order = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMidtrans, setStatusMidtrans] = useState();
  const [copied, setCopied] = useState(false);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const { products } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStatus = async () => {
      try {
        //untuk updata status
        setLoading(true);
        await Promise.all(
          products.map((item) => getStatusMidtrans(item.idOrderMidtrans))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getStatus();
  }, [products]);

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    //kenapa tidak mengunakan apicall ? apakah dibutuhkan res.data untuk page ini ?
    // const getOrder = async () => {
    //   try {
    //     const res = await fetchData.get(`/orders/${userId}`);
    //     console.log(res.data);
    //     setOrder(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getOrder();
    //coba langsung ke apicall
    getOrder(userId, dispatch);
  }, [userId, dispatch]);

  const handlePending = async (orderId) => {
    // e.preventDefault();
    try {
      const data = await getStatusMidtrans(orderId);
      setStatusMidtrans(data);
      setOpen(true);
    } catch (error) {}
  };

  const handleCopy = () => {
    setCopied(true);
    alert(`${statusMidtrans?.va_numbers[0]?.va_number} dicopy`);
  };

  return (
    <Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Navbar order={order} /> */}
      <Announcement />
      <Wrapper>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <Typography id="modal-modal-title">
                Mohon selesaikan pembayaran sebelum :{" "}
                {statusMidtrans?.expiry_time}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Bank : {statusMidtrans?.va_numbers[0]?.bank}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  display: "flex",
                  whiteSpace: "nowrap",
                }}
              >
                Virtual Number:
                <InputVa
                  disabled
                  value={statusMidtrans?.va_numbers[0]?.va_number}
                />
                <CopyToClipboard
                  text={statusMidtrans?.va_numbers[0]?.va_number}
                  onCopy={handleCopy}
                >
                  <ButtonCopy disabled={copied}>Copy</ButtonCopy>
                </CopyToClipboard>
              </Typography>
            </div>
          </Box>
        </Modal>
        <WrappOrder>
          {/* <WrappNavbarOrder>
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
          </WrappNavbarOrder> */}
          {products?.map((item, i) => (
            <ContentOrder key={i}>
              <Product>
                <WrappProduct>
                  {item?.product?.map((products, i) => (
                    <ProductContent key={i}>
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
                          <ProductSize>{products.quantity}x</ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductPrice>
                          {" "}
                          {formatRupiah(products.price)}
                        </ProductPrice>
                      </PriceDetail>
                    </ProductContent>
                  ))}
                </WrappProduct>
              </Product>
              <ActionWrapp>
                <ProductStatus status={item.status}>
                  {item.status}
                </ProductStatus>
                <ProductPrice>
                  {" "}
                  Total Pesanan :{formatRupiah(item.total)}
                </ProductPrice>
                sudah termasuk pajak & biaya ongkir
                <ActionContent>
                  {item.status === "settlement" && (
                    <ButtonPayment>Terima Pesanan</ButtonPayment>
                  )}
                  {(item.status === "cancel" || item.status === "failure") && (
                    <ButtonPayment onClick={() => console.log("first")}>
                      Bayar Ulang
                    </ButtonPayment>
                  )}
                  {item.status === "pending" && (
                    <ButtonPayment onClick={() => handlePending(item._id)}>
                      Belum Bayar
                    </ButtonPayment>
                  )}

                  {/* <PaymentNow>Bayar Sekarang</PaymentNow> */}
                </ActionContent>
              </ActionWrapp>
            </ContentOrder>
          ))}
        </WrappOrder>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Order;
