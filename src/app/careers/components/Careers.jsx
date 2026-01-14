"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Montserrat as MontserratFont } from "next/font/google";
import { IdCardLanyard, ExternalLink, ShieldAlert, CircleCheckBig, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import * as yup from "yup";

// Initialize font with variable for easy Tailwind integration if needed, 
// but we will apply className directly to the wrapper.
const montserrat = MontserratFont({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function Careers() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const careersSchema = yup.object().shape({
    full_name: yup.string().required("Full name is required").min(2, "Name must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    phone: yup.string().required("Phone number is required").matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  });

  const sendEmail = async (e) => {
    e.preventDefault();

    // Validate form fields with Yup
    try {
      await careersSchema.validate({
        full_name: form.current.full_name.value,
        email: form.current.email.value,
        phone: form.current.phone.value,
      }, { abortEarly: false });
    } catch (err) {
      const errors = err.inner.map(e => e.message).join(", ");
      toast.error(errors, {
        icon: <ShieldAlert className="text-red-500" />,
      });
      return;
    }


    const file = form.current.resume.files[0];

    // Check file size
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error(`Resume file exceeds 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`, {
        icon: <ShieldAlert className="text-red-500" />,
      });
      return;
    }

    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.", {
        icon: <ShieldAlert className="text-red-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const base64Resume = file ? await toBase64(file) : "";
      await emailjs.send(
        serviceId,
        templateId,
        {
          full_name: form.current.full_name.value,
          email: form.current.email.value,
          phone: form.current.phone.value,
          resume: base64Resume,
        },
        publicKey
      );
      toast.success("Application submitted successfully!", {
        icon: <CircleCheckBig className="text-green-500" />,
      });
      setIsOpen(false);
      form.current.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send application. Please try again ❌", {
        icon: <ShieldAlert className="text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white pt-20 md:pt-32 lg:pt-40 pb-12 ${montserrat.className}`}>
      {/* Background linear Mesh (Subtle) */}
      <div className="fixed inset-0 bg-[radial-linear(ellipse_at_top,var(--tw-linear-stops))] from-gray-800 via-gray-950 to-black -z-10" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-wider mb-2 text-white">
            Careers
            <IdCardLanyard className="inline-block ml-3 -mt-2 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" size={48} strokeWidth={1.5} />
          </h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg md:text-xl leading-relaxed text-gray-300 max-w-3xl mx-auto mb-20 font-medium"
        >
          Across{" "}
          <span className="text-emerald-400 font-semibold">
            Saudi Arabia, the UAE, and Bahrain
          </span>
          , our dedicated professionals drive continuous growth year after year.
          Empowered by visionary leadership, collaborative engineers, and a highly
          skilled workforce, we consistently push boundaries and set new standards of
          excellence.
        </motion.p>

        {/* Section: Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-8 text-gray-100">
            Our <span className="text-emerald-500">Team</span>
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-10 shadow-xl max-w-4xl mx-auto">
            <p className="text-base md:text-lg leading-loose text-gray-300">
              With <strong className="text-white text-xl">500+ dedicated professionals</strong> across Saudi Arabia, UAE, and Bahrain,
              we continue to grow stronger every year.
              <br className="hidden md:block my-4" />
              We are welcoming:
            </p>

            <div className="flex flex-wrap justify-center gap-4 my-8 font-semibold text-emerald-100">
              <span className="bg-emerald-900/30 border border-emerald-500/30 px-4 py-2 rounded-full">50 Engineers</span>
              <span className="bg-emerald-900/30 border border-emerald-500/30 px-4 py-2 rounded-full">30 Healthcare Specialists</span>
              <span className="bg-emerald-900/30 border border-emerald-500/30 px-4 py-2 rounded-full">20 Admin Staff</span>
            </div>

            <p className="text-base md:text-lg leading-loose text-gray-300">
              Guided by leaders like <strong className="text-white">Ahmed Al-Shehri (CEO)</strong> and <strong className="text-white">Fatima Al-Mansour (Head of Engineering)</strong>, we push boundaries with excellence.
            </p>
          </div>
        </motion.div>

        {/* Section: Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-8 text-gray-100">
            Our <span className="text-emerald-500">Values</span>
          </h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              { title: "Integrity", desc: "Highest ethical standards." },
              { title: "Innovation", desc: "Cutting-edge solutions." },
              { title: "Collaboration", desc: "Strong teamwork." },
              { title: "Excellence", desc: "Quality in everything." }
            ].map((val, idx) => (
              <div key={idx} className="bg-gray-900/30 border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-colors flex items-center gap-4">
                <div className="bg-emerald-500/10 p-2 rounded-full text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-emerald-400 font-bold uppercase tracking-wide text-sm">{val.title}</h4>
                  <p className="text-gray-300">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Apply Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-center pb-10">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-emerald-600 font-montserrat rounded-xl hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-gray-900"
          >
            Apply Now <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)} // Close when clicking outside
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              className="bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
                    Start Your Journey
                  </h3>
                  <p className="text-gray-400 text-sm">Fill in your details to apply</p>
                </div>

                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +1 234 567 890"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-100 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Resume (PDF)</label>
                    <input
                      type="file"
                      name="resume"
                      accept="application/pdf"
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-sm text-gray-300 
                      file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 
                      file:text-xs file:font-semibold file:uppercase file:tracking-wide
                      file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 
                      cursor-pointer focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Careers;

export async function generateMetadata() {
  return {
    title: "Arrham Group - Careers",
    description:
      "Explore career opportunities and learn about the team and values at Arrham Group as of September 2025.",
    keywords: "Arrham Group careers, team details, company values, jobs 2025",
  };
}