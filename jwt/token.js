import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript access (important for security)
    secure: process.env.NODE_ENV === "production", // `true` in production (HTTPS), `false` in dev
    sameSite: "None", // Allows cross-site cookies (IMPORTANT for frontend)
    path: "/", // Ensures the cookie is available across the site
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
