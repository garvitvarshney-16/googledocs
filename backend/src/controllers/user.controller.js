import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";

export const newUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id, username, email, photo } = req.body;

  let user = await User.findById(_id);

  if (user) {
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.username}`,
      user,
    });
  }

  if (!username || !email || !photo || !_id) {
    throw new ApiError(400, "Enter all details");
  }

  user = await User.create({
    username,
    email,
    photo,
    _id,
  });

  return res.status(200).json({
    success: true,
    message: `Welcome ${user.username}`,
    user,
  });
});

export const shareDocumentByEmail = async (req, res) => {
  try {
    const { email, link, message } = req.body;

    // Create a Nodemailer transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: '"Garvit Varshney 👻" <garvitvarshney81@gmail.com>',
      to: email,
      subject: "Document Sharing",
      text: `You have been invited to view a document.\n\nMessage: ${message}\n\nDocument URL: ${link}`,
      html: `<p>You have been invited to view a document.</p><p>Message: ${message}</p><p>Document URL: <a href="${link}">${link}</a></p>`,
    };

    // Send the email
    const data = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email sent successfully.",
      data,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
};
