import { Router } from "express";
import { loginUser, logOut, registerUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logOut);

export default router;
