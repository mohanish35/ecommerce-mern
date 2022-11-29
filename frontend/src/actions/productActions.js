import axios from "axios"

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstant"

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 500], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      }) 

      const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${
        price[0]
      }&price[lte]=${price[1]}&ratings[gte]=${ratings}${category ? `&category=${category}` : ""}`
      const { data } = await axios.get(link)

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      })
    }
  }

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })

    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
