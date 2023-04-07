import { Router } from "express";
import {
  getOffice,
  putOffice,
  deleteOffice,
} from "../controllers/office.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/", isAuth, getOffice);
router.put("/", putOffice);
router.delete("/", deleteOffice);

export default router;
