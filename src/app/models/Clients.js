// models/Clients.js
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
      ref: "Branch",
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Clients = mongoose.models?.Clients || mongoose.model("Clients", ClientSchema);

export default Clients;


