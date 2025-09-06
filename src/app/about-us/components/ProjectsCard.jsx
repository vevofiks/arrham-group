'use client'
import { MapPin } from 'lucide-react';

function ProjectCard({ setIsOpen, project, index }) {
  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('completed')) return 'text-emerald-400';
    if (status.toLowerCase().includes('progress')) return 'text-yellow-400';
    return 'text-cyan-400';
  };

  const getStatusBg = (status) => {
    if (status.toLowerCase().includes('completed')) return 'bg-emerald-400/10';
    if (status.toLowerCase().includes('progress')) return 'bg-yellow-400/10';
    return 'bg-cyan-400/10';
  };

  return (
    <div
      className="group relative rounded-2xl border border-lgreen/40 
        bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-800/30 
        backdrop-blur-md shadow-lg shadow-black/20
        p-5 hover:shadow-emerald-900/30 hover:border-emerald-400/60
        transition-all duration-300"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Title + Status */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-semibold text-lg group-hover:text-emerald-300 transition-colors">
          {project.name}
        </h4>
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide 
            ${getStatusBg(project.status)} ${getStatusColor(project.status)}`}
        >
          {project.status}
        </div>
      </div>

      {/* Location + Action */}
      <div className="flex items-center justify-between text-white text-sm">
        <div className="flex items-center opacity-80 group-hover:opacity-100 transition">
          <MapPin className="mr-2 text-emerald-300" size={18} />
          {project.location}
        </div>

        <button
          className="rounded-lg border-2 border-emerald-400 bg-emerald-500/10 
            px-3 py-1 text-xs font-semibold text-emerald-300 
            hover:bg-emerald-400/20 hover:text-white hover:border-emerald-300 
            transition-colors duration-200"
          onClick={() => setIsOpen(true)}
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
