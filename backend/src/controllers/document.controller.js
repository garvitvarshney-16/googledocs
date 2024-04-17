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
  const { id } = req.params;

  try {
    const documents = await Document.find({ user: id });

    if (!documents) {
      throw new ApiError(400, "Documents not found for this user");
    }

    return res.status(200).json({
      documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    // Handle other errors such as database errors
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
});

export const updateContent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const document = await Document.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json({ message: "Document content saved successfully" });
  } catch (error) {
    console.error("Error saving document content:", error);
    res.status(500).json({ error: "Internal server error" });
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
  const { id } = req.params;

  if (!id) {
    throw new Error("ID undefined");
  }

  await Document.findByIdAndDelete(id);

  res.status(200).json({
    message: "Doc Delete successfully",
  });
});

export const getSpecificDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Document.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get document successfully",
      doc,
    });
  } catch (error) {
    console.error("Error when fetching document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export const getContent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({ content: document.content });
  } catch (error) {
    console.error("Error fetching saved content:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
