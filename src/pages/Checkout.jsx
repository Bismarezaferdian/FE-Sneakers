import {
  ContentCopy,
  ExpandLess,
  ExpandMore,
  StarBorder,
} from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Radio,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { fetchData } from "../useFetch";

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

const FormWrapp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Checkout = () => {
  const [open, setOpen] = useState({});
  const cart = useSelector((state) => state?.cart);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [cost, setCost] = useState([]);
  const [select, setSelect] = useState({
    provinceId: "",
    cityId: "",
    courier: "",
    costs: undefined,
  });

  const handleToggle = (index) => {
    setOpen((prevOpen) => ({ ...prevOpen, [index]: !prevOpen[index] }));
  };

  useEffect(() => {
    const getProvince = async () => {
      const res = await fetchData.get(`/cekOngkir/province`);
      setProvince(res.data);
    };
    getProvince();
  }, []);

  useEffect(() => {
    const getCity = async () => {
      const res = await fetchData.get(`/cekOngkir/city/${select.provinceId}`);
      setCity(res.data);
    };
    if (select.provinceId !== "") {
      getCity();
    }
  }, [select.provinceId]);

  useEffect(() => {
    const getCost = async () => {
      const res = await fetchData.post("/cekOngkir/cost", {
        origin: "151",
        destination: select.cityId,
        weight: 1700,
        courier: select.courier,
      });
      // const data = res.data;
      setCost(res.data[0].costs);
    };
    if (select.cityId && select.courier !== "") {
      getCost();
    }
  }, [select.cityId, select.courier]);

  const handleSelect = (e) => {
    setSelect((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(select.costs.cost?.length);
  console.log(select.costs?.cost[0]);

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
            {cart.products.map((item, index) => (
              <Content key={index}>
                <ProductImg>
                  <Img src={item.imgDisplay} />
                </ProductImg>
                <DetailProduct>
                  <ProductTitle>
                    <Span>Title:</Span>
                    {item.title}{" "}
                  </ProductTitle>

                  <ProductId>
                    {" "}
                    <Span>Product Id:</Span>
                    {item.id}
                  </ProductId>
                  <ProductColor>
                    <Span>Color:</Span>
                    {item.variant.color}
                  </ProductColor>
                  <ProductSize>
                    <Span>Size:</Span>
                    {item.variant.size}
                  </ProductSize>
                  <ProductSize>
                    <Span>Total:</Span>
                    {item.quantity}
                  </ProductSize>
                  <ProductPrice>
                    <Span>Price:</Span>rp {item.price}
                  </ProductPrice>
                </DetailProduct>
              </Content>
            ))}
          </ProductWrapp>
          <Wrapp>
            <SubTitle> Shipping</SubTitle>
            <FormWrapp>
              {/* <Span>Provinsi</Span> */}
              <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select.provinceId || ""}
                  onChange={handleSelect}
                  label="Province"
                  name="provinceId"
                  // onChange={handleChange}
                >
                  {province?.map((item, index) => (
                    <MenuItem value={item.province_id} key={index}>
                      {item.province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormWrapp>
            <FormWrapp>
              {/* <Span> Kota</Span> */}
              <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select.cityId || ""}
                  label="City"
                  onChange={handleSelect}
                  name="cityId"
                >
                  {city.map((item, index) => (
                    <MenuItem value={item.city_id} key={index}>
                      {item.city_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormWrapp>
            <FormWrapp>
              {/* <Span> Kurir</Span> */}
              <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Courir </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select.courier || ""}
                  label="Courier"
                  name="courier"
                  onChange={handleSelect}
                >
                  <MenuItem value="jne">JNE</MenuItem>
                  <MenuItem value="pos">POS indonesia</MenuItem>
                  <MenuItem value="tiki">TIKI</MenuItem>
                </Select>
              </FormControl>
            </FormWrapp>
            <FormWrapp>
              {/* <Span> Service</Span> */}
              <FormControl sx={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Service</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={select.costs || " "}
                  defaultValue=""
                  label="Service"
                  onChange={handleSelect}
                  name="costs"
                >
                  {cost.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item.service}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormWrapp>
            <CourirPrice>
              <Text>
                {" "}
                <Span>Ongkos Kirim : </Span> Rp.{select.costs?.cost[0]?.value}
              </Text>
            </CourirPrice>
            <Span>Estimasi day {select.costs?.cost[0]?.etd} days</Span>
          </Wrapp>
          <PaymentInfo>
            <SubTitle>Metode Payment</SubTitle>
            <PaymentWrapp>
              <ListItemButton onClick={() => handleToggle(1)}>
                <img
                  style={{ width: "140px" }}
                  src={
                    "https://res.cloudinary.com/websitemuid/image/upload/v1682582746/bca_lmqygl.png"
                  }
                  alt=""
                />
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
                  </ListItemButton>
                </List>
              </Collapse>
            </PaymentWrapp>
            <PaymentWrapp>
              <ListItemButton onClick={() => handleToggle(2)}>
                <img
                  style={{ width: "140px" }}
                  src={
                    "https://res.cloudinary.com/websitemuid/image/upload/v1682583036/Logo-Bank-Mandiri_l4rhbr.png"
                  }
                  alt=""
                />
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
                <Span>Subtotal untuk Product:</Span>Rp {cart.total}
              </AmountText>
              <AmountText>
                <Text>
                  {" "}
                  <Span>Total Ongkos Kirim : </Span> Rp.
                  {select.costs?.cost[0]?.value}
                </Text>{" "}
              </AmountText>
              <AmountText>
                <Text>
                  <Span>Total pembayaran:</Span>Rp.
                  {select.costs && cart.total
                    ? cart.total + select.costs?.cost[0]?.value
                    : ""}
                </Text>
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
