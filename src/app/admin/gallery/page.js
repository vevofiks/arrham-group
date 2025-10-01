"use client";
import React, { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Trash2,
    Loader2,
    Building,
    X,
    Upload,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import Image from "next/image";
import ConfirmModal from "@/app/components/ConfirmModal";

const GalleryPage = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [gallery, setGallery] = useState({ images: [] });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
      const [deleteLoading, setDeleteLoading] = useState(false);
    


    const [uploadStatus, setUploadStatus] = useState({ show: false, message: "", type: "" });

    // Fetch branches
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await fetch("/api/branches");
                const data = await res.json();
                setBranches(data);
            } catch (err) {
                console.error("Error fetching branches:", err);
                showNotification("Failed to load branches", "error");
            }
        };
        fetchBranches();
    }, []);

    // Fetch galleries when branch changes
    useEffect(() => {
        if (!selectedBranch) {
            setGallery(null);
            return;
        }
        const fetchGallery = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/gallery?branchId=${selectedBranch}`);
                const result = await res.json();

                if (result.success) {
                    setGallery(result.data || { images: [] });
                } else {
                    setGallery({ images: [] });
                }
            } catch (err) {
                console.error("Error fetching gallery:", err);
                showNotification("Failed to load gallery images", "error");
                setGallery({ images: [] });
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, [selectedBranch]);

    const showNotification = (message, type) => {
        setUploadStatus({ show: true, message, type });
        setTimeout(() => {
            setUploadStatus({ show: false, message: "", type: "" });
        }, 3000);
    };

    const openModal = () => {
        setImages([]);
        setImagePreview([]);
        setShowModal(true);
    };

    const closeModal = () => {
        if (uploading) {
            if (!window.confirm("Upload in progress. Are you sure you want to cancel?")) {
                return;
            }
        }
        setShowModal(false);
        setImages([]);
        setImagePreview([]);
    };

    const processFiles = (files) => {
        // Filter only image files
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        if (validFiles.length !== files.length) {
            showNotification("Some files were skipped (only images allowed)", "error");
        }

        // Limit file size to 10MB per image
        const oversizedFiles = validFiles.filter(file => file.size > 10 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            showNotification(`${oversizedFiles.length} file(s) exceed 10MB limit`, "error");
            return;
        }

        validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview((prev) => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
        setImages((prev) => [...prev, ...validFiles]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const removeImage = (index) => {
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBranch) {
            showNotification("Please select a branch", "error");
            return;
        }

        if (images.length === 0) {
            showNotification("Please select at least one image", "error");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("branchId", selectedBranch);

        images.forEach((img) => {
            if (img instanceof File) {
                formData.append("images", img);
            }
        });

        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (result.success) {
                showNotification(
                    `Successfully uploaded ${result.count} image(s)!`,
                    "success"
                );

                // Refresh gallery
                const updated = await fetch(`/api/gallery?branchId=${selectedBranch}`);
                const updatedResult = await updated.json();

                if (updatedResult.success) {
                    setGallery(updatedResult.data || { images: [] });
                } else {
                    setGallery({ images: [] });
                }

                closeModal();
            } else {
                showNotification(
                    result.error || "Upload failed. Please try again.",
                    "error"
                );
            }
        } catch (err) {
            console.error("Error uploading images:", err);
            showNotification("Upload failed. Please check your connection.", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
    setDeleteLoading(true);

        try {
            const res = await fetch(
                `/api/gallery/${deleteTarget.galleryId}?url=${encodeURIComponent(deleteTarget.url)}`,
                { method: "DELETE" }
            );

            const result = await res.json();

            if (result.success) {
                setGallery((prev) => ({
                    ...prev,
                    images: prev.images.filter((img) => img !== deleteTarget.url),
                }));
                showNotification("Image deleted successfully", "success");
            } else {
                showNotification(result.error || "Failed to delete image", "error");
            }
        } catch (err) {
            console.error("Error deleting gallery:", err);
            showNotification("Failed to delete image", "error");
        } finally {
            setConfirmOpen(false);
            setDeleteTarget(null);
            setDeleteLoading(false);
        }
    };


    // Filtered images based on search query
    const filtered = (gallery?.images || []).filter((url) =>
        searchQuery ? url.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Notification Toast */}
            {uploadStatus.show && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${uploadStatus.type === "success"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                        }`}>
                        {uploadStatus.type === "success" ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <p className="font-medium">{uploadStatus.message}</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                                Manage Gallery
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
                                Upload and manage branch galleries
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="flex-1 sm:flex-initial sm:min-w-[200px] px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm text-sm sm:text-base"
                            >
                                <option value="">Select Branch</option>
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>

                            <div className="relative flex-1">
                                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    type="text"
                                    placeholder="Search images..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 rounded-xl w-full bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm text-sm sm:text-base"
                                />
                            </div>

                            <button
                                onClick={openModal}
                                disabled={!selectedBranch}
                                className="px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Upload Images</span>
                                <span className="sm:hidden">Upload</span>
                            </button>
                        </div>

                        {selectedBranch && gallery?.images?.length > 0 && (
                            <div className="text-sm text-slate-600">
                                Showing {filtered.length} of {gallery.images.length} images
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 sm:py-24">
                        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 animate-spin" />
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {filtered.map((url, idx) => (
                            <div
                                key={idx}
                                className="relative group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <Image
                                    src={url}
                                    alt="Gallery image"
                                    width={400}
                                    height={300}
                                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <button
                                    onClick={() => {
                                        setDeleteTarget({ galleryId: gallery._id, url });
                                        setConfirmOpen(true);
                                    }}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="truncate">
                                        {gallery.createdAt ? new Date(gallery.createdAt).toLocaleDateString() : ""}
                                    </p>
                                </div>
                            </div>
                        ))}


                    </div>
                ) : (
                    <div className="text-center py-16 sm:py-24">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <Building className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                            No images found
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                            {selectedBranch
                                ? searchQuery
                                    ? "No images match your search"
                                    : "Start by uploading your first image"
                                : "Please select a branch first"}
                        </p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Upload Images
                                </h3>
                                {images.length > 0 && (
                                    <p className="text-sm text-slate-600 mt-1">
                                        {images.length} image{images.length !== 1 ? 's' : ''} selected
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={closeModal}
                                disabled={uploading}
                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                            <div
                                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all ${isDragging
                                    ? "border-indigo-400 bg-indigo-50 scale-105"
                                    : "border-slate-200 hover:border-slate-300"
                                    }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="gallery-upload"
                                    disabled={uploading}
                                />
                                <label
                                    htmlFor="gallery-upload"
                                    className={`cursor-pointer block ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    <Upload className="w-12 h-12 sm:w-14 sm:h-14 text-slate-400 mx-auto mb-3" />
                                    <p className="text-base sm:text-lg font-medium text-slate-700 mb-1">
                                        Drop images here or click to browse
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        Supports: JPG, PNG, WebP (Max 10MB per image)
                                    </p>
                                </label>
                            </div>

                            {imagePreview.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                                        Preview ({imagePreview.length})
                                    </h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {imagePreview.map((img, i) => (
                                            <div key={i} className="relative group">
                                                <img
                                                    src={img}
                                                    alt={`Preview ${i + 1}`}
                                                    className="w-full h-24 sm:h-32 object-cover rounded-lg border border-slate-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(i)}
                                                    disabled={uploading}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 disabled:opacity-50"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={uploading}
                                    className="flex-1 px-4 sm:px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading || images.length === 0}
                                    className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Upload {images.length > 0 && `(${images.length})`}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmOpen}
                title="Delete Image"
                message="Are you sure you want to delete this image? This action cannot be undone."
                onCancel={() => {
                    setConfirmOpen(false);
                    setDeleteTarget(null);
                }}
                loading={deleteLoading}

                onConfirm={handleDelete}
            />

        </div>
    );
};

export default GalleryPage;