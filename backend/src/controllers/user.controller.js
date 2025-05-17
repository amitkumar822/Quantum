import { User } from "../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AllowedFormatType } from "../../utils/AllowedFormatType.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import createTokensAndSaveCookies from "../jwt/AuthToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const profile = req.file;

  if (profile && !AllowedFormatType.includes(profile.mimetype)) {
    throw new ApiError(
      400,
      "Invalid profile format, Only jpeg, png and webp are allowed!"
    );
  }

  const { name, email, password, dob, role } = req.body;

  if ((!name || !email || !password, !dob)) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  const user = await User.findOne({ email }).lean();
  if (user) {
    throw new ApiError(
      400,
      `User All Ready Register With This ${user?.email} Email!`
    );
  }

  const cloudinarResponse = await uploadOnCloudinary(profile?.path);
  
  if (cloudinarResponse === null && profile) {
    throw new ApiError(400, "Failed to upload profile!");
  }

  const newUser = new User({
    name,
    email,
    password,
    dob,
    role: role || "USER",
    profile: {
      public_id: cloudinarResponse?.public_id,
      url: cloudinarResponse?.url,
    },
  });

  const savedUser = await newUser.save();

  // Convert Mongoose document to plain object and remove password
  const userData = savedUser.toObject();
  delete userData.password;

  // generate token and save
  const token = await createTokensAndSaveCookies(savedUser._id, res);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: userData, token },
        "User Created Successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields Must Be Required!");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User Not Found With This Email!");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Password Wrong!");
  }

  // Convert Mongoose document to plain object and remove password
  const userData = user.toObject();
  delete userData.password;

  // generate token and save
  const token = await createTokensAndSaveCookies(user._id, res);

  return res
    .status(201)
    .json(new ApiResponse(200, { userData, token }, "User Login Successfully"));
});

export const logOut = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  // Remove refresh token from database
  await User.findByIdAndUpdate(
    userId,
    { $set: { refreshToken: "", token: "" } },
    { new: true }
  );

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User Logged Out Successfully"));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId).lean();

  if (!user) throw new ApiError(404, "User Not Found!");

  res.status(200).json(new ApiResponse(200, user, "User Details"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().lean();

  if (!users) throw new ApiError(404, "No Users Found!");

  res.status(200).json(new ApiResponse(200, users, "Get All Users"));
});
