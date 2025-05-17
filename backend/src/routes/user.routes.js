import { Router } from "express";
import { deleteUser, getAllUsers, loginUser, logOut, registerUser, updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/register", upload.single("profile"), registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logOut);
router.get("/get-all-users", isAuthenticated, getAllUsers);
router.put("/update-user/:userId", isAuthenticated, upload.single("profile"), updateUser);
router.delete("/delete-user/:userId", isAuthenticated, deleteUser);
export default router;
