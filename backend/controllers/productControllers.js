import catchAsyncError from "../middlewares/catchAsyncError.js"
import Product from "../models/productModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import ApiFeatures from "../utils/apiFeatures.js"

// create product -- admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
})

// get all products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = 5
  const productCount = await Product.countDocuments()
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resultsPerPage)
  const products = await apiFeature.query

  res.status(200).json({
    success: true,
    products,
    productCount,
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
export const updateProduct = catchAsyncError(async (req, res, next) => {
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

// delete product -- admin
export const deleteProduct = catchAsyncError(async (req, res, next) => {
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

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  )

  if (isReviewed) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating
        rev.comment = comment
      }
    })
  } else {
    product.reviews.push(review)
    product.numberOfReviews = product.reviews.length
  }

  // average of all ratings for a product
  let averageRatings = 0
  product.reviews.forEach((rev) => {
    averageRatings += rev.rating
  })
  product.ratings = averageRatings / product.reviews.length

  await product.save({
    validateBeforeSave: false,
  })

  res.status(200).json({
    success: true,
  })
})

export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  res.status(200).json({
    success: true,
    review: product.reviews,
  })
})

export const deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  const numberOfReviews = reviews.length

  // average of all ratings for a product
  let averageRatings = 0
  reviews.forEach((rev) => {
    averageRatings += rev.rating
  })
  averageRatings = numberOfReviews
    ? averageRatings / numberOfReviews
    : averageRatings

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings: averageRatings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  res.status(200).json({
    success: true,
  })
})
