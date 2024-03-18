
import mongoose from "mongoose";
import { Document } from "../models/document.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createDocument = asyncHandler(async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const document = new Document({
      title,
      content,
      user: userId,
    });
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
