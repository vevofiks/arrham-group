"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Eye, Trash2, Loader2, Building, X, Upload, Link2 } from "lucide-react";
import ConfirmModal from "@/app/components/ConfirmModal";
import * as yup from "yup";
import { toast } from "sonner";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
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
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    img: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchPartners();
    }
  }, [selectedBranch]);

  const fetchBranches = async () => {
    try {
      const res = await fetch(`/api/branches/`);
      const data = await res.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/partners/?branchId=${selectedBranch}`);
      const data = await res.json();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, partner = null) => {
    setModalType(type);
    setSelectedPartner(partner);
    if (type === "edit" && partner) {
      setFormData({
        name: partner.name,
        url: partner.url || "",
        img: null,
      });
      setImagePreview(partner.img || "");
    } else if (type === "view" && partner) {
      setSelectedPartner(partner);
    } else {
      setFormData({ name: "", url: "", img: null });
      setImagePreview("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPartner(null);
    setFormData({ name: "", url: "", img: null });
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size exceeds 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData(prev => ({ ...prev, img: file }));
  };

  const partnerSchema = yup.object().shape({
    name: yup.string().required("Partner name is required").min(2, "Name must be at least 2 characters"),
    url: yup.string().url("Please enter a valid URL"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await partnerSchema.validate(formData, { abortEarly: false });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      toast.error(Object.values(validationErrors)[0]);
      return;
    }

    setSubmitLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("branchId", selectedBranch);
    formDataToSend.append("name", formData.name);
    if (formData.url) formDataToSend.append("url", formData.url);
    if (formData.img instanceof File) formDataToSend.append("img", formData.img);

    try {
      const url = modalType === "create"
        ? `/api/partners/`
        : `/api/partners/${selectedPartner._id}/`;

      const method = modalType === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (res.ok) {
        fetchPartners();
        closeModal();
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Error saving partner:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (partnerId) => {
    setDeleteTarget(partnerId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/partners/${deleteTarget}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (err) {
      console.error("Error deleting partner:", err);
    } finally {
      setDeleteLoading(false);
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toExternalUrl = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    return `https://${trimmed}`;
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Manage Partners</h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Create, update, and view branch partners</p>
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
                  placeholder="Search partners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 rounded-xl w-full bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm text-sm sm:text-base"
                />
              </div>

              <button
                onClick={() => openModal("create")}
                disabled={!selectedBranch}
                className="px-4 sm:px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Create Partner</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 sm:py-24">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 animate-spin" />
          </div>
        ) : filteredPartners.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((p) => (
              <article
                key={p._id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {p.img && (
                  <div className="h-40 sm:h-48 bg-slate-100 overflow-hidden flex items-center justify-center relative">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                  {p.url && (
                    <a href={toExternalUrl(p.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
                      <Link2 className="w-4 h-4" />
                      <span className="truncate max-w-[220px] sm:max-w-[280px]">{p.url}</span>
                    </a>
                  )}
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
              <Building className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No partners found</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
              {selectedBranch ? "Start by creating your first partner" : "Please select a branch first"}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {modalType === "create" ? "Create Partner" : modalType === "edit" ? "Edit Partner" : "Partner Details"}
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
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Partner Name</h4>
                    <p className="text-lg font-semibold text-slate-900">{selectedPartner.name}</p>
                  </div>
                  {selectedPartner.url && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-slate-600 mb-1">URL</h4>
                      <a href={selectedPartner.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-700 break-all">{selectedPartner.url}</a>
                    </div>
                  )}
                  {selectedPartner.img && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-3">Logo</h4>
                      <div className="w-full bg-slate-50 rounded-xl p-4 flex items-center justify-center relative h-40">
                        <Image src={selectedPartner.img} alt={selectedPartner.name} fill className="object-contain" sizes="(max-width: 768px) 90vw, 500px" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Partner Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base"
                      placeholder="Enter partner name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">URL</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
                    <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors border-slate-200`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="partner-image-upload"
                      />
                      <label htmlFor="partner-image-upload" className="cursor-pointer block">
                        <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-2 sm:mb-3" />
                        <p className="text-sm sm:text-base text-slate-600">Click to upload logo</p>
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <div className="relative inline-block">
                          <Image src={imagePreview} alt="Preview" width={128} height={128} className="h-24 sm:h-32 object-contain rounded-lg bg-slate-50 p-2" />
                          <button
                            type="button"
                            onClick={() => { setImagePreview(""); setFormData(prev => ({ ...prev, img: null })); }}
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
                      disabled={submitLoading}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {modalType === "create" ? "Creating..." : "Updating..."}
                        </>
                      ) : (
                        modalType === "create" ? "Create" : "Update"
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
        title="Delete Partner"
        message="Are you sure you want to delete this partner? This action cannot be undone."
      />
    </div>
  );
};

export default PartnersPage;


