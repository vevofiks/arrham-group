'use client'
import { MapPin } from 'lucide-react';

function ProjectCard({ setIsOpen , project, index }) {

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('completed')) return 'text-[#2ec9a2]';
    if (status.toLowerCase().includes('progress')) return 'text-yellow-400';
    return 'text-cyan-400';
  };

  const getStatusBg = (status) => {
    if (status.toLowerCase().includes('completed')) return 'bg-[#2ec9a2]/10';
    if (status.toLowerCase().includes('progress')) return 'bg-yellow-400/10';
    return 'bg-cyan-400/10';
  };
  return (
    <div
      className="bg-cyan-400/40 backdrop-blur-sm border border-lgreen rounded-lg p-4 
                hover:border-[#2ec9a2]/50 transition-all duration-300 hover:shadow-lg 
                hover:shadow-[#2ec9a2]/10 group"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      
    <div className="flex items-center justify-between mb-3 gap-2">
        <h4 className="text-white font-semibold text-lg">{project.name}</h4>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(
            project.status
          )} ${getStatusColor(project.status)}`}
        >
          {project.status}
        </div>



      </div>

      <div className="flex items-center justify-between gap-2 text-white text-sm">
        <div className='flex items-center' >
          <MapPin className='mr-2' size={20} />
          {project.location}
        </div>

          <button

            className='bg-white border-lgreen text-lgreen font-bold border-2 p-1 rounded-lg text-xs'
            onClick={() => setIsOpen(true)} 
          >
            Show More
          </button>
      </div>
    </div>
  );
}

export default ProjectCard;
