
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";

import { Montserrat as MontserratFont } from "next/font/google";
import Image from "next/image";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function NewsDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch (err) {
        console.error("Error fetching news detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex justify-center items-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white/70 text-lg">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (!news) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 flex flex-col justify-center items-center text-center px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.34 16.5C2.57 18.333 3.53 20 5.07 20z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-white/70 mb-8">The article you&apos;re looking for doesn&apos;t exist
          or has been removed.</p>
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition-colors"
        >
          Go Back
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
    >


      <div className="relative z-10 px-6 md:px-20 py-20 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 cursor-pointer"
          >
            <motion.button
              onClick={() => router.back()}
              whileHover={{ x: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 cursor-pointer text-emerald-400 hover:text-teal-300 font-semibold transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to News
            </motion.button>
          </motion.div>

          {/* Article header */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <header className="text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl font-extrabold leading-tight"
              >
                <span className={`${montserrat.className} bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent`}>
                  {news.title}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center items-center gap-4 text-sm text-white/60"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Published on {new Date(news.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </motion.div>
            </header>

            {/* Article image */}
            {news.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              </motion.div>
            )}

            {/* Article content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-white/90 leading-relaxed text-lg md:text-xl whitespace-pre-wrap">
                  {news.content}
                </p>
              </div>
            </motion.div>

            {/* Article footer */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 border-t border-white/10 text-center"
            >
              <p className="text-white/50 text-sm">
                Thank you for reading! Stay tuned for more updates.
              </p>
            </motion.footer>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}