import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload

      const itemExistsInCart = state.cartItems.find(
        (i) => i.product === item.product
      )

      if (itemExistsInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExistsInCart.product ? item : i
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      }
    default:
      return state
  }
}
