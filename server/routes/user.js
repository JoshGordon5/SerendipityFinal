import express from "express";
const router = express.Router();

import { signin, signup, forgotpassword, resetpassword } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/forgotpassword", forgotpassword);

router.put("/passwordreset/:resetToken", resetpassword);

export default router;