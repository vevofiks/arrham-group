'use client'
import { MapPin } from 'lucide-react';
import TiltedCard from '@/components/TiltedCard';

function ProjectCard({ setIsOpen, project, index, company }) {
  const getStatusColor = (status) => {
    if (status.toLowerCase().includes('completed')) return 'text-emerald-300';
    if (status.toLowerCase().includes('progress')) return 'text-yellow-400';
    return company.primaryColor.text;
  };

 return (
    <div 
      className='p-6 w-full'
    >
      {/* Changed Grid to Flex to center the single item perfectly */}
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[300px]">

          <TiltedCard
            imageSrc={project.images[0]}
            altText={project.name}
            captionText={project.name}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
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
