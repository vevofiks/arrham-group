// models/Branch.js
import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

export default mongoose.models.Branch || mongoose.model("Branch", BranchSchema);
