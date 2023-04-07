import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

const { genSaltSync, hashSync, compareSync } = bcryptjs;

export const getRegistration = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("registration", {
    title: "Registration",
    isRegister: true,
    error,
  });
};

export const getLogin = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login", { title: "Log in", isLogin: true, error });
};

export const postRegistration = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email }).lean();
  if (candidate) {
    req.session.error = "Such a user already exists";
    res.redirect("/registration");
  } else {
    const salt = genSaltSync(10);
    const user = new User({ email, password: hashSync(password, salt) });
    try {
      await user.save();
      res.redirect("/login");
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (compareSync(password, user.password)) {
      req.session.isAuth = true;
      req.session.username = user.email;
      req.session.isAdmin = user.isAdmin;
      res.redirect("/office");
    } else {
      req.session.error = "Wrong password";
      res.redirect("/login");
    }
  } else {
    req.session.error = "User not found";
    res.redirect("/login");
  }
};

export const getLogout = (req, res) => {
  req.session.destroy((e) => {
    if (e) throw e;
    res.redirect("/login");
  });
};
