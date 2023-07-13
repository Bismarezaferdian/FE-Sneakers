import React, { useEffect } from "react";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
// import Vidios from "../components/Vidios";
import Banner from "./Banner";
import NewArrival from "./NewArrival";
import RellsProducts from "./RellsProducts";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getOrder, getProducts } from "../redux/apiCall";
import { tablet } from "../responsive";
import BottomBanner from "./BottomBanner";

export const Countainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
  /* max-width: 1080px; */
`;

export const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
`;

export const Title = styled.p`
  font-size: 24px;
  display: grid;
  margin-left: 40px;
  font-weight: 600;
  ${tablet({ fontSize: "18px", margin: "10px 10px 0 10px " })}
`;

const Home = ({ togle, isOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    getCart(userId, dispatch);
    getOrder(userId, dispatch);
    getProducts(dispatch);
  }, [userId, dispatch]);

  // const togle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <ToastContainer />
      <Banner />
      <Countainer>
        <Wrapp>
          <Title>New Arrival</Title>
          <NewArrival />
          <Categories />
          <BottomBanner />
          {/* <Vidios /> */}
          <RellsProducts />
        </Wrapp>
      </Countainer>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
