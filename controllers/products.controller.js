import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

import { errorHandler } from "../utils/errorHandler.js";

export const getProducts = async (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  try {
    const products = await Product.find({}).lean();

    products.forEach(async (product) => {
      const category = await Category.findById(product.category);
      product.category = category.title;
    });
    res.render("products", {
      title: "Products",
      isProducts: true,
      isAuth,
      isAdmin,
      products,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const getProductsAdd = async (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const error = req.session.error;
  delete req.session.error;
  try {
    const categories = await Category.find({}).lean();
    res.render("product-add", {
      title: "Add new product",
      categories,
      isAuth,
      isAdmin,
      error,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const postProductsAdd = async (req, res) => {
  const { title, price, category: categoryId } = req.body;
  const candidate = await Product.findOne({ title }).lean();
  if (candidate) {
    req.session.error = "Such a product already exists";
    res.redirect("/products/add");
  } else {
    const category = await Category.findById(categoryId);
    const product = new Product({
      title,
      price,
      category: category,
      image: req.file ? req.file.path : "",
    });
    await product.save();
    res.redirect("/products");
  }
};

export const getProductById = async (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  const category = await Category.findById(product.category);
  product.category = category.title;
  res.render("product", {
    title: `Product ${product.title}`,
    isAuth,
    isAdmin,
    product,
  });
};

export const getProductByIdEdit = async (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const { id } = req.params;
  try {
    const product = await Product.findById(id).lean();
    const categories = await Category.find({}).lean();
    res.render("product-edit", {
      title: `Edit product ${product.title}`,
      isAuth,
      isAdmin,
      product,
      categories,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const putProductByIdEdit = async (req, res) => {
  const { id } = req.params;
  const { productTitle, title, price, category } = req.body;
  const candidate = await Product.findOne({ title }).lean();
  if (!candidate || productTitle === title) {
    const updated = { title, price, category };
    if (req.file) {
      updated.image = req.file.path;
    }
    try {
      await Product.findByIdAndUpdate(
        id,
        {
          $set: updated,
        },
        {
          new: true,
        }
      );
      res.redirect("/products");
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    req.session.error = "Such a product already exists";
    res.redirect("/products/add");
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);
    res.redirect("/products");
  } catch (e) {
    errorHandler(res, e);
  }
};
