import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        // coverImage: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
