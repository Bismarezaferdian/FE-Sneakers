import styled from "styled-components";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { tablet } from "../responsive";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.p`
  margin: 20px;
  font-size: 18px;
  font-weight: 600;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${tablet({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${tablet({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${tablet({ margin: "4px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  // const { state } = useLocation();
  // const { productFilters } = state;
  const location = useLocation();
  const id = location.pathname?.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState();
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value?.toLowerCase(),
    });
  };

  return (
    <Container>
      <Announcement />
      <Title>{id ? id : "allProduct"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc"> Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {/* {productFilters && "Product yang anda cari tidak ada"} */}
      <Products filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;

// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Newsletter from "../components/Newsletter";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";

// import { addToCart } from "../redux/cartRedux";
// import { mobile } from "../responsive";
// import { fetchData } from "../useFetch";
// import Sliders from "../components/Slider";
// import { updatecart } from "../redux/apiCall";
// import { Add, Remove } from "@mui/icons-material";

// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 50px;
//   display: flex;
//   ${mobile({ padding: "10px", flexDirection: "column" })}
// `;

// const ImgContainer = styled.div`
//   flex: 1;
//   padding: 20px 40px;
//   display: flex;
//   /* max-height: 60vh; */
//   /* width: 300px;
//   height: 400px; */
//   position: relative;
//   overflow: hidden;
//   ${mobile({ display: "none" })}
// `;

// // const Image = styled.img`
// //   width: 100%;
// //   height: 90vh;
// //   object-fit: cover;
// //   ${mobile({ height: "40vh" })}
// // `;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 0px 50px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 200;
// `;

// const Desc = styled.p`
//   margin: 20px 0px;
// `;

// const Price = styled.span`
//   font-weight: 100;
//   font-size: 40px;
// `;

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

// const FilterColor = styled.select`
//   /* width: 20px;
//   height: 20px; */
//   /* border-radius: 50%; */

//   /* background-color: ${(props) => props.color}; */
//   margin-left: 10px;

//   cursor: pointer;
// `;

// const FilterSize = styled.div`
//   display: flex;
//   margin-left: 10px;
//   /* padding: 5px; */
//   gap: 20px;
// `;

// const FilterOptionColor = styled.option`
//   padding: 20px;
//   display: flex;
//   border: 1px solid #000000;
//   padding: 10px;
//   white-space: nowrap;
// `;
// const FilterOptionSize = styled.button`
//   display: flex;
//   border: ${(props) =>
//     props.clicked ? "1px solid #000000" : "1px solid #e8e2e2"};
//   padding: 10px;
//   color: ${(props) => (props.clicked ? "#000000" : "#afb9c8")};
//   background-color: ${(props) => (props.clicked ? "#d6e4e5" : " #ffffff")};
//   white-space: nowrap;
//   cursor: pointer;

//   /* &.active {
//     color:
//     background-color: #d6e4e5;
//   } */
// `;

// const AddContainer = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover {
//     background-color: #f8f4f4;
//   }
// `;

// const Product = () => {
//   const location = useLocation();
//   const id = location.pathname.split("/")[2];
//   const [product, setProduct] = useState({});
//   const [size, setSize] = useState(undefined);
//   const [color, setColor] = useState(undefined);
//   const [quantity, setQuantity] = useState(1);
//   const [clicked, setClicked] = useState(false);
//   const [errorSize, setErrorSize] = useState(false);
//   const [errorColor, setErrorColor] = useState(false);
//   const userId = useSelector((state) => state.user.currentUser?._id);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [variants, setVariants] = useState();

//   useEffect(() => {
//     // dispatch(getProducts());
//     const getProductItem = async () => {
//       try {
//         const res = await fetchData.get(`/products/find/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         // setError(error);
//         console.log(error);
//       }
//     };
//     getProductItem();
//   }, [id]);

//   const productVariant = product.variant;
//   useEffect(() => {
//     if (product?.variant) {
//       const variants = productVariant.reduce((acc, curr) => {
//         const variantExist = acc?.find((item) => item.color === curr.color);
//         if (variantExist) {
//           variantExist.size.push({
//             size: curr.size,
//             stock: curr.stock,
//           });
//         } else {
//           acc.push({
//             color: curr.color,
//             size: [
//               {
//                 size: curr.size,
//                 stock: curr.stock,
//               },
//             ],
//           });
//         }
//         return acc;
//       }, []);
//       setVariants(variants);
//     }
//   }, [product.variant, productVariant]);

//   const handleQty = (type) => {
//     if (type === "desc") {
//       quantity > 1 && setQuantity(quantity - 1);
//     } else if (type === "asc") {
//       setQuantity(quantity + 1);
//     }
//   };

//   //
//   const handleClick = (item) => {
//     //membuat object baru
//     const newClicked = { ...clicked };
//     console.log(clicked);
//     Object.keys(newClicked).forEach((key) => {
//       //jika key tidak sama dengan item set semua ke false
//       //kondisi 1
//       //misal m= false saat di klik selain m false semua (m masih false)
//       //kondisi 2
//       //misal m = true saal di klik selain m false semua (m masih true)
//       if (key !== item) newClicked[key] = false;
//     });
//     //kondisi 1
//     //m false di isi dengan true
//     //kondisi 2
//     //m true di isi dengan false
//     newClicked[item] = !newClicked[item];
//     setClicked(newClicked);
//   };

//   const validate = () => {
//     if (size === undefined) setErrorSize(true);
//     if (color === undefined) setErrorColor(true);
//   };

//   useEffect(() => {
//     if (size) setErrorSize(false);
//     if (color) setErrorColor(false);
//   }, [size, color]);

//   // console.log(productChart);
//   const handleAddToChart = () => {
//     // const inCart = cart.find(
//     //   (cart) =>
//     //     cart._id === product._id &&
//     //     cart.color === products.color &&
//     //     cart.size === products.size
//     // );
//     if (!size || !color) {
//       validate();
//     } else if (userId) {
//       const { desc, imgDetail, categories, ...productChart } = product;
//       // const img = product.imgDisplay.imgUrl;
//       const products = {
//         ...productChart,
//         imgDisplay: product.imgDisplay.imgUrl,
//         size,
//         color,
//         quantity,
//       };
//       //ke api call untuk add cart di data base
//       updatecart(userId, { products: products }, dispatch);
//       //langsung ke cart redux untuk add cart di redux
//       dispatch(addToCart({ userId, products: products }));
//     } else {
//       alert("silahkan login dahulu");
//       navigate("/login");
//     }
//   };

//   return (
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Wrapper>
//         <ImgContainer>
//           <Swiper
//             pagination={{
//               type: "fraction",
//             }}
//             navigation={true}
//             modules={[Pagination, Navigation]}
//             className="mySwiper"
//           >
//             {product.imgDetail?.map((item, i) => (
//               <SwiperSlide key={i}>
//                 <Sliders item={item.imgUrl} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </ImgContainer>
//         <InfoContainer>
//           <Title>{product.title}</Title>
//           <Desc>{product.desc}</Desc>
//           <Price>{product.price}</Price>

//           <FilterContainer>
//             <Filter>
//               <FilterTitle>Color</FilterTitle>
//               <FilterColor onClick={(e) => setColor(e.target.value)}>
//                 {variants?.map((item, i) => (
//                   <FilterOptionColor key={i}>{item.color}</FilterOptionColor>
//                 ))}
//               </FilterColor>
//             </Filter>
//             {errorColor ? (
//               <span style={{ color: "red " }}>silahkan pilih warna</span>
//             ) : null}
//             <Filter>
//               <FilterTitle>Size</FilterTitle>
//               {variants?.map((item, i) => (
//                 <div style={{ display: "flex" }} key={i}>
//                   {item.size.map((size, j) => (
//                     <FilterSize
//                       key={j}
//                       onClick={(e) => setSize(e.target.value)}
//                     >
//                       <FilterOptionSize
//                         // key={item}
//                         clicked={clicked[size]}
//                         onClick={() => handleClick(size)}
//                         value={item.size}
//                       >
//                         {size.size}
//                       </FilterOptionSize>
//                     </FilterSize>
//                   ))}
//                 </div>
//               ))}
//             </Filter>
//             <Price>stock {product.stock}</Price>
//             {errorSize ? (
//               <span style={{ color: "red " }}>silahkan pilih ukuran</span>
//             ) : null}
//           </FilterContainer>
//           <AddContainer>
//             <AmountContainer>
//               <Remove onClick={() => handleQty("desc")} />
//               <Amount>{quantity}</Amount>
//               <Add onClick={() => handleQty("asc")} />
//             </AmountContainer>
//             <Button onClick={handleAddToChart}>ADD TO CART</Button>
//           </AddContainer>
//         </InfoContainer>
//       </Wrapper>
//       <Newsletter />
//       <Footer />
//     </Container>
//   );
// };

// export default Product;
