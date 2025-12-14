import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Navigation: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-purple-600" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
          NB_DEV
        </div>
        <div className="hidden md:flex gap-8" role="menubar">
          {['Hero', 'Skills', 'Projects', 'Certificates', 'Game', 'Blog'].map((item) => (
            <button
              key={item}
              role="menuitem"
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-gray-200 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-sm px-2 py-1"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );