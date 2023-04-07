import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

const { compareSync, genSaltSync, hashSync } = bcryptjs;

export const getOffice = async (req, res) => {
  const email = req.session.username;
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const error = req.session.error;
  delete req.session.error;
  try {
    const user = await User.findOne({ email });
    if (isAdmin) {
      res.render("office", {
        title: "Office",
        isOffice: true,
        isAuth,
        isAdmin,
        user,
        error,
      });
    } else {
      Order.find({ user: req.username }, function (err, orders) {
        if (err) {
          return res.write("Error!");
        }
        let cart;

        orders.forEach(function (order) {
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
          order.totalPrice = order.cart.totalPrice;
        });
        res.render("office", {
          title: "Office",
          isOffice: true,
          isAuth,
          isAdmin,
          user,
          orders,
          error,
        });
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

export const putOffice = async (req, res) => {
  const userEmail = req.session.username;
  const { checkPassword, email, password } = req.body;
  const user = await User.findOne({ userEmail });
  if (compareSync(checkPassword, user.password)) {
    const candidate = await User.findOne({ email });
    if (!candidate || userEmail === email) {
      const salt = genSaltSync(10);
      try {
        await User.findByIdAndUpdate(user._id, {
          email,
          password: hashSync(password, salt),
        });
        req.session.username = email;
        res.redirect("/office");
      } catch (e) {
        errorHandler(res, e);
      }
    } else {
      req.session.error = "This email is already registered";
      res.redirect("/office");
    }
  } else {
    req.session.error = "Wrong password";
    res.redirect("/office");
  }
};

export const deleteOffice = async (req, res) => {
  const email = req.session.username;
  await User.deleteOne({ email });
  req.session.destroy((e) => {
    if (e) throw e;
    res.redirect("/login");
  });
};
