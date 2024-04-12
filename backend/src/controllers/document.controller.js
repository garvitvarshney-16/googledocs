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
  const documents = await Document.find({});
  if (!documents) {
    throw new ApiError(400, "Documents not fetched");
  }

  return res.status(200).json({
    documents,
  });
});

export const updateContent = asyncHandler(async (req, res) => {
  try {
    const { title, content, id } = req.body;
    const existingDocument = await Document.findById(id);

    if (existingDocument) {
      // Update the existing document
      existingDocument.title = title;
      existingDocument.content = content;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const updateTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  if (!title) {
    throw new Error("Tile undefined");
  }

  const doc = await Document.findByIdAndUpdate(id, { title: title });

  doc.save();

  res.status(200).json({
    doc,
  });
});

export const deletDoc = asyncHandler(async (req, res) => {
  const {id} = req.params;

  if (!id) {
    throw new Error("ID undefined");
  }

  await Document.findByIdAndDelete(id);

  res.status(200).json({
    message: "Doc Delete successfully",
  })
});
