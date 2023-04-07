import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { getOrder, postOrder } from "../controllers/order.controller.js";

const router = Router();

router.get("/", isAuth, getOrder);

router.post("/", postOrder);

export default router;
