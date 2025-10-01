// models/Gallery.js
import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    branchId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    images: {
        type: [String],
        default: []  // ← This is crucial!
    }
}, {
    timestamps: true
});

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

export default Gallery;