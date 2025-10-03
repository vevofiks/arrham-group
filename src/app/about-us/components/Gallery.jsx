import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { Montserrat as MontserratFont } from "next/font/google";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const CompanyWorksGallery = ({
  companyId,
  columns = 3,
  onWorkClick = null,
  emptyMessage = "No works to display",
}) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`/api/gallery?branchId=${companyId}`);
        const result = await res.json();

        if (result.success && result.data && result.data.images?.length > 0) {
          const images = result.data.images.map((img, index) => ({
            id: `${result.data._id}-${index}`,
            image: img,
            height: 250 + Math.floor(Math.random() * 100),
          }));
          setWorks(images);
        } else {
          setWorks([]);
        }
      } catch (error) {
        console.error("Error while fetching works:", error);
        setWorks([]);
      }
    };

    if (companyId) fetchWorks();
    else setWorks([]);
  }, [companyId]);

  const handleWorkClick = (work) => {
    if (onWorkClick) onWorkClick(work);
    else setSelectedWork(work);
  };

  // Masonry layout distribution
  const distributeToColumns = () => {
    const cols = Array.from({ length: columns }, () => []);
    const colHeights = Array(columns).fill(0);

    works.forEach((work) => {
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestColIndex].push(work);
      colHeights[shortestColIndex] += work.height;
    });

    return cols;
  };

  const workColumns = distributeToColumns();

  return (
    <div className="relative">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase my-6 ${montserrat.className}`}
        >
          <span
            className={`bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent`}
          >
            Gallery
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-24 h-1 bg-emerald-400 mx-auto rounded-full"
        />
      </div>
      <div className="flex gap-4 p-4">
        {workColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((work) => (
              <div
                key={work.id}
                onClick={() => handleWorkClick(work)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={work.image}
                    alt="work"
                    style={{ height: `${work.height}px` }}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedWork && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
              >
                <X size={24} className="text-gray-700" />
              </button>
              <img
                src={selectedWork.image}
                alt="work Image"
                className="w-full max-h-[80vh] object-contain bg-white/40"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
