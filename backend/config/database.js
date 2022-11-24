import mongoose from "mongoose"

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((response) => {
      console.log(`MongoDB connected with: ${response.connection.host} 🤖 `)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default connectDatabase
