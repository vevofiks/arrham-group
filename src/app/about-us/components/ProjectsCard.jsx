'use client'
import { MapPin } from 'lucide-react';

function ProjectCard({ setIsOpen, project, index, company }) {
  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('completed')) return 'text-emerald-300';
    if (status.toLowerCase().includes('progress')) return 'text-yellow-400';
    return company.primaryColor.text;
  };

  const getStatusBg = (status) => {
    if (status.toLowerCase().includes('completed')) return 'bg-emerald-400/10';
    if (status.toLowerCase().includes('progress')) return 'bg-yellow-400/10';
    return `${company.primaryColor.text}/10`;
  };

  return (
    <div
      className={`group relative rounded-2xl border 
        ${company.primaryColor.border}
        bg-gradient-to-br ${company.color[0]} ${company.color[1]}
        backdrop-blur-md shadow-lg ${company.primaryColor.shadow}
        p-5 ${company.primaryColor.hoverBorder} hover:shadow-lg
        transition-all duration-300`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Title + Status */}
      <div className="flex items-center justify-between mb-4">
        <h4
          className={`text-white font-semibold text-lg 
            group-hover:${company.primaryColor.text} transition-colors`}
        >
          {project.name}
        </h4>
        <div
          className={`px-3 py-1.5 rounded-full border border-emerald-800 text-xs font-semibold tracking-wide 
            ${getStatusBg(project.status)} ${getStatusColor(project.status)}`}
        >
          {project.status}
        </div>
      </div>

      {/* Location + Action */}
      <div className="flex items-center justify-between text-white text-sm">
        <div className="flex items-center opacity-80 group-hover:opacity-100 transition">
          <MapPin className={`${company.primaryColor.text} mr-2`} size={18} />
          {project.location}
        </div>

        <button
          className={`rounded-lg border-2 ${company.primaryColor.border} 
            bg-white/10 px-3 py-1 text-xs font-semibold ${company.primaryColor.text} 
            cursor-pointer hover:bg-white/20 hover:scale-105
            transition-colors duration-200`}
          onClick={() => setIsOpen(true)}
        >
          Show More
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
