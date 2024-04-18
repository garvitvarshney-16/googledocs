import Express from "express";
import { newUser, shareDocumentByEmail } from "../controllers/user.controller.js";


const router = Express.Router()

router.post('/new', newUser)
router.post('/share', shareDocumentByEmail)


export default router;