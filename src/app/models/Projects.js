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
    location: String,
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Ongoing",
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
