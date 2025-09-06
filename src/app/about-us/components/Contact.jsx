import React from 'react'
import { FaLinkedin, FaGithub, FaTwitterSquare, FaInstagram } from "react-icons/fa";
import { motion } from 'motion/react'
import { MessageCircleMoreIcon } from 'lucide-react';
function Contact({ contact , otheDetails }) {
  return (
    <div id='contact' className='border-b border-neutral-900 pb-20' >
      <motion.h1
        whileInView={{ opcity: 1 , y: 0 }}
        initial={{ opcity: 0 , y:-50 }}
        transition={{ duration: 0.5 }}
       className='my-10 text-center text-4xl font-extrabold text-white'  >
        Get in Touch <MessageCircleMoreIcon className='inline text-lgreen mb-2' size={40} />
        &nbsp;
      </motion.h1>
      <div className='text-center tracking-tighter' >
        <motion.p
          whileInView={{ opcity: 1 , x: 0 }}
          initial={{ opcity: 0 , x:-50 }}
          transition={{ duration: 1 }}
         className='my-4 text-2xl text-white' >{contact.address}</motion.p>
        <motion.p 
          whileInView={{ opcity: 1 , y: 0 }}
          initial={{ opcity: 0 , y:40 }}
          transition={{ duration: 1 }}
        
        className='my-4 text-2xl text-white'> {contact.phone}</motion.p>
        <a href="#" className='border-b text-2xl text-white' >
            {contact.email}
        </a>

      </div>
      <div className='flex items-center justify-center space-x-6 mt-8' >
        <a 
          href="https://www.linkedin.com/in/"
          target="_blank" 
          rel="noopener noreferrer"
          className="text-4xl text-white hover:text-blue-600 transition-colors"
        >
          <FaLinkedin />
        </a>

        <a 
          href="https://www.instagram.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-4xl text-white hover:text-pink-500 transition-colors"
        >
          <FaInstagram />
        </a>

        <a 
          href="https://twitter.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-4xl text-white hover:text-sky-500 transition-colors"
        >
          <FaTwitterSquare />
        </a>
      </div>
    </div>
  )
}

export default Contact