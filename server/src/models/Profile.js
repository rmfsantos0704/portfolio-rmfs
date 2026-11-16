import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { _id: false },
);

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    major: String,
    school: { type: String, required: true },
    graduation: String,
  },
  { _id: false },
);

// Singleton document: the site only ever has one profile.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    availability: { type: String, default: "Available for opportunities" },
    intro: String,
    bio: [String],
    email: { type: String, required: true },
    phone: String,
    location: String,
    socials: {
      github: String,
      linkedin: String,
    },
    experience: [experienceSchema],
    education: [educationSchema],
  },
  { timestamps: true },
);

export const Profile = mongoose.model("Profile", profileSchema);
