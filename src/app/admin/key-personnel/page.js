"use client"
import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Eye, Trash2, Loader2, UserCircle, X, Upload } from "lucide-react";
import ConfirmModal from "@/app/components/ConfirmModal";

const KeyPersonnelPage = () => {
  const [keyPersonnel, setKeyPersonnel] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    description: "",
    yearOfExperience: "",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchKeyPersonnel();
    }
  }, [selectedBranch]);

  // Debug: Log formData changes
  useEffect(() => {
    if (showModal && modalType !== "view") {
      console.log("Form Data State:", formData);
    }
  }, [formData, showModal, modalType]);

  const fetchBranches = async () => {
    try {
      const res = await fetch(`/api/branches/`);
      const data = await res.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchKeyPersonnel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/key-personnel/?branchId=${selectedBranch}`);
      const data = await res.json();
      console.log("=== FETCHED KEY PERSONNEL DATA ===");
      console.log("Data:", data);
      if (data.length > 0) {
        console.log("First personnel position:", data[0].position);
      }
      console.log("=================================");
      setKeyPersonnel(data);
    } catch (error) {
      console.error("Error fetching key personnel:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, personnel = null) => {
    setModalType(type);
    setSelectedPersonnel(personnel);
    setErrors({});
    if (type === "edit" && personnel) {
      console.log("=== OPENING EDIT MODAL ===");
      console.log("Personnel data:", personnel);
      console.log("Personnel position:", personnel.position);
      const formDataObj = {
        name: personnel.name || "",
        position: personnel.position || "",
        description: personnel.description || "",
        yearOfExperience: (personnel.yearOfExperience || 0).toString(),
        profileImage: null,
      };
      console.log("Form Data being set:", formDataObj);
      console.log("========================");
      setFormData(formDataObj);
      setImagePreview(personnel.profileImage || "");
    } else if (type === "view" && personnel) {
      setSelectedPersonnel(personnel);
    } else {
      setFormData({ name: "", position: "", description: "", yearOfExperience: "", profileImage: null });
      setImagePreview("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPersonnel(null);
    setFormData({ name: "", position: "", description: "", yearOfExperience: "", profileImage: null });
    setImagePreview("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Position is required for new records, but optional for edits of existing records without position
    if (modalType === "create" && (!formData.position || formData.position.trim() === "")) {
      newErrors.position = "Position is required";
    }

    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Description is required";
    }

    if (!formData.yearOfExperience || formData.yearOfExperience.trim() === "") {
      newErrors.yearOfExperience = "Years of experience is required";
    } else {
      const years = parseInt(formData.yearOfExperience);
      if (isNaN(years) || years < 0) {
        newErrors.yearOfExperience = "Years of experience must be a valid number";
      }
      if (years > 45) {
        newErrors.yearOfExperience = "Years of experience cannot exceed 45";
      }
    }

    if (formData.description) {
      const charCount = formData.description.length;
      if (charCount > 35) {
        newErrors.description = `Description must not exceed 35 characters. Current: ${charCount} characters`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("branchId", selectedBranch);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("yearOfExperience", formData.yearOfExperience);
    if (formData.profileImage instanceof File) formDataToSend.append("profileImage", formData.profileImage);

    console.log("=== FORM SUBMISSION DATA ===");
    console.log("Name:", formData.name);
    console.log("Position:", formData.position);
    console.log("Description:", formData.description);
    console.log("Year of Experience:", formData.yearOfExperience);
    console.log("============================");

    try {
      const url = modalType === "create"
        ? `/api/key-personnel/`
        : `/api/key-personnel/${selectedPersonnel._id}/`;

      const method = modalType === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (res.ok) {
        fetchKeyPersonnel();
        closeModal();
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        alert(errorData.error || "Failed to save key personnel. Please try again.");
      }
    } catch (error) {
      console.error("Error saving key personnel:", error);
      alert("An error occurred while saving. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (personnelId) => {
    setDeleteTarget(personnelId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/key-personnel/${deleteTarget}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchKeyPersonnel();
      }
    } catch (err) {
      console.error("Error deleting key personnel:", err);
    } finally {
      setDeleteLoading(false);
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const filteredPersonnel = keyPersonnel.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Manage Key Personnel</h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Create, update, and view branch key personnel</p>
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
                  placeholder="Search key personnel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 rounded-xl w-full bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm text-sm sm:text-base"
                />
              </div>

              <button
                onClick={() => openModal("create")}
                disabled={!selectedBranch}
                className="px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add Personnel</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 sm:py-24">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 animate-spin" />
          </div>
        ) : filteredPersonnel.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPersonnel.map((p) => (
              <article
                key={p._id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {p.profileImage && (
                  <div className="h-40 sm:h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
                    <img
                      src={p.profileImage}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium mb-2">{p.position || "Not set"}</p>
                  <p className="text-xs text-slate-500 mb-3">
                    {p.yearOfExperience} {p.yearOfExperience === 1 ? "year" : "years"} of experience
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex items-center justify-end mt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("view", p)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", p)}
                        className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(p._id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No key personnel found</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
              {selectedBranch ? "Start by adding your first key personnel" : "Please select a branch first"}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {modalType === "create" ? "Add Key Personnel" : modalType === "edit" ? "Edit Key Personnel" : "Personnel Details"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {modalType === "view" ? (
              <div className="p-4 sm:p-6">
                <div className="space-y-6">
                  {selectedPersonnel.profileImage && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-3">Profile Image</h4>
                      <div className="w-full bg-slate-50 rounded-xl p-4 flex items-center justify-center">
                        <img src={selectedPersonnel.profileImage} alt={selectedPersonnel.name} className="max-h-64 rounded-lg object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Name</h4>
                    <p className="text-lg font-semibold text-slate-900">{selectedPersonnel.name}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Position</h4>
                    <p className="text-lg font-semibold text-slate-900">{selectedPersonnel.position || "Not set"}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Years of Experience</h4>
                    <p className="text-lg font-semibold text-slate-900">{selectedPersonnel.yearOfExperience} {selectedPersonnel.yearOfExperience === 1 ? "year" : "years"}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Description</h4>
                    <p className="text-slate-900">{selectedPersonnel.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => {
                        console.log("Name changed:", e.target.value);
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base`}
                      placeholder="Enter full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Position {modalType === "create" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      value={formData.position || ""}
                      onChange={(e) => {
                        console.log("Position changed:", e.target.value);
                        setFormData({ ...formData, position: e.target.value });
                      }}
                      required={modalType === "create"}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.position ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base`}
                      placeholder="Enter position"
                    />
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                    )}
                    {modalType === "edit" && (!formData.position || formData.position.trim() === "") && (
                      <p className="text-yellow-600 text-sm mt-1">Position not set. Please add one.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience (max: 45)</label>
                    <input
                      type="number"
                      value={formData.yearOfExperience}
                      onChange={(e) => {
                        setFormData({ ...formData, yearOfExperience: e.target.value });
                        // Validate on change
                        if (e.target.value) {
                          const years = parseInt(e.target.value);
                          if (years > 45) {
                            setErrors(prev => ({ ...prev, yearOfExperience: "Years of experience cannot exceed 45" }));
                          } else {
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.yearOfExperience;
                              return newErrors;
                            });
                          }
                        }
                      }}
                      required
                      min="0"
                      max="45"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.yearOfExperience ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base`}
                      placeholder="Enter years of experience (max 45)"
                    />
                    {errors.yearOfExperience && (
                      <p className="text-red-500 text-sm mt-1">{errors.yearOfExperience}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-slate-700">Description</label>
                      <span className="text-xs text-slate-500">
                        {formData.description.length}/35 characters
                      </span>
                    </div>
                    <textarea
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        // Validate on change
                        const charCount = e.target.value.length;
                        if (charCount > 35) {
                          setErrors(prev => ({ ...prev, description: `Description must not exceed 35 characters. Current: ${charCount} characters` }));
                        } else {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.description;
                            return newErrors;
                          });
                        }
                      }}
                      required
                      rows="4"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base`}
                      placeholder="Enter description (max 35 characters)"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image</label>
                    <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors border-slate-200`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="personnel-image-upload"
                      />
                      <label htmlFor="personnel-image-upload" className="cursor-pointer block">
                        <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-2 sm:mb-3" />
                        <p className="text-sm sm:text-base text-slate-600">Click to upload profile image</p>
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <div className="relative inline-block">
                          <img src={imagePreview} alt="Preview" className="h-24 sm:h-32 object-cover rounded-lg bg-slate-50 p-2" />
                          <button
                            type="button"
                            onClick={() => { setImagePreview(""); setFormData(prev => ({ ...prev, profileImage: null })); }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitLoading || Object.keys(errors).length > 0}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {modalType === "create" ? "Adding..." : "Updating..."}
                        </>
                      ) : (
                        modalType === "create" ? "Add Personnel" : "Update"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={confirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleteLoading}
        title="Delete Key Personnel"
        message="Are you sure you want to delete this personnel? This action cannot be undone."
      />
    </div>
  );
};

export default KeyPersonnelPage;

