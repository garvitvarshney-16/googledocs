
import mongoose from "mongoose";
import { Document } from "../models/document.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

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


export const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({})
  if (!documents) {
    throw new ApiError(400, "Documents not fetched");
  }

  return res.status(200).json({
    documents
  })
})
