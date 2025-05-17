import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    throw new ApiError(401, "Please log in...");
  }

  try {
    // Verify the access token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET_KEY
    );

    // Fetch the user from the database
    const user = await User.findById(decodedToken.userId).lean();
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    // Attach user details to the request object
    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    // If the access token is expired or invalid
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      if (!refreshToken) {
        throw new ApiError(401, "Session expired. Please log in again.");
      }

      try {
        // Verify the refresh token
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET_KEY
        );

        // Fetch the user from the database
        const user = await User.findById(decodedRefreshToken.userId).lean();
        if (!user) {
          throw new ApiError(404, "User Not Found");
        }

        // Issue a new access token
        accessToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_ACCESS_SECRET_KEY,
          { expiresIn: "15m" } // 15 minutes expiration
        );

        // Set the new access token in the cookies
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

        // Attach user details to the request object
        req.user = {
          userId: user._id,
          email: user.email,
          role: user.role,
        };
        next();
      } catch (refreshErr) {
        throw new ApiError(401, "Refresh token expired. Please log in again.");
      }
    } else {
      throw new ApiError(401, "Invalid token. Please log in again.");
    }
  }
});
