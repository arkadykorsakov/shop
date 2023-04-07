import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getCategories = async (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  try {
    const categories = await Category.find({}).lean();
    res.render("category", {
      title: "Category",
      isCategory: true,
      categories,
      isAuth,
      isAdmin,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

export const getCategoriesAdd = (req, res) => {
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const error = req.session.error;
  delete req.session.error;
  res.render("category-add", {
    title: "Add category",
    isAuth,
    isAdmin,
    isCategory: true,
    error,
  });
};

export const postCategoriesAdd = async (req, res) => {
  const { title } = req.body;
  const candidate = await Category.findOne({ title });
  if (candidate) {
    req.session.error = "This category already exists";
    res.redirect("/category/add");
  } else {
    const category = new Category({ title });
    try {
      await category.save();
      res.redirect("/category");
    } catch (e) {}
  }
};

export const getByIdCategoryEdit = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).lean();
  const isAuth = req.session.isAuth;
  const isAdmin = req.session.isAdmin;
  const error = req.session.error;
  delete req.session.error;
  res.render("category-edit", {
    title: "Edit category",
    category,
    isAuth,
    isAdmin,
    isCategory: true,
    error,
  });
};

export const putByIdCategoryEdit = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const candidate = await Category.findOne({ title }).lean();
  if (candidate) {
    req.session.error = "This category already exists";
    res.redirect(`/category/${id}/edit`);
  } else {
    try {
      await Category.findByIdAndUpdate(id, { title });
      res.redirect("/category");
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

export const deleteByIdCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndRemove(id);
    await Product.deleteMany({ category: id });
    res.redirect("/category");
  } catch (e) {
    errorHandler(res, e);
  }
};
