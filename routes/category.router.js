import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getCategories,
  getCategoriesAdd,
  postCategoriesAdd,
  getByIdCategoryEdit,
  putByIdCategoryEdit,
  deleteByIdCategory,
} from "../controllers/category.controller.js";
const router = Router();

router.get("/", isAuth, isAdmin, getCategories);
router.get("/:id/edit", isAuth, isAdmin, getByIdCategoryEdit);
router.get("/add", isAuth, isAdmin, getCategoriesAdd);

router.put("/:id/edit", putByIdCategoryEdit);

router.delete("/:id/delete", deleteByIdCategory);

router.post("/add", postCategoriesAdd);

export default router;
