import Express from "express";
import { newUser } from "../controllers/user.controller.js";


const router = Express.Router()

router.post('/new', newUser)


export default router;