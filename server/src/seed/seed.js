import { connectDB, disconnectDB } from "../config/db.js";
import { Profile } from "../models/Profile.js";
import { Skill } from "../models/Skill.js";
import { Certification } from "../models/Certification.js";
import { Project } from "../models/Project.js";
import { profile, skills, certifications, projects } from "./data.js";

async function seed() {
  await connectDB();

  await Promise.all([
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    Certification.deleteMany({}),
    Project.deleteMany({}),
  ]);

  await Profile.create(profile);
  await Skill.insertMany(skills);
  await Certification.insertMany(certifications);
  await Project.insertMany(projects);

  console.log(
    `Seeded: 1 profile, ${skills.length} skills, ${certifications.length} certifications, ${projects.length} projects`,
  );
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(disconnectDB);
