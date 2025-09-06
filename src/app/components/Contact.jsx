"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-20 text-white overflow-hidden border-t border-lgreen"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-lgreen/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Get In <span className="text-lgreen">Touch</span>
          </h2>
          <p className="text-lg text-white/70">
            Have questions or want to work with us? Fill out the form and our
            team will get back to you as soon as possible.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-lgreen" />
              <span>info@arrhamtrading.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-lgreen" />
              <span>+973 66332026</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-10 h-10 text-lgreen" />
              <span>
                ARRHAM TRADING AND CONTRACTING W.L.L Mr. Shabab 1445A & 1445G,
                Road 4630, Block 646, Nuwaidrat, Sitrah 644 Bahrain
              </span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lgreen transition"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lgreen transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lgreen transition resize-none"
              placeholder="Write your message..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-lgreen to-teal-500 text-black px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-lgreen/30"
          >
            Send Message <Send className="w-5 h-5" />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
