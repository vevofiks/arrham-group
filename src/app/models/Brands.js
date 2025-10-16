import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
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
    img: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Brands = mongoose.models?.Brands || mongoose.model("Brands", BrandSchema);

export default Brands;


