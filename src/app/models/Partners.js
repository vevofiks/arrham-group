import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
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

const Partners = mongoose.models?.Partners || mongoose.model("Partners", PartnerSchema);

export default Partners;


