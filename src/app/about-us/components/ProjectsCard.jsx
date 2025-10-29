'use client'
import { MapPin } from 'lucide-react';
import TiltedCard from '@/components/TiltedCard';

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

  console.log(project)
  return (
    <div 
      className='p-6 w-full'
    >
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        <div className="w-full max-w-[300px]">

          <TiltedCard
            imageSrc={project.images[0]}
            altText={project.name}
            captionText={project.name}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="260px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="text-lg m-4 text-white mb-3 font-semibold">{project.name}</p>

            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
