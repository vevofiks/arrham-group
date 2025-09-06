"use client";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Avenues Mall",
    description: "Complete MEP and fit-out works for a leading shopping destination.",
  },
  {
    name: "Saudi Aramco Facilities",
    description: "Engineering & construction services with international safety standards.",
  },
  {
    name: "Luxury Villas",
    description: "Custom architectural finishes and renewable energy solutions.",
  },
];

const ProjectHighlights = () => {
  return (
    <section className="relative bg-zinc-950 py-20 px-6 md:px-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lgreen/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 blur-3xl rounded-full" />
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Project <span className="text-lgreen">Highlights</span>
        </h2>
        <p className="text-lg text-white/70 mt-4">
          Trusted by leading organizations across Saudi Arabia & GCC.
        </p>
        <div className="w-24 h-1 bg-lgreen mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 p-6 rounded-2xl hover:border-lgreen hover:shadow-lg hover:shadow-lgreen/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
            <p className="text-white/70">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectHighlights;
