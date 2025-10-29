// models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: { type: String, default: "" },
    location: String,
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Ongoing",
    },
    mainContractor: {
      type: String,
      default: "",
    },
    clientName: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Project = mongoose.models?.Projects ||
  mongoose.model("Projects", ProjectSchema);

export default Project;