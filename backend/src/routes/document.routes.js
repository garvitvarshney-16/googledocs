import Express  from "express";
import { createDocument } from "../controllers/document.controller.js";

const router = Express.Router();

router.post("/newdoc", createDocument);

export default router;