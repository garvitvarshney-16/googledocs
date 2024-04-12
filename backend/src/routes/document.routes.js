import Express  from "express";
import { createDocument, deletDoc, getDocuments, updateContent, updateTitle } from "../controllers/document.controller.js";

const router = Express.Router();

router.post("/newdoc", createDocument);
router.get("/alldocs", getDocuments);
router.patch("/updatecontent", updateContent);
router.put("/updatetitle/:id", updateTitle)
router.delete("/:id", deletDoc)

export default router;