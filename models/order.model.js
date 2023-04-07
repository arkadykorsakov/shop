import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user: { type: Object, required: true },
  cart: { type: Object, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Order = model("Order", orderSchema);

export default Order;
