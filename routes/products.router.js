import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductByIdEdit,
  getProductsAdd,
  postProductsAdd,
  putProductByIdEdit,
  deleteProductById,
} from "../controllers/products.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { upload } from "../middleware/uploadImage.js";
const router = Router();

router.get("/", isAuth, getProducts);
router.get("/add", isAuth, isAdmin, getProductsAdd);
router.get("/:id", isAuth, getProductById);
router.get("/:id/edit", isAuth, isAdmin, getProductByIdEdit);

router.post("/add", isAuth, isAdmin, upload.single("image"), postProductsAdd);

router.delete("/:id/delete", isAuth, isAdmin, deleteProductById);

router.put(
  "/:id/edit",
  isAuth,
  isAdmin,
  upload.single("image"),
  putProductByIdEdit
);

export default router;
