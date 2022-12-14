import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"
import React from "react"

import Header from "./components/Layout/Header/Header.js"
import Footer from "./components/Layout/Footer/Footer.js"
import Home from "./components/Home/Home.js"
import Products from "./components/Products/Products.js"
import Cart from "./components/Cart/Cart.js"
import Search from "./components/Products/Search.js"
import ProductDetails from "./components/Products/ProductDetails.js"
import About from "./components/Layout/About/About.js"
import NotFound from "./components/NotFound/NotFound.js"

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilaka"],
      },
    })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/about-us" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
