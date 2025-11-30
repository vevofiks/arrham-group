"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Plus, Edit, Eye, Trash2, Loader2, Building, X, Upload } from "lucide-react";
import ConfirmModal from "@/app/components/ConfirmModal";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchClients();
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

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/clients/?branchId=${selectedBranch}`);
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, client = null) => {
    setModalType(type);
    setSelectedClient(client);
    if (type === "edit" && client) {
      setFormData({
        companyName: client.companyName,
        images: client.images || [],
      });
      setImagePreview(client.images || []);
    } else if (type === "view" && client) {
      setSelectedClient(client);
    } else {
      setFormData({ companyName: "", images: [] });
      setImagePreview([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(null);
    setFormData({ companyName: "", images: [] });
    setImagePreview([]);
  };

  const processFiles = (files) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
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

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("branchId", selectedBranch);
    formDataToSend.append("companyName", formData.companyName);

    formData.images.forEach((image) => {
      if (typeof image === "string") {
        formDataToSend.append("existingImages", image);
      } else if (image instanceof File) {
        formDataToSend.append("images", image);
      }
    });

    try {
      const url = modalType === "create"
        ? `/api/clients/`
        : `/api/clients/${selectedClient._id}/`;

      const method = modalType === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (res.ok) {
        fetchClients();
        closeModal();
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (clientId) => {
    setDeleteTarget(clientId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/clients/${deleteTarget}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchClients();
      }
    } catch (err) {
      console.error("Error deleting client:", err);
    } finally {
      setDeleteLoading(false);
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const filteredClients = clients.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Manage Clients</h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg">Create, update, and view branch clients</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="flex-1 sm:flex-initial sm:min-w-[200px] px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm text-sm sm:text-base"
              >
                <option value="">Select Branch</option>
                {branches?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search clients..."
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
                <span className="hidden sm:inline">Create Client</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 sm:py-24">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 animate-spin" />
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((c) => (
              <article
                key={c._id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {c.images?.[0] && (
                  <div className="h-40 sm:h-48 bg-slate-100 overflow-hidden relative">
                    <Image
                      src={c.images[0]}
                      alt={c.companyName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{c.companyName}</h3>
                  <div className="flex items-center justify-end mt-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("view", c)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", c)}
                        className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(c._id)}
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
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No clients found</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
              {selectedBranch ? "Start by creating your first client" : "Please select a branch first"}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {modalType === "create" ? "Create Client" : modalType === "edit" ? "Edit Client" : "Client Details"}
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
                    <h4 className="text-sm font-medium text-slate-600 mb-1">Company Name</h4>
                    <p className="text-lg font-semibold text-slate-900">{selectedClient.companyName}</p>
                  </div>

                  {selectedClient.images?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-600 mb-3">Images</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedClient.images.map((img, i) => (
                          <div key={i} className="relative group h-32">
                            <Image
                              src={img}
                              alt={`Client ${i + 1}`}
                              fill
                              className="object-cover rounded-lg shadow-sm group-hover:shadow-md transition"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm sm:text-base"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
                    <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors ${isDragging ? "border-indigo-400 bg-indigo-50" : "border-slate-200"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="client-image-upload"
                      />
                      <label htmlFor="client-image-upload" className="cursor-pointer block">
                        <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-2 sm:mb-3" />
                        <p className="text-sm sm:text-base text-slate-600">Drop images here or click to upload</p>
                      </label>
                    </div>
                    {imagePreview.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                        {imagePreview.map((img, i) => (
                          <div key={i} className="relative group">
                            <Image src={img} alt={`Preview ${i + 1}`} width={150} height={128} className="w-full h-20 sm:h-32 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
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
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
      />
    </div>
  );
};

export default ClientsPage;


