import React, { Fragment, useEffect, useState } from "react"
import Carousel from "react-material-ui-carousel"
import ReactStars from "react-rating-stars-component"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useAlert } from "react-alert"

import ReviewCard from "./ReviewCard.js"
import { clearErrors, getProductDetails } from "../../actions/productActions"
import Loader from "../Layout/Loader/Loader.js"
import { addItemsToCart } from "../../actions/cartActions"

import "./ProductDetails.css"

const ProductDetails = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )
  const { id } = useParams()

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert])

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  }

  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    if (quantity >= 5) return

    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return

    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success("Item Added To Cart")
  }

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="ProductDetails">
        <Carousel>
          {product.images &&
            product.images.map((item, idx) => {
              return (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${idx} Slide`}
                />
              )
            })}
        </Carousel>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numberOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`$${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>{" "}
              <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description : <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Review</button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  )
}

export default ProductDetails
