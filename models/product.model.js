import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: [
    {
      ref: "Category",
      type: Schema.Types.ObjectId,
    },
  ],
  image: {
    type: String,
    default: "",
  },
});

const Product = model("Product", productSchema);
export default Product;
