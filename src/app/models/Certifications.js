import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
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
    description: {
      type: String,
      default: "",
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Certifications = mongoose.models?.Certifications || mongoose.model("Certifications", CertificationSchema);

export default Certifications;


