import React, { useState } from 'react';
import { X } from 'lucide-react';

export const CompanyWorksGallery = ({ 
  works = [],
  columns = 3,
  onWorkClick = null,
  emptyMessage = "No works to display"
}) => {
  const [selectedWork, setSelectedWork] = useState(null);

  const sampleWorks = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      category: "Interior Design",
      height: 250
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
      category: "Branding",
      height: 320
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
      category: "UI/UX Design",
      height: 280
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      category: "Web Design",
      height: 300
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800",
      category: "Marketing",
      height: 260
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      category: "Photography",
      height: 290
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      category: "Architecture",
      height: 310
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800",
      category: "Digital Marketing",
      height: 240
    }
  ];

  const displayWorks = works.length > 0 ? works : sampleWorks;

  const handleWorkClick = (work) => {
    if (onWorkClick) {
      onWorkClick(work);
    } else {
      setSelectedWork(work);
    }
  };

  // Distribute works into columns for masonry layout
  const distributeToColumns = () => {
    const cols = Array.from({ length: columns }, () => []);
    const colHeights = Array(columns).fill(0);

    displayWorks.forEach(work => {
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestColIndex].push(work);
      colHeights[shortestColIndex] += work.height || 250;
    });

    return cols;
  };

  const workColumns = distributeToColumns();

  if (displayWorks.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
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