import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { addToCart } from "../redux/cartRedux";
import { tablet } from "../responsive";
import { fetchData } from "../useFetch";
import Sliders from "../components/Slider";
import { updatecart } from "../redux/apiCall";
import { Add, Remove } from "@mui/icons-material";
import { errorMessage } from "../utils/Toastify";
import { ToastContainer } from "react-toastify";
import { formatRupiah } from "../utils/formatRupiah";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${tablet({
    padding: "10px",
    flexDirection: "column",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  padding: 20px 40px;
  display: flex;
  /* max-height: 60vh; */
  /* width: 300px;
  height: 400px; */
  position: relative;
  overflow: hidden;
  ${tablet({ padding: "10px" })}
`;

// const Image = styled.img`
//   width: 100%;
//   height: 90vh;
//   object-fit: cover;
//   ${mobile({ height: "40vh" })}
// `;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${tablet({ padding: "10px" })}
`;

const Title = styled.p`
  font-weight: 200;
  font-size: 28px;
  ${tablet({ fontSize: "24px", fontWeight: "500" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  ${tablet({ fontSize: "16px", fontWeight: "200" })}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  ${tablet({ fontSize: "18px", fontWeight: "400", color: "#5d697a" })}
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  ${tablet({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
  /* width: 20px;
  height: 20px; */
  /* border-radius: 50%; */

  /* background-color: ${(props) => props.color}; */
  margin-left: 10px;

  cursor: pointer;
`;

const FilterSize = styled.div`
  display: flex;
  margin-left: 10px;
  /* padding: 5px; */
  gap: 20px;
`;

const FilterOptionColor = styled.option`
  padding: 20px;
  display: flex;
  border: 1px solid #000000;
  padding: 10px;
  white-space: nowrap;
`;
const FilterOptionSize = styled.button`
  display: flex;
  border: ${(props) =>
    props.clicked ? "1px solid #000000" : "1px solid #e8e2e2"};
  padding: 10px;
  color: ${(props) => (props.clicked ? "#000000" : "#afb9c8")};
  background-color: ${(props) => (props.clicked ? "#d6e4e5" : " #ffffff")};
  white-space: nowrap;
  cursor: pointer;

  /* &.active {
    color: 
    background-color: #d6e4e5;
  } */
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  /* border: 2px solid teal; */
  background-color: #3330e4;
  border: none;
  border-radius: 4px;
  color: #ffff;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #1a1879;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const userId = useSelector((state) => state.user.currentUser?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [color, setColor] = useState(undefined);
  const [sizeDisplay, setSizeDisplay] = useState();
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState();
  const [variant, setVariant] = useState({
    color: "",
    size: "",
    stock: "",
    id: "",
  });
  const [clicked, setClicked] = useState(false);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    // dispatch(getProducts());
    const getProductItem = async () => {
      try {
        const res = await fetchData.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (error) {
        // setError(error);
        console.log(error);
      }
    };
    getProductItem();
  }, [id]);

  const productVariant = product.variant;

  useEffect(() => {
    if (product?.variant) {
      const variants = productVariant.reduce((acc, curr) => {
        const variantExist = acc?.find((item) => item.color === curr.color);
        if (variantExist) {
          variantExist.size.push({
            size: curr.size,
            stock: curr.stock,
            id: curr._id,
          });
        } else {
          acc.push({
            color: curr.color,
            size: [
              {
                size: curr.size,
                stock: curr.stock,
                id: curr._id,
              },
            ],
          });
        }
        return acc;
      }, []);

      setVariants(variants);
    }
  }, [product.variant, productVariant]);

  const handleQty = (type) => {
    if (type === "desc") {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (type === "asc") {
      setQuantity(quantity + 1);
    }
  };

  const handleColorChange = (e) => {
    setVariant((prev) => ({ ...prev, color: e }));
    setColor(e);
    setClicked(false);
  };

  const handleVariant = (e) => {
    setVariant((prev) => ({
      ...prev,
      id: e.id,
      size: e.size,
      stock: e.stock,
    }));
  };

  useEffect(() => {
    const data = variants?.find((item) => item.color === color);
    setSizeDisplay(data?.size);
  }, [color, variants]);

  //
  const handleClick = (item) => {
    //membuat object baru
    const newClicked = { ...clicked };
    Object.keys(newClicked).forEach((key) => {
      //jika key tidak sama dengan item set semua ke false
      //kondisi 1
      //misal m= false saat di klik selain m false semua (m masih false)
      //kondisi 2
      //misal m = true saal di klik selain m false semua (m masih true)
      if (key !== item) newClicked[key] = false;
    });
    //kondisi 1
    //m false di isi dengan true
    //kondisi 2
    //m true di isi dengan false
    newClicked[item] = !newClicked[item];
    setClicked(newClicked);
  };

  const rubValidate = () => {
    setValidate(true);
  };

  const handleAddToChart = () => {
    // const inCart = cart.find(
    //   (cart) =>
    //     cart._id === product._id &&
    //     cart.color === products.color &&
    //     cart.size === products.size
    // );
    if (!variant.color || !variant.size) {
      rubValidate();
    } else if (variant.stock <= 0) {
      errorMessage("product sudah habis !");
    } else if (userId) {
      const { desc, imgDetail, categories, ...productChart } = product;
      // const img = product.imgDisplay.imgUrl;
      const products = {
        ...productChart,
        imgDisplay: product.imgDisplay.imgUrl,
        variant,
        quantity,
      };

      //ke api call untuk add cart di data base
      updatecart(userId, { products: products }, dispatch);
      //langsung ke cart redux untuk add cart di redux
      dispatch(addToCart({ userId, products: products }));
    } else {
      alert("silahkan login dahulu");
      navigate("/login");
    }
  };

  // //2023-01-26T09:06:31.343Z
  // // " 25 September, 2021"

  // console.log(product.createdAt);

  // const getTime = (time) =>
  //   new Date(time).toLocaleString("id-ID", {
  //     timeZone: "Asia/Jakarta",
  //     dateStyle: "long",
  //   });

  // console.log(getTime(product.createdAt));

  return (
    <Container>
      <ToastContainer />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {product?.imgDetail?.map((item, i) => (
              <SwiperSlide key={i}>
                <Sliders item={item.imgUrl} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          {/* <Title>{toLocaleString(product.createdAt)}</Title> */}
          <Desc>{product.desc}</Desc>
          <Price>{formatRupiah(product.price)}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor onChange={(e) => handleColorChange(e.target.value)}>
                <FilterOptionColor value="">Selected Color</FilterOptionColor>
                {variants?.map((item, i) => (
                  <FilterOptionColor key={i} value={item.color}>
                    {item.color}
                  </FilterOptionColor>
                ))}
              </FilterColor>
            </Filter>
            {!color && validate && (
              <span style={{ color: "red " }}>silahkan pilih warna</span>
            )}
            <Filter>
              <FilterTitle>Size</FilterTitle>
              {sizeDisplay?.map((size, i) => (
                <div style={{ display: "flex" }} key={i}>
                  {/* {item.size.map((size, j) => ( */}
                  <FilterSize key={i} onClick={() => handleVariant(size)}>
                    <FilterOptionSize
                      // key={item}
                      clicked={clicked[size.size]}
                      onClick={() => handleClick(size.size)}
                      value={size.size}
                    >
                      {size.size}
                    </FilterOptionSize>
                  </FilterSize>
                  {/* ))} */}
                </div>
              ))}
            </Filter>
            {/* {variants?.map((item, i) =>
              item?.size?.map((size) => <Price>stock {size.stock}</Price>)
            )} */}
            {variant.stock && (
              <span style={{ color: variant.stock <= 1 ? "red " : "black" }}>
                {" "}
                sisa stock {variant.stock}
              </span>
            )}
            {/* {!color && validate && (
              <span style={{ color: "red " }}>silahkan pilih warna</span>
            )} */}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQty("desc")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQty("asc")} />
            </AmountContainer>
            <Button onClick={handleAddToChart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
