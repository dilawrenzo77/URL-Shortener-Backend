import { Router } from "express";
import { URLShortener } from "../controllers/urlShortController.js";
import { ShortURL } from "../controllers/urlShortController.js";
import { MustBeUser } from "../middleware/authMiddleware.js";
// import { MustBeUser } from "../middleware/authMiddleware.js";

const router:Router = Router();

router.post("/urlShortener",MustBeUser, URLShortener);
router.get("/:shortcode", ShortURL)


export default router;