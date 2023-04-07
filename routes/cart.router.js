import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  addCart,
  reduceCart,
  removeCart,
  getCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/add-to-cart/:id", isAuth, addCart);

router.get("/reduce/:id", isAuth, reduceCart);

router.get("/remove/:id", isAuth, removeCart);

router.get("/", isAuth, getCart);

export default router;
