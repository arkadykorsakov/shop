import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export function addCart(req, res) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
}

export function reduceCart(req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/cart");
}

export function removeCart(req, res, next) {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/cart");
}

export function getCart(req, res, next) {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  if (!req.session.cart) {
    return res.render("cart", {
      products: null,
      isAuth,
      isAdmin,
      isCart: true,
      title: "Cart",
    });
  }
  const cart = new Cart(req.session.cart);
  return res.render("cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    isAuth,
    isAdmin,
    isCart: true,
    title: "Cart",
  });
}
