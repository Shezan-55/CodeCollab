import { Router } from "express";
import { handelUserSignin, handelUserSignup, verifyEmail, sendVerifyLink, verifyOTP} from "../controllers/user.js";
import signupValidationRules from "../validator/validationRules.js";

const router= Router();




router.post("/signup", signupValidationRules , handelUserSignup)

router.post("/signin",handelUserSignin)

router.get("/verify/:verifyToken",verifyEmail)

router.post("/email-verify",sendVerifyLink)


router.post("/verify-otp",verifyOTP)









export default router;