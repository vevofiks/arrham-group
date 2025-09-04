'use client';
import { motion } from 'framer-motion';
const VisionMissionCards = ({ title , content , Icon }) => {
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section >
     <div className="">
        <motion.div
          className='max-w-6xl mb-6 md:mb-0 mx-auto lg:px-8 px-6 sm:px-4'
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-sm transition-all duration-500 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/20 min-h-[320px] flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <motion.div 
              className="relative z-10 mb-8"
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center shadow-xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <motion.h3 
              className="relative z-10 text-4xl font-extrabold mb-8 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                {title}
              </span>
            </motion.h3>

            <motion.p 
              className="relative z-10 text-white/90 leading-relaxed text-lg font-medium flex-grow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
                {content}
            </motion.p>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionCards;