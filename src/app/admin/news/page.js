"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    AlertCircle,
    Loader2,
    Newspaper,
    Clock,
    TrendingUp,
    Calendar,
    BookOpen,
    X,
    LogOut
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import { useRouter } from "next/navigation";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [selectedNews, setSelectedNews] = useState(null);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [submitting, setSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);

    const router = useRouter()

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/news");
            if (response.ok) {
                const data = await response.json();
                setNews(data);
            } else {
                showNotification("Error fetching news", "error");
            }
        } catch (error) {
            showNotification("Error fetching news", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleLogout = async () => {
        try {
            const response = await fetch("/api/admin/logout", { method: "POST" });
            if (response.ok) {
                showNotification("Logged out successfully!", "success");
                router.push("/admin/login")
            } else {
                showNotification("Error logging out", "error");
            }
        } catch (error) {
            showNotification("Error logging out", "error");
        } finally {
            setLoading(false);
        }
    };


    // Notification
    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Handle form submit
    const handleSubmit = async () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            showNotification("Please fill in all fields", "error");
            return;
        }
        setSubmitting(true);
        try {
            const url =
                modalType === "create"
                    ? "/api/news"
                    : `/api/news/${selectedNews._id}`;
            const method = modalType === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showNotification(
                    modalType === "create"
                        ? "News created successfully!"
                        : "News updated successfully!"
                );
                fetchNews();
                closeModal();
            } else {
                showNotification("Error saving news", "error");
            }
        } catch (error) {
            showNotification("Error saving news", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/news/${id}`, { method: "DELETE" });
            if (response.ok) {
                showNotification("News deleted successfully!");
                await fetchNews();
            } else {
                showNotification("Error deleting news", "error");
            }
        } catch (error) {
            showNotification("Error deleting news", "error");
        }
    };

    // Modal open/close
    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedNews(item);
        if (type === "create") {
            setFormData({ title: "", content: "" });
        } else if (item) {
            setFormData({ title: item.title, content: item.content });
        }
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedNews(null);
        setFormData({ title: "", content: "" });
    };

    // Search filter
    const filteredNews = news.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            Technology: 'bg-blue-500',
            Environment: 'bg-green-500',
            Space: 'bg-purple-500',
            default: 'bg-gray-500'
        };
        return colors[category] || colors.default;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200/60 backdrop-blur-xl bg-white/70 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-end">
                        {/* <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="flex items-center justify-center shadow-lg">
                                    <Image
                                        src="/arrham3.png"
                                        alt="logo"
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                                    Arrham Group
                                </h1>
                                <p className="text-sm text-slate-500">Editorial Dashboard</p>
                            </div>
                        </div> */}

                        <div className="flex items-center space-x-4">
                            <button
                                className="cursor-pointer"
                                onClick={handleLogout}
                            >
                                <LogOut />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">
                                Arrham News Management
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Create, manage and publish Arrham group stories
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-6 py-3.5 rounded-2xl w-full sm:w-80 bg-white/80 backdrop-blur-sm border border-slate-200/60 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div className="flex gap-3">


                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openModal("create")}
                                    className="px-6 py-3.5 cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                                >
                                    <Plus className="inline w-5 h-5 mr-2" />
                                    Create Article
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 font-medium">Total Articles</p>
                                <p className="text-3xl font-bold text-blue-900">{news.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-6 border border-emerald-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-600 font-medium">Published</p>
                                <p className="text-3xl font-bold text-emerald-900">{news.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-6 border border-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 font-medium">This Month</p>
                                <p className="text-3xl font-bold text-purple-900">{news.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Articles Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="text-center">
                                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                                <p className="text-slate-600">Loading articles...</p>
                            </div>
                        </div>
                    ) : filteredNews.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredNews.map((item, i) => (
                                <motion.article
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group bg-white/70 backdrop-blur-sm rounded-3xl border border-slate-200/60 hover:border-slate-300/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-end mb-6">

                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openModal("view", item)}
                                                    className="w-9 cursor-pointer h-9 rounded-xl bg-slate-100 hover:bg-blue-100 flex items-center justify-center transition-colors group"
                                                >
                                                    <Eye className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openModal("edit", item)}
                                                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-100 flex items-center justify-center transition-colors group"
                                                >
                                                    <Edit className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                                                </motion.button>
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-9 h-9  cursor-pointer rounded-xl bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-colors group"
                                                >



                                                    <AlertDialog>
                                                        <AlertDialogTrigger><Trash2 className="w-4 h-4 text-slate-600 group-hover:text-red-600" /></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {item?.title} article will be permamently deleted.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(item._id)}>Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                                            {item.content}
                                        </p>

                                        <div className="flex items-center justify-between text-sm text-slate-500">
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {item.createdAt ? formatDate(item.createdAt) : 'Today'}
                                            </span>
                                            <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                                Published
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Newspaper className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
                            <p className="text-slate-600 mb-6">Get started by creating your first article</p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openModal("create")}
                                className="px-6 py-3  cursor-pointer rounded-2xl bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus className="inline w-5 h-5 mr-2" />
                                Create Article
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between p-8 border-b border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {modalType === "create" ? "Create Article" :
                                        modalType === "edit" ? "Edit Article" : "View Article"}
                                </h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={closeModal}
                                    className="w-10 h-10  cursor-pointer rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </motion.button>
                            </div>

                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                                {modalType === "view" ? (
                                    <div className="space-y-6">
                                        <div>

                                            <h1 className="text-3xl font-bold text-slate-900 mb-4">
                                                {selectedNews?.title}
                                            </h1>
                                            <div className="flex items-center text-sm text-slate-500 mb-6">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {selectedNews?.createdAt ? formatDate(selectedNews.createdAt) : 'Today'}
                                            </div>
                                        </div>
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                                                {selectedNews?.content}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Article Title
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, title: e.target.value })
                                                }
                                                placeholder="Enter article title..."
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Content
                                            </label>
                                            <textarea
                                                rows={12}
                                                value={formData.content}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, content: e.target.value })
                                                }
                                                placeholder="Write your article content..."
                                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all resize-none"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-4 pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={closeModal}
                                                className="px-6 py-3  cursor-pointer rounded-2xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleSubmit}
                                                disabled={submitting}
                                                className="px-6 py-3 cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 className="inline w-5 h-5 mr-2 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    modalType === "create" ? "Create Article" : "Update Article"
                                                )}
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notifications */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <div className={`px-6 py-4 rounded-2xl shadow-lg border backdrop-blur-sm flex items-center gap-3 ${notification.type === "success"
                            ? "bg-emerald-50/90 border-emerald-200 text-emerald-800"
                            : "bg-red-50/90 border-red-200 text-red-800"
                            }`}>
                            {notification.type === "success" ? (
                                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            ) : (
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <span className="font-medium">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
};

export default NewsPage;