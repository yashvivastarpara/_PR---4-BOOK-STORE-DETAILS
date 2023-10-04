const mongoose = require('mongoose')

const data = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
  }, { timestamps: true }
)

const schema =mongoose.model("Book Store Details",data)


module.exports=schema
