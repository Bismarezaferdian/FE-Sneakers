import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 40vh;
  /* width: 30vh; */
  /* background-color: red; */
  border-radius: 50%;
  position: relative;
  ${tablet({ height: "12vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${tablet({ height: "83px", width: "83px" })}
`;

// const Info = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const Title = styled.h1`
//   color: white;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   border: none;
//   padding: 10px;
//   background-color: white;
//   color: gray;
//   cursor: pointer;
//   font-weight: 600;
// `;

const CategoryItem = ({ item }) => {
  return (
    <Link>
      <Container>
        <Image src={item.img} />
      </Container>
    </Link>
  );
};

export default CategoryItem;
