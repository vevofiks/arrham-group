import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  children, // Added children support
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full perspective-midrange flex flex-col items-center justify-center"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouse}
      onMouseEnter={() => { scale.set(scaleOnHover); opacity.set(1); }}
      onMouseLeave={() => { opacity.set(0); scale.set(1); rotateX.set(0); rotateY.set(0); rotateFigcaption.set(0); }}
    >
      <motion.div
        className="relative transform-3d"
        style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale }}
      >
        {/* If imageSrc is provided, show image. Otherwise, show children (plain text) */}
        {imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform transform-[translateZ(0)]"
            style={{ width: imageWidth, height: imageHeight }}
          />
        ) : (
          <div 
            className="absolute top-0 left-0 flex items-center justify-center bg-zinc-900 rounded-[15px] border border-zinc-800 overflow-hidden"
            style={{ width: imageWidth, height: imageHeight }}
          >
            {children}
          </div>
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-2 will-change-transform transform-[translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>
    </figure>
  );
}