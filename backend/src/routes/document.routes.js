import Express  from "express";
import { createDocument, getDocuments } from "../controllers/document.controller.js";

const router = Express.Router();

router.post("/newdoc", createDocument);
router.get("/alldocs", getDocuments);

export default router;