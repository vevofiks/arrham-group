"use client";
import { X, Loader2 } from "lucide-react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">{title || "Confirm"}</h3>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <p className="text-slate-700">{message || "Are you sure?"}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-slate-200">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
