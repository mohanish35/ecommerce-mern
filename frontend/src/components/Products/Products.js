import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import Pagination from "react-js-pagination"
import { useAlert } from "react-alert"
import { Slider, Typography } from "@material-ui/core"

import { clearErrors, getProducts } from "../../actions/productActions"
import ProductCard from "../Home/ProductCard.js"
import Loader from "../Layout/Loader/Loader"
import MetaData from "../Layout/MetaData.js"

import "./Products.css"

const categories = [
  "Accessories",
  "Bikinis",
  "Children's T-Shirts",
  "Dresses",
  "Footwear",
  "Hoodies",
  "Skirts",
  "T-shirts",
  "Tops",
]

const Products = () => {
  const dispatch = useDispatch()
  const { keyword } = useParams()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const {
    products,
    loading,
    error,
    // productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const [price, setPrice] = useState([0, 500])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings))
  }, [dispatch, currentPage, price, keyword, category, ratings, alert, error])

  const priceHandler = (event, newPrice) => {
    setCurrentPage(1)
    setPrice(newPrice)
  }

  let count = filteredProductsCount

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            <div className="filterBox">
              <Typography component="legend">Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={500}
              />

              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((cat) => (
                  <li
                    className={`category-link ${
                      cat === category ? "selected-category" : ""
                    }`}
                    key={category}
                    onClick={() => {
                      setCurrentPage(1)
                      if (cat === category) {
                        setCategory("")
                      } else {
                        setCategory(cat)
                      }
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setCurrentPage(1)
                    setRatings(newRating)
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
            {resultsPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultsPerPage}
                  totalItemsCount={count}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products
