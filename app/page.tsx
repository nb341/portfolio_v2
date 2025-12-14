'use client';
import React, { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface Skill {
  cat: 'Frontend' | 'Backend' | 'DevOps' | 'Database' | 'ML/AI';
  color: number;
}

export interface Project {
  id: number;
  title: string;
  company: string;
  category: 'fullstack' | 'devops' | 'frontend' | 'ml';
  description: string;
  tags: string[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  code: string;
  icon: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  url: string;
}

export interface AppData {
  skills: Record<string, Skill>;
  projects: Project[];
  certificates: Certificate[];
  blogPosts: BlogPost[];
}

// ==========================================
// 2. DATA SERVICE (MOCK CMS)
// ==========================================

const mockFetchData = (): Promise<AppData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        skills: {
          'React': { cat: 'Frontend', color: 0x61dafb },
          'TypeScript': { cat: 'Frontend', color: 0x3178c6 },
          'Next.js': { cat: 'Frontend', color: 0xffffff },
          'Angular': { cat: 'Frontend', color: 0xdd0031 },
          '.NET': { cat: 'Backend', color: 0x512bd4 },
          'C#': { cat: 'Backend', color: 0x239120 },
          'Python': { cat: 'Backend', color: 0x3776ab },
          'Node.js': { cat: 'Backend', color: 0x339933 },
          'Django': { cat: 'Backend', color: 0x092e20 },
          'Docker': { cat: 'DevOps', color: 0x2496ed },
          'Azure': { cat: 'DevOps', color: 0x0078d4 },
          'PostgreSQL': { cat: 'Database', color: 0x336791 },
          'MongoDB': { cat: 'Database', color: 0x47a248 },
          'TensorFlow': { cat: 'ML/AI', color: 0xff6f00 },
          'Git': { cat: 'DevOps', color: 0xf05032 }
        },
        projects: [
          {
            id: 1,
            title: "FATCA Compliance Platform",
            company: "CIBC Caribbean",
            category: "fullstack",
            description: "Built responsive React.js applications with Chakra-UI and ApexCharts, improving data quality by 40%. Developed .NET 6 REST APIs as middleware for SOAP integration.",
            tags: ["React.js", "Chakra-UI", ".NET 6", "SOAP API", "Azure"]
          },
          {
            id: 2,
            title: "Azure SSO Implementation",
            company: "CIBC Caribbean",
            category: "devops",
            description: "Implemented Single Sign-On using Azure AD and MSAL.js for React apps and .NET Web APIs, with token validation and role-based access control.",
            tags: ["Azure AD", "MSAL.js", "SSO", "RBAC"]
          },
          {
            id: 3,
            title: "CI/CD Pipeline Optimization",
            company: "CIBC Caribbean",
            category: "devops",
            description: "Automated Azure DevOps pipelines, reducing deployment time from 15 minutes to 30 seconds (98% efficiency gain).",
            tags: ["Azure DevOps", "CI/CD", "Docker", "Automation"]
          },
          {
            id: 4,
            title: "E-Commerce Platform",
            company: "Associated Brands Industries",
            category: "frontend",
            description: "Developed e-commerce prototype using React.js and Next.js with real-time sales dashboards.",
            tags: ["React.js", "Next.js", "E-Commerce"]
          },
          {
            id: 5,
            title: "HPC Research",
            company: "University of South Dakota",
            category: "ml",
            description: "Graduate coursework in High Performance Computing, Pattern Recognition, Machine Learning, and Reinforcement Learning.",
            tags: ["HPC", "ML", "Reinforcement Learning"]
          }
        ],
        certificates: [
          { id: 1, title: "Querying Microsoft SQL Server", issuer: "Microsoft", code: "70-461, 761", icon: "🗄️", description: "Advanced T-SQL querying, optimization, and database management techniques for SQL Server." },
          { id: 2, title: "ASP.NET Core MVC (.NET 6)", issuer: "Udemy", code: "Complete Course", icon: "⚙️", description: "Comprehensive guide to building modern web applications with ASP.NET Core MVC framework." },
          { id: 3, title: "Azure Data Factory", issuer: "Udemy", code: "Beginner Course", icon: "☁️", description: "Data ingestion, ETL pipelines, and cloud-based data integration using Azure Data Factory." },
          { id: 4, title: "WCAG 2.1 Accessibility", issuer: "USD", code: "Professional", icon: "♿", description: "VPAT evaluations, accessibility testing with JAWS/NVDA, and PDF remediation expertise." }
        ],
        blogPosts: [
          { id: 1, title: "Optimizing CI/CD Pipelines in Azure", category: "devops", date: "Dec 2024", excerpt: "How we reduced deployment time by 98%...", url: "https://medium.com" },
          { id: 2, title: "Implementing SSO with Azure AD", category: "dotnet", date: "Nov 2024", excerpt: "A comprehensive guide to MSAL.js...", url: "https://freecodecamp.org" },
          { id: 3, title: "Building Accessible Web Applications", category: "frontend", date: "Nov 2024", excerpt: "WCAG 2.1 standards and testing...", url: "https://medium.com" },
          { id: 4, title: "React Performance Optimization", category: "frontend", date: "Oct 2024", excerpt: "Techniques that improved data quality by 40%...", url: "https://dev.to" },
          { id: 5, title: "Understanding React Server Components", category: "frontend", date: "Sep 2024", excerpt: "Deep dive into RSC and Next.js 13...", url: "https://dev.to" },
          { id: 6, title: "Docker Networking 101", category: "devops", date: "Aug 2024", excerpt: "Basics of container communication...", url: "https://medium.com" },
          { id: 7, title: "Introduction to Machine Learning", category: "ai", date: "Aug 2024", excerpt: "Getting started with Python and Scikit-learn...", url: "https://medium.com" }
        ]
      });
    }, 1500);
  });
};

// ==========================================
// 3. UI COMPONENTS
// ==========================================

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
              className="text-gray-200 hover:text-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-sm px-2 py-1 uppercase tracking-wider text-sm font-medium"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || typeof THREE === 'undefined') return;
    
    // Accessibility: Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    const objects: THREE.Mesh[] = [];
    const geometries = [
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.OctahedronGeometry(1),
      new THREE.IcosahedronGeometry(1)
    ];

    for (let i = 0; i < 12; i++) {
      const geo = geometries[i % geometries.length];
      const mat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x9d4edd : 0xc77dff,
        wireframe: i % 3 === 0,
        transparent: true,
        opacity: 0.7
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      // Store custom velocity data
      (mesh.userData as any).speed = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 };
      scene.add(mesh);
      objects.push(mesh);
    }

    const light = new THREE.PointLight(0x9d4edd, 2);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    camera.position.z = 15;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Only rotate if reduced motion is NOT enabled
      if (!prefersReducedMotion) {
        objects.forEach(obj => {
          const speed = (obj.userData as any).speed;
          obj.rotation.x += speed.x;
          obj.rotation.y += speed.y;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        role="img"
        aria-label="Abstract 3D floating shapes animation"
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
          Narindra Balkissoon
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">
          Full-Stack Developer | Computer Science Graduate Student
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Frontend Specialist | .NET APIs | HPC & ML Enthusiast
        </p>
        <div className="flex gap-4 justify-center">
          <a href="https://github.com/nb341" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-900/30 border-2 border-purple-600 text-purple-200 rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400">
            GitHub
          </a>
          <a href="https://linkedin.com/in/narindra-balkissoon" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-900/30 border-2 border-purple-600 text-purple-200 rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400">
            LinkedIn
          </a>
          <button onClick={() => alert("Resume download coming soon!")} className="px-6 py-3 bg-purple-900/30 border-2 border-purple-600 text-purple-200 rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

const SkillsSection: React.FC<{ skills: Record<string, Skill>; loading: boolean }> = ({ skills, loading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (loading || !canvasRef.current || !skills || typeof THREE === 'undefined') return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = canvasRef.current.parentElement!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);

    const spheres: THREE.Mesh[] = [];
    const skillNames = Object.keys(skills);
    const radius = 6;

    // Create Spheres
    skillNames.forEach((name, i) => {
      const angle = (i / skillNames.length) * Math.PI * 2;
      const y = Math.sin(i * 1.2) * 2;
      const geo = new THREE.SphereGeometry(0.5, 32, 32);
      const mat = new THREE.MeshPhongMaterial({
        color: skills[name].color,
        emissive: skills[name].color,
        emissiveIntensity: 0.4
      });
      const sphere = new THREE.Mesh(geo, mat);
      sphere.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      sphere.userData.name = name;
      scene.add(sphere);
      spheres.push(sphere);
    });

    // Create Neural Connections (Lines)
    const connections: number[][] = [];
    skillNames.forEach((nameA, i) => {
        skillNames.forEach((nameB, j) => {
            if (i < j) { 
                if (skills[nameA].cat === skills[nameB].cat) {
                    connections.push([i, j]);
                }
            }
        });
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(connections.length * 2 * 3); 
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xc77dff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    const light = new THREE.PointLight(0x9d4edd, 2);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    camera.position.z = 12;

    let isDragging = false;
    let prevX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = (e.clientX - prevX) * 0.005;
      spheres.forEach(s => {
        const pos = s.position.clone();
        s.position.x = pos.x * Math.cos(delta) - pos.z * Math.sin(delta);
        s.position.z = pos.x * Math.sin(delta) + pos.z * Math.cos(delta);
      });
      prevX = e.clientX;
    };

    const onMouseUp = () => isDragging = false;

    window.addEventListener('mousemove', onMouseMove as any);
    window.addEventListener('mouseup', onMouseUp as any);
    canvasRef.current.addEventListener('mousedown', onMouseDown as any);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if(!prefersReducedMotion) {
        spheres.forEach((s, i) => {
          s.rotation.y += 0.01;
          s.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });

        const time = Date.now() * 0.003;
        lineMaterial.opacity = 0.15 + Math.sin(time) * 0.15;
      }

      // Update Line Positions
      const positions = linesMesh.geometry.attributes.position.array as Float32Array;
      let posIndex = 0;
      connections.forEach(([i, j]) => {
          const sphereA = spheres[i];
          const sphereB = spheres[j];

          positions[posIndex++] = sphereA.position.x;
          positions[posIndex++] = sphereA.position.y;
          positions[posIndex++] = sphereA.position.z;

          positions[posIndex++] = sphereB.position.x;
          positions[posIndex++] = sphereB.position.y;
          positions[posIndex++] = sphereB.position.z;
      });
      linesMesh.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove as any);
      window.removeEventListener('mouseup', onMouseUp as any);
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) canvasRef.current.removeEventListener('mousedown', onMouseDown as any);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [loading, skills]);

  return (
    <section id="skills" className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Technical Skills - Neural Map
      </h2>
      <div className="relative w-full h-[600px] border-2 border-purple-600 rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
        {loading ? (
          <div className="text-purple-400 animate-pulse">Fetching Skills Data...</div>
        ) : (
          <canvas 
            ref={canvasRef} 
            className="w-full h-full cursor-move"
            role="img"
            aria-label="Interactive 3D visualization of technical skills. Spheres representing skills orbit a center point."
          />
        )}
      </div>
      <p className="text-center text-gray-500 mt-4">🖱️ Drag to rotate | Scroll to zoom | Visualizing Tech Stack</p>
      
      <div className="mt-8 p-6 bg-purple-900/10 border border-purple-600 rounded-xl">
        <h3 className="text-xl text-fuchsia-400 mb-4 font-semibold">Tech Stack Overview</h3>
        {loading ? (
          <div className="flex gap-2">
             <div className="h-8 w-24 bg-purple-900/30 rounded animate-pulse"></div>
             <div className="h-8 w-24 bg-purple-900/30 rounded animate-pulse"></div>
             <div className="h-8 w-24 bg-purple-900/30 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.keys(skills).map((skill) => (
              <div key={skill} className="flex items-center gap-2 p-2 bg-purple-900/20 rounded-md text-sm text-gray-300">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: `#${skills[skill].color.toString(16)}` }} 
                />
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CertificatesSection: React.FC<{ certificates: Certificate[]; loading: boolean }> = ({ certificates, loading }) => {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlippedId(flippedId === id ? null : id);
    }
  };

  return (
    <section id="certificates" className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Certifications
      </h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[1,2,3,4].map(i => <div key={i} className="h-[250px] bg-purple-900/10 border border-purple-800 rounded-xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className="relative h-[250px] cursor-pointer group perspective-1000 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl"
              onClick={() => setFlippedId(flippedId === cert.id ? null : cert.id)}
              onKeyDown={(e) => handleKeyDown(e, cert.id)}
              tabIndex={0}
              role="button"
              aria-pressed={flippedId === cert.id}
              aria-label={`Certificate: ${cert.title}. Click to ${flippedId === cert.id ? 'see front' : 'see details'}.`}
            >
              <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${flippedId === cert.id ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-900/20 to-fuchsia-900/10 border-2 border-purple-600 rounded-xl flex flex-col items-center justify-center p-6 shadow-lg shadow-purple-900/20">
                  <div className="text-5xl mb-4" aria-hidden="true">{cert.icon}</div>
                  <div className="text-xl font-bold text-fuchsia-400 text-center mb-2">{cert.title}</div>
                  <div className="text-gray-500 text-sm">{cert.issuer}</div>
                  <p className="mt-4 text-xs text-gray-600">Click or press Enter to view details</p>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-fuchsia-900/20 to-purple-900/10 border-2 border-fuchsia-400 rounded-xl flex flex-col items-center justify-center p-6 rotate-y-180 shadow-lg shadow-fuchsia-900/20">
                  <div className="text-lg font-bold text-fuchsia-400 text-center mb-4">{cert.code}</div>
                  <div className="text-gray-300 text-center text-sm leading-relaxed">{cert.description}</div>
                  <p className="mt-4 text-xs text-gray-600">Click to flip back</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </section>
  );
};

const ProjectsSection: React.FC<{ projects: Project[]; loading: boolean }> = ({ projects, loading }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = loading ? [] : (filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter));

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'devops', label: 'DevOps' },
    { id: 'ml', label: 'ML/AI' },
  ];

  return (
    <section id="projects" className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Projects & Experience
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Project Categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-5 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              filter === cat.id 
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/50' 
                : 'bg-purple-900/10 border-purple-600 text-fuchsia-400 hover:bg-purple-900/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             [1,2,3].map(i => (
                <div key={i} className="h-64 bg-purple-900/10 border border-purple-800 rounded-xl animate-pulse"></div>
             ))
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-purple-900/5 border border-purple-600 rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-transparent hover:shadow-purple-900/20" tabIndex={0}>
              <h3 className="text-xl font-bold text-fuchsia-400 mb-2">{project.title}</h3>
              <div className="text-sm text-gray-500 mb-4">{project.company}</div>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-purple-900/30 text-purple-200 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const GameSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState({ speed: '0', gear: 'N' });

  useEffect(() => {
    if (!canvasRef.current || typeof THREE === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = canvasRef.current.parentElement!;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a2e, 30, 100);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- SCENE SETUP ---
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ color: 0x2a2a3e })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const carGroup = new THREE.Group();
    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.8, 4),
      new THREE.MeshStandardMaterial({ color: 0x9d4edd, metalness: 0.8, roughness: 0.2 })
    );
    body.position.y = 0.5;
    carGroup.add(body);
    // Cabin
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.6, 2),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.9 })
    );
    cabin.position.set(0, 1.1, -0.3);
    carGroup.add(cabin);
    // Wheels
    const wheelPositions = [[-1, 0.3, 1.5], [1, 0.3, 1.5], [-1, 0.3, -1.5], [1, 0.3, -1.5]];
    const wheels: THREE.Mesh[] = [];
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
      );
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      carGroup.add(wheel);
      wheels.push(wheel);
    });
    carGroup.position.y = 0.3;
    scene.add(carGroup);

    // Buildings
    for (let i = 0; i < 40; i++) {
      const w = 3 + Math.random() * 5;
      const h = 5 + Math.random() * 20;
      const d = 3 + Math.random() * 5;
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color: 0x151520 })
      );
      let xPos = (Math.random() - 0.5) * 200;
      let zPos = (Math.random() - 0.5) * 200;
      if (Math.abs(xPos) < 10) xPos += 20;
      building.position.set(xPos, h/2, zPos);
      scene.add(building);
    }

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    
    // --- PHYSICS ---
    let velocity = 0;
    let rotation = 0;
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (prefersReducedMotion) {
          renderer.render(scene, camera);
          return;
      }

      // Simple physics loop
      const maxSpeed = 0.8;
      const accel = 0.01;
      const friction = 0.97;
      const turn = 0.04;

      if (keys['w']) velocity = Math.min(velocity + accel, maxSpeed);
      else if (keys['s']) velocity = Math.max(velocity - accel, -maxSpeed * 0.5);
      else velocity *= friction;

      if (keys[' ']) velocity *= 0.9;

      if (Math.abs(velocity) > 0.01) {
        if (keys['a']) rotation += turn * (velocity > 0 ? 1 : -1);
        if (keys['d']) rotation -= turn * (velocity > 0 ? 1 : -1);
      }

      if (keys['r']) {
        carGroup.position.set(0, 0.3, 0);
        carGroup.rotation.y = 0;
        velocity = 0;
        rotation = 0;
      }

      carGroup.rotation.y = rotation;
      carGroup.position.x += Math.sin(rotation) * velocity;
      carGroup.position.z += Math.cos(rotation) * velocity;
      wheels.forEach(w => w.rotation.x += velocity * 2);

      // Camera
      const relativeOffset = new THREE.Vector3(0, 5, -10);
      const cameraOffset = relativeOffset.applyMatrix4(carGroup.matrixWorld);
      camera.position.lerp(cameraOffset, 0.1);
      camera.lookAt(carGroup.position);

      renderer.render(scene, camera);

      const speedMph = Math.abs(velocity * 200).toFixed(0);
      let gear = 'N';
      const v = Math.abs(velocity * 200);
      if (v > 0 && v < 20) gear = '1';
      else if (v >= 20 && v < 50) gear = '2';
      else if (v >= 50 && v < 90) gear = '3';
      else if (v >= 90) gear = '4';
      else if (velocity < 0) gear = 'R';
      
      setHud({ speed: speedMph, gear });
    };
    animate();

    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="game" className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Drive the Porsche 911 GT3 RS
      </h2>
      <div className="relative w-full h-[600px] border-2 border-purple-600 rounded-xl overflow-hidden bg-neutral-950">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
            role="img"
            aria-label="3D Car Simulation. A Porsche 911 driving through an abstract city. Controls: W to accelerate, A and D to steer, Space to brake."
            tabIndex={0}
        />
      </div>
      <div className="mt-4 text-center text-gray-500" aria-hidden="true">
        <p>🎮 <strong>W/S</strong> Accelerate/Reverse | <strong>A/D</strong> Steer | <strong>Space</strong> Brake | <strong>R</strong> Reset</p>
      </div>
      <div className="flex justify-center gap-8 mt-4 text-xl font-mono" role="status" aria-live="polite">
        <div className="px-4 py-2 bg-purple-900/20 border border-purple-600 rounded-lg">
          Speed: <span className="text-fuchsia-400 font-bold">{hud.speed}</span> mph
        </div>
        <div className="px-4 py-2 bg-purple-900/20 border border-purple-600 rounded-lg">
          Gear: <span className="text-fuchsia-400 font-bold">{hud.gear}</span>
        </div>
      </div>
    </section>
  );
};

const BlogSection: React.FC<{ blogPosts: BlogPost[]; loading: boolean }> = ({ blogPosts, loading }) => {
  const [filter, setFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredPosts = loading ? [] : (filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === filter));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'dotnet', label: '.NET' },
    { id: 'devops', label: 'DevOps' },
    { id: 'ai', label: 'AI/ML' },
  ];

  const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      // Optional: scroll to top of grid when changing page
      const grid = document.getElementById('blog-grid');
      if(grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="blog" className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
        Blog
      </h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Blog Categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => handleFilterChange(cat.id)}
            className={`px-5 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              filter === cat.id 
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-900/50' 
                : 'bg-purple-900/10 border-purple-600 text-fuchsia-400 hover:bg-purple-900/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {loading ? (
             [1,2,3,4].map(i => (
                <div key={i} className="h-48 bg-purple-900/10 border border-purple-800 rounded-xl animate-pulse"></div>
             ))
        ) : (
            currentPosts.map((post) => (
            <a 
              key={post.id}
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-purple-900/5 border border-purple-600 rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-transparent hover:shadow-purple-900/20 group focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={`Read article: ${post.title}`}
            >
              <h3 className="text-xl font-bold text-fuchsia-400 mb-2 group-hover:text-fuchsia-300 transition-colors">
                {post.title} ↗
              </h3>
              <div className="text-xs text-gray-500 mb-4 uppercase tracking-wider">
                {post.date} • {post.category}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{post.excerpt}</p>
            </a>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4" role="navigation" aria-label="Blog Pagination">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="px-4 py-2 border border-purple-600 rounded-lg text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Previous Page"
              >
                  &larr; Previous
              </button>
              
              <span className="text-gray-400" aria-live="polite">
                  Page {currentPage} of {totalPages}
              </span>

              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-purple-600 rounded-lg text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
                aria-label="Next Page"
              >
                  Next &rarr;
              </button>
          </div>
      )}
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-purple-900/10 border-t border-purple-600 py-8 text-center text-gray-500">
    <p>&copy; 2024 Narindra Balkissoon | Built with React, Three.js & Passion</p>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  // Removed threeLoaded state as THREE is imported directly
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AppData>({
      skills: {},
      projects: [],
      certificates: [],
      blogPosts: []
  });

  useEffect(() => {
    // 1. Fetch CMS Data (Mock)
    mockFetchData().then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
    });
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-gray-200 font-sans selection:bg-purple-500 selection:text-white">
      {/* 3D Engine loading screen is no longer needed as THREE is bundled */}
      
      <Navigation />
      <main>
        <HeroSection />
        <SkillsSection skills={data.skills} loading={loading} />
        <ProjectsSection projects={data.projects} loading={loading} />
        <CertificatesSection certificates={data.certificates} loading={loading} />
        <GameSection />
        <BlogSection blogPosts={data.blogPosts} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}