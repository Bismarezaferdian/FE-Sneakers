import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../redux/apiCall";
import Product from "./Product";
import { tablet } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${tablet({ padding: "10px" })}
`;

const Products = ({ cat, filters, sort }) => {
  const products = useLocation();
  const location = useLocation();
  // const state = products.state.productFilters;
  //product filter yang di ambil dari kolom search
  const state = products.state?.productFilters;
  const [productFilter, setProductFilter] = useState();
  const allProduct = useSelector((state) => state.product.products);
  // const loading = useSelector((state) => state.product);
  // console.log(loading);
  //product filter yang di ambil dari filter pathname / navlink
  const [product, setProduct] = useState(allProduct);
  const dispatch = useDispatch();
  const id = location.pathname?.split("/")[2];
  useEffect(() => {
    getProducts(dispatch, id);
    // getProducts(dispatch);
  }, [dispatch, id]);

  useEffect(() => {
    // getProducts(dispatch, id);
    setProduct(allProduct);
  }, [allProduct, dispatch, id]);

  useEffect(() => {
    setProductFilter(state);
  }, [state]);

  // useEffect(() => {
  // filters &&
  //   setProductFilters(
  //     allProduct.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   );
  // }, [allProduct, filters, productFilters]);

  // console.log(state);

  useEffect(() => {
    if (state) {
      if (sort === "newest") {
        setProductFilter((prev) =>
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else if (sort === "asc") {
        setProductFilter((prev) => [...prev].sort((a, b) => a.price - b.price));
      } else {
        setProductFilter((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    } else if (allProduct) {
      if (sort === "newest") {
        setProduct((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
      } else if (sort === "asc") {
        setProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
      } else if (sort === "desc") {
        setProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    }
  }, [sort, state, allProduct]);

  console.log(productFilter);
  return (
    <Container>
      {productFilter?.length > 0
        ? productFilter?.map((item) => <Product item={item} key={item._id} />)
        : product?.map((item) => <Product item={item} key={item._id} />)}
      {/* popularProduct di ganti dengan  product */}
    </Container>
  );
};

export default Products;
