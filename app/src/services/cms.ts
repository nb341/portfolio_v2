const mockFetchData = (): Promise<AppData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        skills: {
          'C# (.NET 8)': { cat: 'Backend', color: 0x512bd4 },
          'Rust': { cat: 'Backend', color: 0xdea584 },
          'WebGPU': { cat: 'Frontend', color: 0x00f5ff },
          'Three.js': { cat: 'Frontend', color: 0xffffff },
          'Python': { cat: 'ML/AI', color: 0x3776ab },
          'LangGraph': { cat: 'ML/AI', color: 0xff6f00 },
          'Docker': { cat: 'DevOps', color: 0x2496ed },
          'PostgreSQL': { cat: 'Database', color: 0x336791 },
          'Vector Calculus': { cat: 'Physics', color: 0xff0055 },
          'Azure': { cat: 'DevOps', color: 0x0078d4 },
        },
        projects: [
          {
            id: 1,
            title: "GothicVoxel Engine",
            category: "hpc",
            description: "A custom physics engine simulating 'Lines of Thrust' in medieval Gothic architecture. Uses SIMD optimization in .NET 8 to calculate stress vectors for 100k+ voxel elements.",
            tags: [".NET 8", "Physics", "SIMD", "Three.js"]
          },
          {
            id: 2,
            title: "PatristicSwarm Agents",
            category: "ml",
            description: "Multi-agent AI system where agents represent historical figures (Augustine, Aquinas) and debate theological topics using RAG on primary Latin texts.",
            tags: ["Python", "LangGraph", "RAG", "LLMs"]
          },
          {
            id: 3,
            title: "LumenFidei Ray Tracer",
            category: "frontend",
            description: "Real-time volumetric ray tracer using WebGPU. Simulates light scattering through stained glass and incense smoke in a procedurally generated cathedral.",
            tags: ["WebGPU", "TypeScript", "Linear Algebra", "Graphics"]
          },
          {
            id: 4,
            title: "MonasticLedger",
            category: "fullstack",
            description: "Distributed ledger system modeling the Knights Templar banking network. Implements Raft consensus to handle simulated high-latency communication between preceptories.",
            tags: ["Go", "gRPC", "Distributed Systems", "Kubernetes"]
          }
        ],
        certificates: [
          { id: 1, title: "High Performance Computing", issuer: "University", code: "CS-500", icon: "⚡", description: "Parallel processing, SIMD, and GPU compute architectures." },
          { id: 2, title: "Deep Learning Specialization", issuer: "Coursera", code: "DL-AI", icon: "🧠", description: "Neural networks, CNNs, Sequence models, and Transformer architectures." },
          { id: 3, title: "Azure Solutions Architect", issuer: "Microsoft", code: "AZ-305", icon: "☁️", description: "Designing cloud-native, distributed infrastructure on Azure." },
          { id: 4, title: "Computational Physics", issuer: "University", code: "PHY-400", icon: "📐", description: "Numerical methods for differential equations and physical simulations." }
        ],
        blogPosts: [
          { id: 1, title: "Simulating Gothic Arches with .NET SIMD", category: "hpc", date: "Dec 2024", excerpt: "How I optimized stress calculations by 400%...", url: "https://medium.com" },
          { id: 2, title: "RAG for Latin Texts: Handling Morphology", category: "ai", date: "Nov 2024", excerpt: "Tokenization strategies for ancient languages...", url: "https://medium.com" },
          { id: 3, title: "Volumetric Lighting in WebGPU", category: "graphics", date: "Oct 2024", excerpt: "Writing compute shaders for God rays...", url: "https://dev.to" }
        ]
      });
    }, 1500);
  });
};
