import { Profile } from "../models/Profile.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().lean();
  if (!profile) return res.status(404).json({ error: "Profile not found. Run `npm run seed`." });
  res.json({ data: profile });
});
