import React, { Fragment, useEffect } from "react"
import { CgMouse } from "react-icons/cg"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"

import { getProducts } from "../../actions/productActions.js"
import MetaData from "../Layout/MetaData.js"
import ProductCard from "./ProductCard.js"
import Loader from "../Layout/Loader/Loader.js"

import "./Home.css"

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products  } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts())
  }, [dispatch, error, alert])

  return (
    <Fragment>
      {loading ? (
        <Loader />
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
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
