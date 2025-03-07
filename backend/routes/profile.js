import {Router} from "express"
import Profile from "../controllers/profile.js";
import { checkAuthToken } from "../middleware/auth.js";

const router=Router()

router.get("/",checkAuthToken(),Profile)


export default router;
