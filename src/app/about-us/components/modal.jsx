"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Modal({ isOpen, onClose, project }) {
  console.log("Modal project:", project);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  console.log(project)

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
              bg-gradient-to-br from-gray-900 via-teal-900/70 to-emerald-900/80 
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
                  className="text-center text-2xl sm:text-3xl md:text-4xl text-white font-bold 
                  mb-6 md:mb-8 leading-tight tracking-tight"
                >
                  {project.name}
                </h2>
              )}

              {/* Carousel wrapper */}
              <div className="relative w-full mb-6 md:mb-8">
                <div
                  className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl 
                  overflow-hidden bg-gradient-to-br from-black/60 to-gray-900/60 
                  shadow-lg ring-1 ring-white/10"
                >
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
                              <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">
                                <Image
                                  src={image || "/arrham3.png"}
                                  alt={`${project.name || "Project"} - Image ${index + 1
                                    }`}
                                  fill
                                  className="object-contain"
                                  priority={index === 0}
                                />
                              </div>
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

              {/* Description */}
              {project?.description && (
                <div className="max-w-3xl mx-auto">
                  <h3
                    className="text-center text-xl sm:text-2xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight
                    bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow"
                  >
                    Project Overview
                  </h3>
                  <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                  <p
                    className="text-gray-100 text-center text-base sm:text-lg leading-relaxed 
                    tracking-wide font-light"
                  >
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
