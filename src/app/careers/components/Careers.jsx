"use client"
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Montserrat as MontserratFont } from "next/font/google";
import { IdCardLanyard , ExternalLink, Shield } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import { toast } from 'sonner';
import { CircleCheckBigIcon , ShieldAlert } from 'lucide-react'; 

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const accountId = process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID;

function Careers() {
    const [isOpen , setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useRef();
const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const sendEmail = async (e) => {
    e.preventDefault();
    const fileInput = form.current.resume;
    const file = fileInput.files[0];

    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.",{
          duration: 4000,
          icon: <ShieldAlert className="text-red-500" />,
          style: {
            background: "#fef2f2",
            border: "1px solid #f87171",
            color: "#7f1d1d",
          },
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
        accountId,
      );
      toast.success("Profile updated successfully!", {
        duration: 3000,
        icon: <CircleCheckBigIcon className="text-green-500" />,
        style: {
          background: "#ecfdf5",
          border: "1px solid #34d399",
          color: "#065f46",
        },
      })
      setIsOpen(false);
      form.current.reset();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send application. Please try again ❌", {
        duration: 4000,
        icon: <ShieldAlert className="text-red-500" />,
        style: {
          background: "#fef2f2",
          border: "1px solid #f87171",
          color: "#7f1d1d",
        },

      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-white pt-20">
      <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white uppercase"
        >
          Careers <IdCardLanyard className="inline mb-3" size={45} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-center text-gray-300 mb-12 max-w-3xl mx-auto ${montserrat.className}`}
        >
          Join Arrham Group and be part of our innovative team shaping the
          future in construction, healthcare, and engineering as of September
          2025.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 uppercase">
            Our{" "}
            <span className="text-emerald-300">
              Team
            </span>
          </h2>
          <p
            className={`text-center text-gray-200 mb-10 max-w-2xl mx-auto ${montserrat.className}`}
          >
            At Arrham Group, our team comprises over 500 dedicated professionals
            across Saudi Arabia, UAE, and Bahrain. As of September 2025, we have
            50 new engineers joining our construction division, 30 healthcare
            specialists enhancing our medical projects, and 20 administrative
            staff supporting operations. Our leadership includes seasoned
            experts like Ahmed Al-Shehri, CEO with 20 years of experience, and
            Fatima Al-Mansour, Head of Engineering with 15 years in
            infrastructure development. Together, we drive excellence and
            innovation daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 uppercase">
            Our{" "}
            <span className="text-emerald-300">
              Values
            </span>
          </h2>
          <p
            className={`text-center text-gray-200 mb-10 max-w-2xl mx-auto ${montserrat.className}`}
          >
            Arrham Group stands on four core values as of September 2025:
            <br />
            <strong>Integrity</strong>, where we uphold the highest ethical
            standards;
            <br />
            <strong>Innovation</strong>, driving cutting-edge solutions in every
            project;
            <br />
            <strong>Collaboration</strong>, fostering teamwork across
            departments;
            <br />
            <strong>Excellence</strong>, committing to superior quality in all
            we do. These values guide our 600+ employees and shape our mission
            to lead the industry with sustainability and trust.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg border-2 border-emerald-400 bg-emerald-500/10 px-3 py-2 font-semibold text-emerald-300 hover:bg-emerald-400/20 hover:text-white hover:border-emerald-300 transition-colors duration-200"
          >
            Apply Now <ExternalLink className="inline mb-1" size={20} />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-black p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 border border-emerald-400/40"
            >
              <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center">
                Apply Now
              </h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-800/30 border border-gray-600 focus:border-emerald-400 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-700/30 text-white border border-gray-600 focus:border-emerald-400 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-800/30 text-white border border-gray-600 focus:border-emerald-400 focus:outline-none"
                  required
                />
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  className="w-full p-3 rounded-lg bg-gradient-to-br from-gray-900/60 via-teal-900/40 to-emerald-800/30 text-white border border-gray-600 focus:border-emerald-400 focus:outline-none file:bg-emerald-500/10 file:text-emerald-300 file:border-0 file:px-4 file:py-2 file:cursor-pointer"
                  required
                />

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-6 py-3 bg-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg px-6 py-3 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
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
    description: "Explore career opportunities and learn about the team and values at Arrham Group as of September 2025.",
    keywords: "Arrham Group careers, team details, company values, jobs 2025",
  };
}