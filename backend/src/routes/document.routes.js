import Express  from "express";
import { createDocument, deletDoc, getContent, getDocuments, getSpecificDoc, updateContent, updateTitle } from "../controllers/document.controller.js";

const router = Express.Router();

router.post("/newdoc", createDocument);
router.get("/alldocs/:id", getDocuments);
router.post("/updatecontent/:id", updateContent);
router.put("/updatetitle/:id", updateTitle)
router.delete("/:id", deletDoc)
router.get("/getdoc/:id", getSpecificDoc)
router.get("/saved-content/:id", getContent)

export default router;