import React from 'react';

const Sidebar = ({ sections, activeId }) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Table of Contents
      </p>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
          className={`
            group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 border-l-2
            ${
              activeId === section.id
                ? 'bg-gray-800 text-emerald-400 border-emerald-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-transparent'
            }
          `}
        >
          <span className="truncate">{section.title}</span>
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;