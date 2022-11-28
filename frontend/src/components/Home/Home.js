import React, { Fragment, useEffect } from "react"
import { CgMouse } from "react-icons/cg"
import { useSelector, useDispatch } from "react-redux"

import { getProducts } from "../../actions/productActions.js"
import MetaData from "../Layout/MetaData.js"
import Product from "./Product.js"
import "./Home.css"

const Home = () => {
  const dispatch = useDispatch()
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Fragment>
      {loading ? (
        "Loading"
      ) : (
        <Fragment>
          <MetaData title="Ecommerce!"></MetaData>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW </h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
