import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { revertAll } from "../redux/action";
import { mobile, tablet } from "../responsive";
import { logout } from "../redux/userRedux";
import {
  AccountCircleRounded,
  ArrowRight,
  Close,
  DensityLarge,
  ExpandLess,
  ExpandMore,
  Person,
  Receipt,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const Container = styled.nav`
  position: sticky;
  /* top: 0; */
  z-index: 900;
  /* height: 80px; */
  background: #3330e4;
  display: flex;
  padding: 10px;
  align-items: center;
  ${mobile({ height: "50px" })}/* justify-content: space-between; */
`;

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  width: 100%;
  align-items: center;
  /* overflow: hidden; */
  ${tablet({ padding: "10px 0px" })}/* align-items: center; */
  /* justify-content: space-between; */
`;

const BurgerIcon = styled(DensityLarge)`
  display: none;
  ${tablet({ display: "flex", color: "#ffff", cursor: "pointer" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  ${tablet({ display: "none", width: "100%" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  margin-right: 5px;
  box-shadow: none;
  &:active {
    outline: none;
    box-shadow: none;
  }
  ${mobile({ width: "50px" })}
`;

const ShoppingCart = styled(ShoppingCartOutlined)`
  color: #ffff;
`;

const TxtOrder = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #f9f9f9;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  z-index: 999;
  transition: visibility 0s, opacity 0.3s linear;
`;

const Order = styled(Receipt)`
  color: #ffff;
`;

const TxtCart = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #444141;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #f9f9f9;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  z-index: 999;
  transition: visibility 0s, opacity 0.3s linear;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  height: 100%;
  align-items: center;
  /* align-items: center; */
  /* justify-content: center; */
  flex-direction: column;
  ${tablet({
    // alignItems: "star",
    marginLeft: "10px",
  })}
`;

const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
  /* margin-top: 20px; */
  /* color:  #000000; */
`;

const TextLogo = styled.span`
  ${tablet({})}
`;

const NavWrapLink = styled.div`
  display: flex;
  align-items: end;
  margin-top: 10px;
  justify-content: space-between;
  ${tablet({ display: "none" })}
`;

const NavLink = styled.button`
  color: #ffffff;
  font-size: 14px;
  background: none;
  border: none;
  /* margin: 0 10px; */
  padding: 0 10px;
  cursor: pointer;
`;
const NavLink1 = styled.div`
  /* display: none;
  height: 50%; */
  display: none;
  /* position: absolute; */
  /* background-color: #d91e1e; */
  height: 20vh;
  background-color: #f9f9f9;
  /* width: 500px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow: hidden;
`;
const SubNavLink = styled.button`
  /* border: none;
  text-align: start;
  padding: 10px;
  color: #5d697a; */
  float: none;
  color: #5d697a;
  margin: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  border: none;
  background: none;
  &:hover {
    color: #000000;
  }
`;

const NavLinkWrapp = styled.div`
  float: left;
  overflow: hidden;
  &:hover ${NavLink1} {
    display: block;
    /* max-width: 50px; */
    /* flex-direction: column; */
    position: absolute;
  }
`;

const ButtonLink = styled.button`
  font-size: 14px;
  color: #ffff;
  border: none;
  background: none;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${tablet({
    display: "flex",
    position: "absolute",
    transform: "translate(220px,0)",
  })}
`;

export const UserIcon = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconUser = styled(AccountCircleRounded)`
  color: #ffffff;
`;

export const Name = styled.h1`
  font-size: 18px;
  color: #ffffff;
`;

const MenuItems = styled.div`
  display: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  gap: 20px;
  text-decoration: none;
  color: #000000;
  white-space: nowrap;
  &:hover ${TxtOrder} {
    visibility: visible;
    opacity: 1;
  }
  :nth-child(1) {
    color: white;
    text-decoration: none;
  }
  ${tablet({ display: "flex", fontSize: "18px", marginLeft: "10px" })}
`;

const LoginWrapp = styled.div`
  display: flex;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  gap: 20px;
  text-decoration: none;
  color: #ffff;
  white-space: nowrap;
`;

const OrderIconWrapp = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  gap: 20px;
  text-decoration: none;
  color: #000000;
  &:hover ${TxtOrder} {
    visibility: visible;
    opacity: 1;
  }
  :nth-child(1) {
    color: white;
    text-decoration: none;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const CartIconWrapp = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  gap: 20px;
  text-decoration: none;
  color: #000000;
  &:hover ${TxtCart} {
    visibility: visible;
    opacity: 1;
  }
  :nth-child(1) {
    color: white;
    text-decoration: none;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ togle, isOpen }) => {
  const [sortProduct, setSortProduct] = useState("");
  const [productFilters, setProductfilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const qty = useSelector((state) => state.cart.qty);
  const qtyOrder = useSelector((state) => state.order.products);
  const allProduct = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isopen, setIsopen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const { categories } = useSelector((state) => state?.categorie);
  //sidebar

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsopen(!isopen);
  };

  console.log(qtyOrder);

  //input search di ambil dari filter title
  //seharusnya di cari dari database langsung
  useEffect(() => {
    if (sortProduct) {
      const data = allProduct.filter((item) =>
        item.title.toLowerCase().includes(sortProduct)
      );
      setProductfilters(data);
    }
  }, [sortProduct, allProduct]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products", { state: { productFilters } });
  };

  const handleNavLink = (value) => {
    navigate(value === "New Arrival" ? "/products" : `/products/${value}`);
    // setIsopen(!isopen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(revertAll());
    dispatch(logout());
    navigate("/login");
  };

  ///

  const open = Boolean(anchorEl);
  const handleModal = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // sidebar
  const list = () => (
    <List
      sx={{
        width: "80vw",
        maxWidth: "100vw",
        height: "200vh",
        mixHeight: "100vh",
        bgcolor: "#3330e4;",
        color: "white",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      onClose={toggleDrawer()}
    >
      {/* navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#3330e4",
          boxShadow: "none",
          padding: "10px ",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer()}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            SNEAKERS
          </Typography>
        </Toolbar>
      </AppBar>
      <ListItemButton
        onClick={toggleDrawer()}
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        {/* <ListItemIcon>
      <SendIcon />
    </ListItemIcon> */}
        <ListItemText
          primary="New Arrival"
          onClick={() => handleNavLink("New Arrival")}
        />
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
          bgcolor: "#3330e4;",
        }}
      >
        <ListItemText primary="Mens" onClick={() => handleNavLink("men")} />
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <ListItemText primary="Womens" onClick={() => handleNavLink("women")} />
      </ListItemButton>
      <ListItemButton
        onClick={() => setCollapse(!collapse)}
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <ListItemText primary="Brands" />
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map((item, i) => (
            <ListItemButton
              key={i}
              sx={{
                borderBottom: "1px solid gray ",
                ml: 4.5,
              }}
            >
              <ListItemText
                primary={item.brand}
                onClick={() => handleNavLink(item.brand)}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <ListItemButton
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <ListItemText primary="Shoes" onClick={() => handleNavLink("shoes")} />
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid gray ",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <ListItemText
          primary="Apparel"
          onClick={() => handleNavLink("apparel")}
        />
      </ListItemButton>
    </List>
  );

  return (
    <Container>
      <Wrapper>
        <MenuItems>
          <BurgerIcon onClick={toggleDrawer()} />
        </MenuItems>
        {/* sidebar */}
        <Drawer anchor={"left"} open={isopen} onClose={toggleDrawer()}>
          {list()}
        </Drawer>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              onChange={(e) => setSortProduct(e.target.value.toLowerCase())}
            />
            <Search
              onClick={handleSearch}
              style={{ color: "white", fontSize: 16 }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo to={"/"}>
            <TextLogo>SNEAKERS</TextLogo>
          </Logo>
          <NavWrapLink>
            <NavLink onClick={() => handleNavLink("New Arrival")}>
              NEW ARRIVAL
            </NavLink>
            <NavLink onClick={() => handleNavLink("men")}> MEN</NavLink>
            <NavLink onClick={() => handleNavLink("women")}> WOMEN</NavLink>
            <NavLinkWrapp>
              <ButtonLink>BRAND</ButtonLink>
              <NavLink1>
                <SubNavLink onClick={() => handleNavLink("adidas")}>
                  ADIDAS
                </SubNavLink>
                <SubNavLink onClick={() => handleNavLink("vans")}>
                  VANS
                </SubNavLink>
                <SubNavLink onClick={() => handleNavLink("converse")}>
                  CONVERSE
                </SubNavLink>
                <SubNavLink onClick={() => handleNavLink("nike")}>
                  NIKE
                </SubNavLink>
              </NavLink1>
            </NavLinkWrapp>
            <NavLink onClick={() => handleNavLink("shoes")}>SHOES</NavLink>
            <NavLink onClick={() => handleNavLink("apparel")}>APPAREL</NavLink>
          </NavWrapLink>
        </Center>

        <Right>
          {/* Order belanja */}
          {user && (
            <OrderIconWrapp>
              <Link to={"/Order"}>
                <Badge badgeContent={qtyOrder.length} color="error">
                  <Order />
                  <TxtOrder>Order</TxtOrder>
                </Badge>
              </Link>
            </OrderIconWrapp>
          )}
          {user && (
            <CartIconWrapp>
              <Link to={"/cart"}>
                <Badge badgeContent={qty} color="error">
                  <ShoppingCart />
                  <TxtCart>shoppic cart</TxtCart>
                </Badge>
              </Link>
            </CartIconWrapp>
          )}

          {/* keranjang belaja */}
        </Right>
        {user ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleModal}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    "bisma"
                    {/* <UserName>{name}</UserName> */}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem disabled>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem disabled>
                <Avatar /> My account
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <LoginWrapp>
                <Person />
              </LoginWrapp>
            </Link>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
