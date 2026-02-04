'use client'
import TiltedCard from '@/components/TiltedCard';

function ProjectCard({ setIsOpen, project, index, company }) {

  const isVideo = (url) => {
    if (typeof url !== "string") return false;
    return url.includes("video/upload") || url.match(/\.(mp4|webm|ogg|mov|mkv)$/i);
  };

  const firstMedia = project.images?.[0];
  const isFirstMediaVideo = isVideo(firstMedia);

  return (
    <div className='p-6 w-full'>
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[300px]">
          <TiltedCard
            imageSrc={!isFirstMediaVideo ? firstMedia : null}
            altText={project.name}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            displayOverlayContent={true}
            overlayContent={
              <div className="bg-linear-to-r from-teal-600/90 to-emerald-600/90 backdrop-blur-sm rounded-lg px-4 py-3 m-4 shadow-lg border border-teal-400/30">
                <p className="text-lg text-white font-semibold">
                  {project.name}
                </p>
              </div>
            }
          >
            {/* Fallback content when firstMedia is a video */}
            {isFirstMediaVideo && (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-emerald-600 to-teal-900 p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-white text-xl font-bold">{project.name}</p>
                </div>
              </div>
            )}
          </TiltedCard>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;