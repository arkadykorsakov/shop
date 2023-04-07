import { Router } from "express";
import {
  getRegistration,
  getLogin,
  postRegistration,
  postLogin,
  getLogout,
} from "../controllers/auth.controller.js";
import { isNotAuth } from "../middleware/isNotAuth.js";
import { isAuth } from "../middleware/isAuth.js";

const router = Router();

router.get("/registration", isNotAuth, getRegistration);
router.get("/login", isNotAuth, getLogin);
router.get("/logout", isAuth, getLogout);

router.post("/registration", postRegistration);
router.post("/login", postLogin);

export default router;
