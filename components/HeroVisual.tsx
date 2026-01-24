import React from 'react';

export const HeroVisual = () => {
  return (
    <div className="w-full max-w-2xl h-64 md:h-96 relative perspective-container mx-auto mt-8 mb-12 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-200 bg-white group">
       <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Background Grid - Chaos side */}
          <rect width="400" height="400" fill="#f8fafc" />
          
          {/* Background Grid - Order side */}
          <rect x="400" width="400" height="400" fill="#1e293b" />
          <path d="M 400 0 L 400 400" stroke="#fff" strokeWidth="2" />
          
          {/* Chaos: Scribbles */}
          <g opacity="0.8">
             <path d="M 50 100 Q 150 50 200 150 T 350 100 T 100 300" stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" />
             <path d="M 80 200 Q 120 300 300 250 T 200 50" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" />
             <path d="M 300 300 Q 50 350 50 150" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" />
             <circle cx="200" cy="200" r="10" fill="#ec4899" />
             <circle cx="100" cy="100" r="15" fill="#8b5cf6" />
          </g>
          
          {/* Order: Blueprint */}
          <g stroke="#38bdf8" strokeWidth="1" opacity="0.6">
             <line x1="420" y1="50" x2="780" y2="50" />
             <line x1="420" y1="100" x2="780" y2="100" />
             <line x1="420" y1="150" x2="780" y2="150" />
             <line x1="420" y1="200" x2="780" y2="200" />
             <line x1="420" y1="250" x2="780" y2="250" />
             <line x1="420" y1="300" x2="780" y2="300" />
             <line x1="420" y1="350" x2="780" y2="350" />
             
             <line x1="450" y1="20" x2="450" y2="380" />
             <line x1="500" y1="20" x2="500" y2="380" />
             <line x1="550" y1="20" x2="550" y2="380" />
             <line x1="600" y1="20" x2="600" y2="380" />
             <line x1="650" y1="20" x2="650" y2="380" />
             <line x1="700" y1="20" x2="700" y2="380" />
             <line x1="750" y1="20" x2="750" y2="380" />
          </g>
          
          {/* The Wall in the middle */}
          <rect x="390" y="0" width="20" height="400" fill="#cbd5e1" opacity="0.5" />
          
          {/* Text Labels */}
          <text x="200" y="350" textAnchor="middle" className="font-mono text-2xl fill-slate-400 font-bold uppercase tracking-widest">Unconstrained</text>
          <text x="600" y="350" textAnchor="middle" className="font-mono text-2xl fill-slate-500 font-bold uppercase tracking-widest">Specified</text>
       </svg>
      
       {/* Overlay Effects */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 pointer-events-none"></div>
       <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)] pointer-events-none"></div>

       {/* Decorative Elements */}
       <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-white/90">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-mono uppercase tracking-widest">System Online</span>
       </div>
    </div>
  );
};
