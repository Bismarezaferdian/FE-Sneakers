// import React, { useState } from "react";
// import {
//   ArrowDropDown,
//   Close,
//   Receipt,
//   ShoppingCartOutlined,
// } from "@mui/icons-material";
// import { Badge } from "@mui/material";

// import { Link, useNavigate } from "react-router-dom";
// import { mobile, tablet } from "../responsive";
// import { useSelector } from "react-redux";
// import styled from "styled-components";

// const Container = styled.section`
//   padding: 30px 20px 20px 20px;
//   position: fixed;
//   z-index: 999;
//   width: 100vw;
//   background-color: #3330e4;
//   left: 0px;
//   top: 0px;
//   transition: all 1.2s ease-in-out;
//   opacity: ${({ isOpen }) => (isOpen ? "1" : "0.5")};
//   top: ${(props) => (props.isOpen ? "0" : "-110%")};
//   max-height: 100%;
//   overflow-y: scroll;
// `;
// const ContentWrapp = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 90%;
//   padding-bottom: 400px;
// `;

// const HeaderWrapp = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const Logo = styled(Link)`
//   font-weight: bold;
//   text-decoration: none;
//   color: #ffffff;
// `;

// const ShoppingCart = styled(ShoppingCartOutlined)`
//   color: #ffff;
// `;

// const TextLogo = styled.span`
//   font-size: 19px;
// `;

// const TxtOrder = styled.div`
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: #333;
//   padding: 4px;
//   border-radius: 4px;
//   font-size: 10px;
//   color: #f9f9f9;
//   white-space: nowrap;
//   visibility: hidden;
//   opacity: 0;
//   z-index: 999;
//   transition: visibility 0s, opacity 0.3s linear;
// `;

// const Order = styled(Receipt)`
//   color: #ffff;
// `;

// const TxtCart = styled.span`
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: #333;
//   padding: 4px;
//   border-radius: 4px;
//   font-size: 10px;
//   color: #f9f9f9;
//   /* white-space: nowrap; */
//   visibility: hidden;
//   opacity: 0;
//   z-index: 999;
//   transition: visibility 0s, opacity 0.3s linear;
//   ${tablet({
//     // backgroundColor: "red",
//   })}
// `;

// const IconWrapp = styled.div`
//   display: flex;
//   width: 80px;
//   justify-content: flex-end;

//   :nth-child(1) {
//     justify-content: flex-start;
//   }
// `;

// const OrderIconWrapp = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   /* margin-left: 25px; */
//   /* gap: 20px; */
//   text-decoration: none;
//   &:hover ${TxtOrder} {
//     visibility: visible;
//     opacity: 1;
//   }
//   :nth-child(1) {
//     color: white;
//     text-decoration: none;
//   }
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

// const CartIconWrapp = styled.div`
//   font-size: 14px;
//   margin-left: 15px;
//   text-decoration: none;
//   color: #000000;
//   cursor: pointer;
//   &:hover ${TxtCart} {
//     visibility: visible;
//     opacity: 1;
//   }
//   :nth-child(1) {
//     color: white;
//     text-decoration: none;
//   }
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

// const BurgerIcon = styled(Close)`
//   color: #ffff;
//   cursor: pointer;
// `;
// const NavWrapp = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   justify-content: flex-start;
//   margin-top: 40px;
// `;

// const SubNavWrapp = styled.div`
//   /* position: absolute; */
//   display: ${(props) => (props.dropdown ? "flex" : "none")};
//   flex-direction: column;
//   top: 0;

//   margin-left: 28px;
//   width: 90%;
//   overflow: hidden;
//   transition: all 0.8s ease-in-out;
// `;
// const NavLink = styled.button`
//   display: flex;
//   justify-content: space-between;
//   padding: 8px;
//   border: none;
//   width: 100%;
//   text-align: start;
//   border-bottom: 1px solid gray;
//   background-color: #3330e4;
//   transition: all 0.8s ease-in-out;
// `;

// const TxtNav = styled.span`
//   padding: 10px 0;
//   font-size: 18px;
//   color: #ffff;
//   transition: all 0.8s ease-in-out;

//   &:nth-child(2) {
//     transform: ${(props) =>
//       props.dropdown ? "rotate(0deg)" : "rotate(-90deg)"};
//   }
// `;

// const IconDown = styled(ArrowDropDown)`
//   color: #ffff;
//   transition: all 0.8s ease-in-out;
// `;

// function Sidebar({ togle, isOpen }) {
//   const user = useSelector((state) => state.user.currentUser);
//   const qty = useSelector((state) => state.cart.qty);
//   const qtyOrder = useSelector((state) => state.order.orders);
//   const { categories } = useSelector((state) => state?.categorie);
//   const [dropdown, setDropdown] = useState(false);
//   const navigate = useNavigate();

//   const handleNavLink = (value) => {
//     navigate(value === "New Arrival" ? "/products" : `/products/${value}`);
//     togle();
//   };

//   console.log(dropdown);

//   return (
//     <Container isOpen={isOpen}>
//       <ContentWrapp>
//         <HeaderWrapp>
//           <IconWrapp onClick={togle}>
//             <BurgerIcon />
//           </IconWrapp>
//           <Logo to={"/"}>
//             <TextLogo>SNEAKERS</TextLogo>
//           </Logo>
//           <IconWrapp>
//             {user && (
//               <OrderIconWrapp>
//                 <Link to={"/Order"}>
//                   <Badge badgeContent={qtyOrder.length} color="error">
//                     <Order />
//                     <TxtOrder>Order</TxtOrder>
//                   </Badge>
//                 </Link>
//               </OrderIconWrapp>
//             )}
//             {user && (
//               <CartIconWrapp>
//                 <Link to={"/cart"}>
//                   <Badge badgeContent={qty} color="error">
//                     <ShoppingCart />
//                     <TxtCart>shopping cart</TxtCart>
//                   </Badge>
//                 </Link>
//               </CartIconWrapp>
//             )}
//           </IconWrapp>
//         </HeaderWrapp>
//         <NavWrapp>
//           <NavLink onClick={() => handleNavLink("New Arrival")}>
//             {" "}
//             <TxtNav>New Arrival</TxtNav>
//           </NavLink>
//           <NavLink onClick={() => handleNavLink("men")}>
//             {" "}
//             <TxtNav>Mens</TxtNav>
//           </NavLink>
//           <NavLink onClick={() => handleNavLink("women")}>
//             {" "}
//             <TxtNav>womens</TxtNav>
//           </NavLink>
//           <NavLink onClick={() => setDropdown(!dropdown)}>
//             {" "}
//             <TxtNav>Brans</TxtNav>
//             <TxtNav dropdown={!!dropdown}>
//               <IconDown />
//             </TxtNav>
//           </NavLink>
//           <SubNavWrapp dropdown={!!dropdown}>
//             {categories?.map((item, i) => (
//               <NavLink key={i} onClick={() => handleNavLink(item.brand)}>
//                 <TxtNav>{item.brand}</TxtNav>
//               </NavLink>
//             ))}
//           </SubNavWrapp>
//           <NavLink onClick={() => handleNavLink("shoes")}>
//             {" "}
//             <TxtNav>Shoes</TxtNav>
//           </NavLink>
//           <NavLink onClick={() => handleNavLink("apparel")}>
//             {" "}
//             <TxtNav>Apparel</TxtNav>
//           </NavLink>
//         </NavWrapp>
//       </ContentWrapp>
//     </Container>
//   );
// }

// export default Sidebar;

import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.section`
  padding: 30px 20px 20px 20px;
  position: fixed;
  z-index: 999;
  width: 100vw;
  background-color: #3330e4;
  left: 0px;
  top: 0px;
  transition: all 1.2s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0.5")};
  top: ${(props) => (props.isOpen ? "0" : "-110%")};
  max-height: 100%;
  overflow-y: scroll;
`;

function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <ListItemButton>
          {/* <ListItemIcon>
          <SendIcon />
        </ListItemIcon> */}
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton>
          {/* <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon> */}
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Container>
  );
}

export default Sidebar;
