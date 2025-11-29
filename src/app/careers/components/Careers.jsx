  "use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Montserrat as MontserratFont } from "next/font/google";
import { IdCardLanyard, ExternalLink, ShieldAlert, CircleCheckBig } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const montserrat = MontserratFont({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const accountId = process.env.NEXT_PUBLIC_EMAILJS_ACCOUNT_ID;

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

  const sendEmail = async (e) => {
    e.preventDefault();
    const file = form.current.resume.files[0];

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
        accountId
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto py-12 px-4 md:px-8">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 uppercase tracking-wide"
        >
          Careers <IdCardLanyard className="inline mb-2 ml-2 text-emerald-400" size={45} />
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 ${montserrat.className}`}
        >
          Join <span className="text-emerald-300 font-semibold">Arrham Group</span> and be part of our
          innovative team shaping the future in{" "}
          <span className="text-emerald-400">construction</span>,{" "}
          <span className="text-emerald-400">healthcare</span>, and{" "}
          <span className="text-emerald-400">engineering</span> as of September 2025.
        </motion.p>

        {/* Sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 uppercase">
            Our <span className="text-emerald-300">Team</span>
          </h2>
          <p className={`text-center text-gray-200 max-w-4xl mx-auto ${montserrat.className}`}>
            With <strong>500+ dedicated professionals</strong> across Saudi Arabia, UAE, and Bahrain,
            we continue to grow stronger every year. As of September 2025,{" "}
            <span className="text-emerald-300">50 engineers</span> are joining our construction
            division, alongside <span className="text-emerald-300">30 healthcare specialists</span>{" "}
            and <span className="text-emerald-300">20 admin staff</span>. Guided by leaders like{" "}
            <strong>Ahmed Al-Shehri (CEO)</strong> and{" "}
            <strong>Fatima Al-Mansour (Head of Engineering)</strong>, we push boundaries with
            excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 uppercase">
            Our <span className="text-emerald-300">Values</span>
          </h2>
          <p className={`text-center text-gray-200 max-w-4xl mx-auto ${montserrat.className}`}>
            We stand firm on 4 pillars:
            <br /> <strong className="text-emerald-400">Integrity</strong> – highest ethical standards,
            <br /> <strong className="text-emerald-400">Innovation</strong> – cutting-edge solutions,
            <br /> <strong className="text-emerald-400">Collaboration</strong> – strong teamwork,
            <br /> <strong className="text-emerald-400">Excellence</strong> – quality in everything.
          </p>
        </motion.div>

        {/* Apply Button */}
        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg border-2 border-emerald-400 bg-emerald-500/10 px-6 py-3 text-lg font-semibold text-emerald-300 hover:bg-emerald-400/20 hover:text-white transition duration-200"
          >
            Apply Now <ExternalLink className="inline mb-1 ml-1" size={20} />
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
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 border border-emerald-400/40"
            >
              <h3 className="text-2xl font-bold text-emerald-300 mb-6 text-center uppercase">
                Apply Now
              </h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-emerald-400 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-emerald-400 outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-emerald-400 outline-none"
                  required
                />
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-300 file:bg-emerald-500/20 file:text-emerald-300 file:px-4 file:py-1 file:rounded-md file:cursor-pointer"
                  required
                />

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-5 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg px-6 py-2 bg-emerald-500 text-white hover:bg-emerald-600 transition"
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
    description:
      "Explore career opportunities and learn about the team and values at Arrham Group as of September 2025.",
    keywords: "Arrham Group careers, team details, company values, jobs 2025",
  };
}
