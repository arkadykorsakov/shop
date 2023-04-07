import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getOrder = async (req, res) => {
  const email = req.session.username;
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  res.render("order", { title: "Order", email, isAdmin, isAuth });
};

export const postOrder = async (req, res) => {
  const { name, address, email } = req.body;
  const username = req.session.username;
  const user = await User.findOne({ email: username });
  const cart = req.session.cart;
  //   if (cart) {
  //     try {
  const order = new Order({ name, address, email, user, cart });
  await order.save();
  res.redirect("/");
  //     } catch (e) {}
  //   }
};
