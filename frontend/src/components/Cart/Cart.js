import React, { Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

import CartItemCard from "./CartItemCard.js"
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../actions/cartActions.js"

import "./Cart.css"

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1

    if (5 < newQty) {
      return
    }

    dispatch(addItemsToCart(id, newQty))
  }

  const decreaseQuantity = (id, quantity, stock) => {
    const newQty = quantity - 1

    if (newQty < 1) {
      return
    }

    dispatch(addItemsToCart(id, newQty))
  }

  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id))
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`$${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button /*onClick={checkoutHandler}*/>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
