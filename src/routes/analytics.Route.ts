import { Router } from "express";
import { Analytics } from "../controllers/analyticsController.js";


const router:Router = Router();


router.get("/userAnalytics/:userId",Analytics);

export default router;