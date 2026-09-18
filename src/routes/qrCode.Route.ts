import { Router } from "express";
import { QrcodeController, SaveQrcodeController } from "../controllers/qrcodeController.js";

const router:Router = Router();

router.post("/generateQRCcode", QrcodeController);
router.post("/saveQrCode", SaveQrcodeController)


export default router;