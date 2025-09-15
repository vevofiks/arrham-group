'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  Mail,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const sidebarItems = [
  
  {
    name: 'News',
    href: '/admin/news',
    icon: Newspaper,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebar = () => setIsSidebarOpen(false);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isSidebarOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg lg:hidden hover:bg-white/20 transition-all duration-200 border border-white/10"
        >
          <motion.div
            animate={{ rotate: isSidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </motion.button>
      )}

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="fixed left-0 top-0 flex flex-col w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-xl">
          <SidebarContent pathname={pathname} onLinkClick={closeSidebar} />
        </div>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 40,
              opacity: { duration: 0.3 }
            }}
            className="fixed top-0 left-0 z-40 flex flex-col w-72 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl lg:hidden"
          >
            <SidebarContent pathname={pathname} onLinkClick={closeSidebar} isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Separate component for sidebar content to avoid duplication
function SidebarContent({ pathname, onLinkClick, isMobile = false }) {
  return (
    <>
      {/* Logo/Brand */}
      <div className={`flex items-center px-6 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-slate-700/50 ${isMobile ? 'h-16 mt-16' : 'h-20'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-blue-100">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <motion.div
              key={item.name}
              initial={isMobile ? { x: -30, opacity: 0 } : false}
              animate={isMobile ? { x: 0, opacity: 1 } : false}
              transition={isMobile ? { 
                delay: index * 0.05, 
                duration: 0.3,
                ease: "easeOut"
              } : false}
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                className={`
                  group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                <div className={`
                  p-1.5 rounded-lg mr-3 transition-all duration-200
                  ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-slate-600/50 group-hover:bg-slate-500/50'
                  }
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <motion.div 
        className="p-4 border-t border-slate-700/50 bg-slate-800/50"
        initial={isMobile ? { y: 30, opacity: 0 } : false}
        animate={isMobile ? { y: 0, opacity: 1 } : false}
        transition={isMobile ? { 
          delay: sidebarItems.length * 0.05 + 0.1, 
          duration: 0.3 
        } : false}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">AD</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-400 truncate">
                admin@company.com
              </p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}