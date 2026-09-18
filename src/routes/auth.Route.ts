import { Router } from "express";
import { Register, Login, Logout } from "../controllers/authController.js";
import { MustBeUser } from "../middleware/authMiddleware.js";

const router:Router = Router();


router.post("/register",Register);
router.post("/login", Login)
router.get("/logout", MustBeUser, Logout)

export default router;