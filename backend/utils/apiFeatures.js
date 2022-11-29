class ApiFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          $or: [
            {
              name: {
                $regex: this.queryString.keyword,
                $options: "i",
              },
            },
            {
              sku: {
                $regex: this.queryString.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {}

    this.query = this.query.find({ ...keyword })

    return this
  }

  filter() {
    // creating a new reference
    const queryCopy = { ...this.queryString }

    // removing fields
    const removeFields = ["keyword", "page", "limit"]
    removeFields.forEach((key) => delete queryCopy[key])

    // filter for price and rating
    let queryString = JSON.stringify(queryCopy)
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    )

    this.query = this.query.find(JSON.parse(queryString))

    return this
  }

  paginate(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1
    const skipItems = resultsPerPage * (currentPage - 1)

    this.query = this.query.limit(resultsPerPage).skip(skipItems)

    return this
  }
}

export default ApiFeatures
