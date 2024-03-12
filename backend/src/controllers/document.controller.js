import { Document } from "../models/documentModel.js";

export const getDocument = (async (id) => {
  if (id === null) {
    return;
  }

  const doc = await Document.findById(id);

  if (doc) {
    return doc;
  }

  return await Document.create({ _id: id, data: "" });
});

export const updateDocument = (async (id, data) => {
  return await Document.findByIdAndUpdate(id, { data });
});
