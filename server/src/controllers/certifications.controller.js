import { Certification } from "../models/Certification.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.find().sort({ order: 1 }).lean();
  res.json({ data: certifications });
});
