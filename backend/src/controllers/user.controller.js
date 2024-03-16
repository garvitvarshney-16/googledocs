import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id, username, email, photo } = req.body;

  console.log("_id:", _id);
  console.log("name:", username);
  console.log("email:", email);
  console.log("photo:", photo);

  let user = await User.findById(_id);

  if (user) {
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.username}`,
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
  });
});
