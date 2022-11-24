import catchAsyncError from "../middlewares/catchAsyncError.js"
import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"

// create product -- admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
})

// get all products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})

// get product details
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

// update product -- admin
export const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    product,
  })
})

// update product -- admin
export const deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404))
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  })
})
