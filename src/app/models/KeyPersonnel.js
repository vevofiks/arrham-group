import mongoose from "mongoose";

const KeyPersonnelSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
      ref: "Branch",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfExperience: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const KeyPersonnel = mongoose.models?.KeyPersonnel || mongoose.model("KeyPersonnel", KeyPersonnelSchema);

export default KeyPersonnel;

