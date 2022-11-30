import React from "react"
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../images/logo.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Header.css"

const options = {
  burgerColor: "lightgrey",
  burgerColorHover: "#eb4034",
  logo,
  CartIconElement: logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  CartIconElement: ShoppingCartIcon,
  cartIcon: true,
  link1Text: "Search",
  link2Text: "Products",
  link3Text: "Home",
  link4Text: "About",
  link1Url: "/search",
  link2Url: "/products",
  link3Url: "/",
  link4Url: "/about-us",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-end",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  cartIconUrl: "/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  searchIconElement: "../../../images/logo.png",
}

const Header = () => {
  return <ReactNavbar {...options} />
}

export default Header
