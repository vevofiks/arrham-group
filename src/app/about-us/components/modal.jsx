"use client";
import React from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Modal({ isOpen, onClose, project, companyName }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const [isZoomed, setIsZoomed] = React.useState(false);
  const transformRef = React.useRef(null);

  const handleZoomToggle = () => {
    if (isZoomed) {
      transformRef.current?.resetTransform();
      setIsZoomed(false);
    } else {
      setIsZoomed(true);
    }
  };

  console.log("Modal project data:", project);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="modal-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Modal box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-h-[92vh] overflow-y-auto rounded-2xl 
              bg-linear-to-br from-gray-900 via-teal-900/70 to-emerald-900/80 
              shadow-2xl shadow-emerald-500/20 backdrop-blur-xl border border-emerald-500/20
              max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-4xl"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-gray-300 
                hover:bg-black/60 hover:text-white transition-all duration-200 backdrop-blur-sm
                hover:scale-110 active:scale-95"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Content Container */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Title */}
              {project?.name && (
                <h2
                  className="text-center text-2xl sm:text-3xl md:text-4xl bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent font-bold 
                  mb-6 md:mb-8 leading-tight tracking-tight"
                >
                  {project.name}
                </h2>
              )}

              {/* Carousel wrapper */}
              {project?.status && (
                <div className="flex justify-center mb-6">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                      project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-yellow-500/20 text-yellow-300'}`}>
                    {project.status}
                  </span>
                </div>
              )}

              {/* Carousel wrapper */}
              <div className="relative w-full mb-6 md:mb-8">
                <div
                  className="relative w-full aspect-16/10 sm:aspect-video rounded-xl 
                  overflow-hidden bg-linear-to-br from-black/60 to-gray-900/60 
                  shadow-lg ring-1 ring-white/10 group"
                >
                  {/* Zoom Toggle Button */}
                  <button
                    onClick={handleZoomToggle}
                    className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/60 text-white 
                      hover:bg-black/80 transition-all duration-200 backdrop-blur-sm
                      hover:scale-110 active:scale-95"
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                  </button>

                  {/* Zoom Indicator */}
                  {/* {isZoomed && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 text-white/80 text-xs font-medium backdrop-blur-sm">
                      Drag to pan • Scroll to zoom
                    </div>
                  )} */}

                  <Carousel
                    opts={{ align: "center", loop: true }}
                    plugins={[plugin.current]}
                    className="w-full h-auto"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                  >
                    <CarouselContent>
                      {project?.images?.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <Card className="bg-transparent shadow-none border-0 w-full h-full flex items-center justify-center">
                            <CardContent className="relative w-full h-full flex items-center justify-center p-0">
                              {isZoomed ? (
                                <TransformWrapper
                                  ref={transformRef}
                                  initialScale={1}
                                  minScale={1}
                                  maxScale={4}
                                  wheel={{ step: 0.1, smoothStep: 0.001 }}
                                  pinch={{ step: 5 }}
                                  doubleClick={{ disabled: false }}
                                  velocityAnimation={{
                                    animationTime: 400,
                                    animationType: "easeOut",
                                    sensitivity: 1,
                                  }}
                                >
                                  <TransformComponent>
                                    <div className="relative w-96 h-64 flex items-center justify-center cursor-grab active:cursor-grabbing">
                                      <Image
                                        src={image || "/arrham3.png"}
                                        alt={`${project.name || "Project"} - Image ${index + 1}`}
                                        width={400}
                                        height={300}
                                        className="object-contain select-none"
                                        priority={index === 0}
                                        draggable={false}
                                      />
                                    </div>
                                  </TransformComponent>
                                </TransformWrapper>
                              ) : (
                                <div className="relative w-full max-w-4xl aspect-video flex items-center justify-center">
                                  <Image
                                    src={image || "/arrham3.png"}
                                    alt={`${project.name || "Project"} - Image ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {project?.images?.length > 1 && (
                      <>
                        <CarouselPrevious
                          className="left-2 sm:left-4 bg-black/50 border-white/40 
        hover:bg-white/20 text-white backdrop-blur-sm"
                        />
                        <CarouselNext
                          className="right-2 sm:right-4 bg-black/50 border-white/40 
        hover:bg-white/20 text-white backdrop-blur-sm"
                        />
                      </>
                    )}
                  </Carousel>
                </div>

                {/* Image counter indicator */}
                {project?.images?.length > 1 && (
                  <div
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 
                    px-3 py-1 rounded-full  backdrop-blur-sm 
                    text-white/80 text-xs font-medium"
                  >
                    {project.images?.length} photos
                  </div>
                )}
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Location */}
                {project?.location && (
                  <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h4 className="text-emerald-400 font-semibold mb-2">Location</h4>
                    <p className="text-gray-200">{project.location}</p>
                  </div>
                )}

                {/* Client */}
                {project?.clientName && (
                  <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h4 className="text-emerald-400 font-semibold mb-2">Client</h4>
                    <p className="text-gray-200">{project.clientName}</p>
                  </div>
                )}

                {/* Main Contractor */}
                {project?.mainContractor && (
                  <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h4 className="text-emerald-400 font-semibold mb-2">Main Contractor</h4>
                    <p className="text-gray-200">{project.mainContractor}</p>
                  </div>
                )}

                {/* Branch */}
                {project?.branchId && (
                  <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <h4 className="text-emerald-400 font-semibold mb-2">Company</h4>
                  <p className="text-gray-200">{companyName}</p>
                  </div>
                )}
              </div>

              {/* Project Description */}
              {project?.description && (
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="text-center text-xl sm:text-2xl font-bold mb-4 bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                    Project Overview
                  </h3>
                  <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400" />
                  <p className="text-gray-200 text-center leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
