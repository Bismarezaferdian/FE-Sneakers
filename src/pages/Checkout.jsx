import {
  ContentCopy,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
import {
  Collapse,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  /* background: gray; */
  padding: 20px;
`;
const ContentWrapp = styled.div`
  /* background: whitesmoke; */
  max-width: 1280;
  /* height: 100vh; */
  padding: 20px;
`;
const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* background: green; */
  gap: 10px;
  border-bottom: 0.5px solid #bbbbbb;
`;
const SubTitle = styled.p`
  padding-top: 40px;
  font-size: 22px;
  font-weight: 600;
  color: #bbbbbb;
`;
const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
`;
const Address = styled.p`
  font-size: 18px;
`;

const ProductWrapp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  /* background: green; */
  border-bottom: 0.5px solid #bbbbbb;
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
`;
const DetailProduct = styled.div`
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-left: 20px;
  /* justify-content: center; */
`;

const ProductImg = styled.div``;
const Img = styled.img`
  width: 100px;
  /* object-fit: cover; */
`;
const ProductTitle = styled.p`
  font-size: 18px;
`;
const ProductId = styled.p`
  font-size: 18px;
`;
const ProductColor = styled.p`
  font-size: 18px;
`;
const ProductSize = styled.p`
  font-size: 18px;
`;
const ProductPrice = styled.p`
  font-size: 18px;
`;
const Span = styled.span`
  font-weight: 600;
  opacity: 0.5;
  margin-right: 4px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 600;
  opacity: 0.5;
`;
const CourirInfo = styled.div``;
const Courir = styled.div``;
const RadioWrappContent = styled.div`
  display: flex;
  gap: 20px;
`;
const RadioWrapp = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  width: 140px;
`;
const TextCourir = styled.p`
  position: absolute;
  transform: translate(10px, -22px);
  background: white;
  padding: 0 6px 0 6px;
`;
const Service = styled.div``;
const Weight = styled.div``;
const CourirPrice = styled.div``;
const PaymentInfo = styled.div`
  border-bottom: 0.5px solid #bbbbbb;
`;
const PaymentWrapp = styled.div`
  max-width: 500px;
`;
const BankInfo = styled.div`
  display: flex;
  gap: 20px;
  /* background: #bfdb38; */
  justify-content: space-between;
`;
const TextBank = styled.p`
  /* color: white; */
`;

const AmountWrapp = styled.div`
  margin-top: 10px;
  padding: 60px 0 60px 0;
  background: #fffefb;
`;
const AmountContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
  padding: 10px;
`;
const AmountText = styled.div``;

const Button = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  color: #ffff;
  border: none;
  background: #3330e4;
  font-weight: 600;
  cursor: pointer;
`;

const Checkout = () => {
  const [open, setOpen] = useState({});

  const handleToggle = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  return (
    <div>
      <Navbar />
      <Container>
        <ContentWrapp>
          <h1>checkout page</h1>
          <Wrapp>
            <SubTitle>Address</SubTitle>
            <Name>Bisma Reza Ferdian</Name>
            <Address>
              Jl. Raya Kby. Lama No.22, RT.4/RW.3, Grogol Utara, Kec. Kby. Lama,
              Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 11540
              (Belakang soto ragil), KOTA JAKARTA SELATAN - KEBAYORAN LAMA, DKI
              JAKARTA, ID 12210
            </Address>
          </Wrapp>
          <ProductWrapp>
            <SubTitle>Product Detail</SubTitle>
            <Content>
              <ProductImg>
                <Img
                  src={
                    "https://cdn.shopify.com/s/files/1/0259/7021/2909/products/AURORA_FD2596-600_PHSLH000-2000_1360x.jpg?v=1682138435"
                  }
                />
              </ProductImg>
              <DetailProduct>
                <ProductTitle>
                  <Span>Title:</Span>Nike Jordan 2{" "}
                </ProductTitle>

                <ProductId>
                  {" "}
                  <Span>Product Id:</Span>4324232402
                </ProductId>
                <ProductColor>
                  <Span>Color:</Span>red
                </ProductColor>
                <ProductSize>
                  <Span>Size:</Span>m
                </ProductSize>
                <ProductSize>
                  <Span>Total:</Span>1
                </ProductSize>
                <ProductPrice>
                  <Span>Price:</Span>rp 2.000.000
                </ProductPrice>
              </DetailProduct>
            </Content>
          </ProductWrapp>
          <Wrapp>
            <SubTitle> Courir info</SubTitle>
            <RadioWrappContent>
              <RadioWrapp>
                <TextCourir> courir</TextCourir>

                <Radio
                  checked={(e) => e.target.value === "a"}
                  //   onChange={handleChange}
                  value="a"
                  //   name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <Text>jne</Text>
              </RadioWrapp>
              <RadioWrapp>
                <TextCourir> courir</TextCourir>
                <Radio
                  //   checked={selectedValue === 'a'}
                  //   onChange={handleChange}
                  value="a"
                  //   name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <Text>j&t</Text>
              </RadioWrapp>
            </RadioWrappContent>
            <RadioWrappContent>
              <RadioWrapp>
                <TextCourir> serice</TextCourir>

                <Radio
                  //   checked={selectedValue === 'a'}
                  //   onChange={handleChange}
                  value="a"
                  //   name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <Text>regular</Text>
              </RadioWrapp>
              <RadioWrapp>
                <TextCourir> service</TextCourir>
                <Radio
                  //   checked={selectedValue === 'a'}
                  //   onChange={handleChange}
                  value="a"
                  //   name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <Text>yes</Text>
              </RadioWrapp>
            </RadioWrappContent>
            <Courir>
              <Span>Courir</Span>Jne
            </Courir>
            <Service>
              <Span>Service</Span>Regular
            </Service>
            <Weight>
              <Span>Weight</Span>1 kg
            </Weight>
            <CourirPrice>
              <Span>Price</Span>rp. 9.0000
            </CourirPrice>
          </Wrapp>
          <PaymentInfo>
            <SubTitle>Metode Payment</SubTitle>
            <PaymentWrapp>
              <ListItemButton onClick={() => handleToggle(1)}>
                {/* <ListItemIcon>inbox</ListItemIcon> */}
                <img
                  style={{ width: "140px" }}
                  src={
                    "https://res.cloudinary.com/websitemuid/image/upload/v1682582746/bca_lmqygl.png"
                  }
                  alt=""
                />
                {/* <ListItemText primary="BCA" /> */}
                {open[1] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BankInfo>
                        <TextBank>
                          A/N Bisma Reza Ferdian - 323234345454
                        </TextBank>
                        <ContentCopy />
                      </BankInfo>
                    </ListItemIcon>
                    {/* <ListItemText primary="A/N Bisma Reza Ferdian - 323234345454" /> */}
                  </ListItemButton>
                </List>
              </Collapse>
            </PaymentWrapp>
            <PaymentWrapp>
              <ListItemButton onClick={() => handleToggle(2)}>
                {/* <ListItemIcon>inbox</ListItemIcon> */}
                <img
                  style={{ width: "140px" }}
                  src={
                    "https://res.cloudinary.com/websitemuid/image/upload/v1682583036/Logo-Bank-Mandiri_l4rhbr.png"
                  }
                  alt=""
                />
                {/* <ListItemText primary="BRI" /> */}
                {open[2] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open[2]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BankInfo>
                        <TextBank>
                          A/N Bisma Reza Ferdian - 323234345454
                        </TextBank>
                        <ContentCopy />
                      </BankInfo>
                    </ListItemIcon>
                    {/* <ListItemText primary="Starred" /> */}
                  </ListItemButton>
                </List>
              </Collapse>
            </PaymentWrapp>
          </PaymentInfo>
          <AmountWrapp>
            <AmountContent>
              <AmountText>
                {" "}
                <Span>Subtotal untuk Product:</Span>Rp 1.400.000
              </AmountText>
              <AmountText>
                {" "}
                <Span>Total ongkos kirim:</Span>Rp.9.000
              </AmountText>
              <AmountText>
                <Span>Total pembayaran:</Span>Rp. 1.490.000
              </AmountText>

              <Button>Buat Pesanan</Button>
            </AmountContent>
          </AmountWrapp>
        </ContentWrapp>
      </Container>
    </div>
  );
};

export default Checkout;
