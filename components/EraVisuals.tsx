import React, { useEffect, useRef } from 'react';
import { Era, EraType } from '../types';

// Declaration for global Prism object loaded via CDN
declare const Prism: any;

interface EraVisualsProps {
  era: Era;
  isVisible: boolean;
  isActive?: boolean;
}

// --- SVG Visual Components ---

const IntroVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-6" fill="none" stroke="currentColor">
    {/* Wall Boundary */}
    <rect x="40" y="40" width="120" height="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" className="text-slate-400" />
    <text x="50" y="30" fontSize="10" className="text-slate-400 font-mono fill-slate-400 stroke-none">BOUNDARY_DEF</text>
    
    {/* Crayons Scribbling outside */}
    <path d="M 60 80 Q 80 20 100 80 T 140 80 T 180 60" stroke="#f59e0b" strokeWidth="4" className="text-amber-500" fill="none" />
    <path d="M 50 100 Q 30 140 80 140 T 130 160 T 190 130" stroke="#ef4444" strokeWidth="4" className="text-red-500" fill="none" />
    <path d="M 70 120 C 20 120 20 180 80 180" stroke="#3b82f6" strokeWidth="4" className="text-blue-500" fill="none" />
  </svg>
);

const RealizationVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-8" fill="none">
    {/* Data Stack / Servers */}
    <rect x="40" y="140" width="20" height="40" fill="#cbd5e1" />
    <rect x="70" y="100" width="20" height="80" fill="#94a3b8" />
    <rect x="100" y="60" width="20" height="120" fill="#64748b" />
    <rect x="130" y="20" width="20" height="160" fill="#475569" />
    <rect x="160" y="100" width="20" height="80" fill="#cbd5e1" />
    
    {/* Tiny human for scale */}
    <circle cx="20" cy="170" r="3" fill="#f59e0b" />
    <rect x="18.5" y="173" width="3" height="5" fill="#f59e0b" />
  </svg>
);

const MarkovVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
      </marker>
    </defs>
    <circle cx="40" cy="100" r="20" stroke="#64748b" strokeWidth="2" fill="white" />
    <text x="40" y="105" textAnchor="middle" fontSize="12" className="font-mono fill-slate-700">A</text>
    
    <circle cx="100" cy="50" r="20" stroke="#64748b" strokeWidth="2" fill="white" />
    <text x="100" y="55" textAnchor="middle" fontSize="12" className="font-mono fill-slate-700">B</text>
    
    <circle cx="160" cy="100" r="20" stroke="#64748b" strokeWidth="2" fill="white" />
    <text x="160" y="105" textAnchor="middle" fontSize="12" className="font-mono fill-slate-700">C</text>
    
    <path d="M 55 85 L 85 60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    <path d="M 115 60 L 145 85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    <path d="M 140 100 L 60 100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrow)" fill="none" />
  </svg>
);

const ShannonVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Dice */}
    <rect x="60" y="80" width="40" height="40" rx="4" stroke="#0f172a" strokeWidth="2" fill="white" />
    <circle cx="70" cy="90" r="2" fill="#0f172a" />
    <circle cx="90" cy="110" r="2" fill="#0f172a" />
    <circle cx="80" cy="100" r="2" fill="#0f172a" />
    
    <rect x="100" y="60" width="40" height="40" rx="4" stroke="#0f172a" strokeWidth="2" fill="white" transform="rotate(15 120 80)" />
    <circle cx="110" cy="70" r="2" fill="#0f172a" transform="rotate(15 120 80)" />
    <circle cx="130" cy="90" r="2" fill="#0f172a" transform="rotate(15 120 80)" />
    
    {/* Binary Stream */}
    <text x="100" y="160" textAnchor="middle" fontSize="14" className="font-mono fill-green-600">01001101</text>
    
    <text x="100" y="40" textAnchor="middle" fontSize="10" className="font-mono fill-slate-500">ENTROPY = HIGH</text>
  </svg>
);

const PerceptronVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    <defs>
       <marker id="arrow-solid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#0f172a" />
      </marker>
    </defs>
    {/* Inputs */}
    <circle cx="30" cy="60" r="10" fill="#e2e8f0" />
    <circle cx="30" cy="100" r="10" fill="#e2e8f0" />
    <circle cx="30" cy="140" r="10" fill="#e2e8f0" />
    
    {/* Neuron */}
    <circle cx="100" cy="100" r="30" stroke="#0f172a" strokeWidth="3" fill="white" />
    <text x="100" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" className="fill-slate-900">∑</text>
    
    {/* Lines */}
    <line x1="40" y1="60" x2="70" y2="100" stroke="#94a3b8" strokeWidth="2" />
    <line x1="40" y1="100" x2="70" y2="100" stroke="#94a3b8" strokeWidth="2" />
    <line x1="40" y1="140" x2="70" y2="100" stroke="#94a3b8" strokeWidth="2" />
    
    {/* Output */}
    <line x1="130" y1="100" x2="170" y2="100" stroke="#0f172a" strokeWidth="3" markerEnd="url(#arrow-solid)" />
    <rect x="170" y="90" width="20" height="20" rx="4" fill="#f59e0b" />
  </svg>
);

const WinterVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Chip */}
    <rect x="60" y="60" width="80" height="80" rx="8" fill="#1e293b" />
    <path d="M 70 70 L 90 70 L 90 90" stroke="#475569" strokeWidth="2" fill="none" />
    <path d="M 130 130 L 110 130 L 110 110" stroke="#475569" strokeWidth="2" fill="none" />
    
    {/* Snowflake Overlay */}
    <g stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round">
      <line x1="100" y1="30" x2="100" y2="170" />
      <line x1="30" y1="100" x2="170" y2="100" />
      <line x1="50" y1="50" x2="150" y2="150" />
      <line x1="50" y1="150" x2="150" y2="50" />
    </g>
    <circle cx="100" cy="100" r="10" fill="#3b82f6" fillOpacity="0.2" />
  </svg>
);

const BackpropVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Landscape */}
    <path d="M 20 150 Q 60 40 100 100 T 180 120" stroke="url(#grad1)" strokeWidth="3" fill="none" />
    
    {/* Ball rolling down */}
    <circle cx="80" cy="80" r="6" fill="#f59e0b" />
    
    {/* Gradient Arrows */}
    <path d="M 70 85 L 50 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
    
    <text x="140" y="50" fontSize="10" className="font-mono fill-slate-500">dE/dw</text>
    <text x="100" y="180" textAnchor="middle" fontSize="12" className="font-bold fill-slate-700">OPTIMIZATION</text>
  </svg>
);

const LSTMVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Cells */}
    <rect x="40" y="80" width="40" height="40" rx="4" stroke="#64748b" strokeWidth="2" fill="white" />
    <rect x="120" y="80" width="40" height="40" rx="4" stroke="#64748b" strokeWidth="2" fill="white" />
    
    {/* Feedback Loop */}
    <path d="M 140 80 L 140 60 L 60 60 L 60 80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" fill="none" markerEnd="url(#arrow)" />
    
    {/* Connection */}
    <line x1="80" y1="100" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="100" y="95" textAnchor="middle" fontSize="10" className="font-mono fill-slate-500">MEM</text>
  </svg>
);

const AttentionVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Source sentence */}
    <rect x="30" y="40" width="20" height="20" fill="#e2e8f0" />
    <rect x="60" y="40" width="20" height="20" fill="#e2e8f0" />
    <rect x="90" y="40" width="20" height="20" fill="#e2e8f0" />
    
    {/* Target sentence */}
    <rect x="30" y="140" width="20" height="20" fill="#cbd5e1" />
    <rect x="60" y="140" width="20" height="20" fill="#cbd5e1" />
    <rect x="90" y="140" width="20" height="20" fill="#cbd5e1" />
    
    {/* Attention Lines */}
    <line x1="40" y1="60" x2="100" y2="140" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
    <line x1="70" y1="60" x2="70" y2="140" stroke="#f59e0b" strokeWidth="4" opacity="0.4" />
    <line x1="100" y1="60" x2="40" y2="140" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
    
    <text x="140" y="100" fontSize="10" className="font-mono fill-amber-600 rotate-90 origin-center">ALIGNMENT</text>
  </svg>
);

const TransformerVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-8">
    <defs>
      <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    {/* Attention Matrix Frame */}
    <rect x="40" y="40" width="120" height="120" stroke="#94a3b8" strokeWidth="1" fill="none" />
    
    {/* Grid Cells with varying opacity */}
    <rect x="40" y="40" width="40" height="40" fill="url(#gridGrad)" opacity="0.9" />
    <rect x="80" y="40" width="40" height="40" fill="url(#gridGrad)" opacity="0.3" />
    <rect x="120" y="40" width="40" height="40" fill="url(#gridGrad)" opacity="0.1" />
    
    <rect x="40" y="80" width="40" height="40" fill="url(#gridGrad)" opacity="0.2" />
    <rect x="80" y="80" width="40" height="40" fill="url(#gridGrad)" opacity="0.8" />
    <rect x="120" y="80" width="40" height="40" fill="url(#gridGrad)" opacity="0.4" />
    
    <rect x="40" y="120" width="40" height="40" fill="url(#gridGrad)" opacity="0.1" />
    <rect x="80" y="120" width="40" height="40" fill="url(#gridGrad)" opacity="0.5" />
    <rect x="120" y="120" width="40" height="40" fill="url(#gridGrad)" opacity="0.9" />
    
    <text x="100" y="185" textAnchor="middle" fontSize="10" className="font-mono fill-slate-500">ATTENTION_MATRIX</text>
  </svg>
);

const GeneralizationVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Data Points */}
    <circle cx="40" cy="140" r="3" fill="#64748b" />
    <circle cx="80" cy="80" r="3" fill="#64748b" />
    <circle cx="120" cy="100" r="3" fill="#64748b" />
    <circle cx="160" cy="60" r="3" fill="#64748b" />
    
    {/* The overgeneralized curve */}
    <path d="M 20 160 Q 90 20 180 40" stroke="#f59e0b" strokeWidth="3" fill="none" />
    <text x="100" y="180" textAnchor="middle" fontSize="10" className="font-mono fill-amber-600">OVER_SMOOTHING</text>
  </svg>
);

const HallucinationVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Distorted Rect */}
    <path d="M 40 40 L 160 30 L 170 150 L 50 160 Z" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="5,5" />
    
    {/* Glitch effects */}
    <rect x="30" y="60" width="140" height="10" fill="#ef4444" opacity="0.2" />
    <rect x="40" y="100" width="120" height="5" fill="#3b82f6" opacity="0.2" />
    <rect x="35" y="130" width="130" height="15" fill="#f59e0b" opacity="0.2" />
    
    <text x="100" y="100" textAnchor="middle" fontSize="14" className="font-digital fill-red-500 tracking-widest">ERROR_REALITY</text>
  </svg>
);

const GitVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Main Branch */}
    <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="3" />
    <circle cx="40" cy="40" r="6" fill="#64748b" />
    <circle cx="40" cy="100" r="6" fill="#64748b" />
    <circle cx="40" cy="160" r="6" fill="#64748b" />
    
    {/* Feature Branch */}
    <path d="M 40 100 C 80 100 80 70 80 70 L 80 70" stroke="#f59e0b" strokeWidth="3" fill="none" />
    <line x1="80" y1="70" x2="80" y2="130" stroke="#f59e0b" strokeWidth="3" />
    <circle cx="80" cy="70" r="6" fill="#f59e0b" />
    <circle cx="80" cy="130" r="6" fill="#f59e0b" />
    
    {/* Merge back */}
    <path d="M 80 130 C 80 160 40 160 40 160" stroke="#f59e0b" strokeWidth="3" fill="none" />
    
    <text x="120" y="100" fontSize="10" className="font-mono fill-slate-500">git blame</text>
  </svg>
);

const BadApproachVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Monitor */}
    <rect x="20" y="40" width="160" height="100" rx="4" stroke="#334155" strokeWidth="2" fill="white" />
    <rect x="80" y="140" width="40" height="10" fill="#334155" />
    <rect x="60" y="150" width="80" height="5" fill="#334155" />
    
    {/* Sticky Notes */}
    <rect x="30" y="50" width="30" height="30" fill="#fef08a" transform="rotate(-5 45 65)" stroke="#eab308" />
    <rect x="130" y="60" width="30" height="30" fill="#fef08a" transform="rotate(10 145 75)" stroke="#eab308" />
    <rect x="90" y="90" width="30" height="30" fill="#fef08a" transform="rotate(-2 105 105)" stroke="#eab308" />
    <rect x="50" y="100" width="30" height="30" fill="#fef08a" transform="rotate(15 65 115)" stroke="#eab308" />
    
    <text x="100" y="180" textAnchor="middle" fontSize="10" className="font-mono fill-slate-500">POST-IT_RULES.txt</text>
  </svg>
);

const SolutionVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Contract Document */}
    <rect x="50" y="30" width="100" height="140" fill="white" stroke="#94a3b8" strokeWidth="1" />
    
    {/* Lines of text */}
    <line x1="60" y1="50" x2="140" y2="50" stroke="#cbd5e1" strokeWidth="2" />
    <line x1="60" y1="65" x2="140" y2="65" stroke="#cbd5e1" strokeWidth="2" />
    <line x1="60" y1="80" x2="140" y2="80" stroke="#cbd5e1" strokeWidth="2" />
    <line x1="60" y1="95" x2="120" y2="95" stroke="#cbd5e1" strokeWidth="2" />
    
    {/* Wax Seal */}
    <circle cx="120" cy="140" r="15" fill="#ef4444" />
    <circle cx="120" cy="140" r="12" stroke="#b91c1c" strokeWidth="1" fill="none" />
    <path d="M 115 140 L 125 140 M 120 135 L 120 145" stroke="white" strokeWidth="2" fill="none" />
    
    <text x="100" y="190" textAnchor="middle" fontSize="12" className="font-bold fill-slate-700">CONTRACT</text>
  </svg>
);

const ActionVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* Paper Background */}
    <rect x="25" y="25" width="150" height="150" fill="white" stroke="#e2e8f0" strokeWidth="2" rx="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
    
    {/* Abstract Content (Gray Lines) */}
    <line x1="45" y1="55" x2="125" y2="55" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="75" x2="145" y2="75" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
    <line x1="45" y1="95" x2="105" y2="95" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
    
    {/* The Constraint Wall (Thick Red Line) */}
    <path d="M 45 130 L 135 130" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
    
    {/* Label underneath */}
    <text x="90" y="155" textAnchor="middle" fontSize="10" className="font-mono font-bold fill-red-500 tracking-widest uppercase">HARD CONSTRAINT</text>
    
    {/* Pencil Tool */}
    <g transform="translate(135, 130) rotate(-30)">
       {/* Pencil Tip */}
       <path d="M 0 0 L 6 15 L -6 15 Z" fill="#334155" /> 
       {/* Pencil Wood exposed */}
       <path d="M -6 15 L 6 15 L 6 20 L -6 20 Z" fill="#fcd34d" />
       {/* Pencil Body */}
       <rect x="-6" y="20" width="12" height="50" fill="#f59e0b" />
       {/* Metal Band */}
       <rect x="-6" y="70" width="12" height="8" fill="#94a3b8" />
       {/* Eraser */}
       <path d="M -6 78 L 6 78 C 6 82 -6 82 -6 78" fill="#f472b6" />
    </g>
    
    {/* Hand Hint (optional circle/pulse at drawing point) */}
    <circle cx="135" cy="130" r="15" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.5" fill="none" className="animate-ping" />
  </svg>
);

const HappyPathVisual = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full p-4">
    {/* The Hidden Mess (Bottom) */}
    <g transform="translate(0, 110)">
      <rect width="200" height="90" fill="none" />
      {/* Roots/Scars */}
      <path d="M 40 0 Q 60 40 40 80" stroke="#ef4444" strokeWidth="2" opacity="0.2" fill="none" />
      <path d="M 160 0 Q 140 50 160 90" stroke="#ef4444" strokeWidth="2" opacity="0.2" fill="none" />
      <path d="M 100 0 L 100 30 M 80 40 L 120 40" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
      <text x="100" y="70" textAnchor="middle" fontSize="10" className="font-mono fill-red-900 opacity-40">GIT_REVERT_LOGS</text>
      <text x="50" y="30" fontSize="8" className="font-mono fill-red-800 opacity-30">HOTFIX</text>
      <text x="140" y="50" fontSize="8" className="font-mono fill-red-800 opacity-30">DEAD_END</text>
    </g>

    {/* The Surface (Divider) */}
    <line x1="20" y1="100" x2="180" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />

    {/* The Happy Path (Top) */}
    <g transform="translate(0, 0)">
       {/* Clean Path */}
       <path d="M 40 80 Q 100 20 160 80" stroke="#10b981" strokeWidth="4" fill="none" />
       
       {/* The "Model" looking at it */}
       <circle cx="100" cy="50" r="15" fill="#fff" stroke="#10b981" strokeWidth="2" />
       <circle cx="100" cy="50" r="5" fill="#10b981" />
       
       {/* Blinders */}
       <path d="M 85 50 L 60 70" stroke="#cbd5e1" strokeWidth="2" />
       <path d="M 115 50 L 140 70" stroke="#cbd5e1" strokeWidth="2" />
       
       <text x="100" y="20" textAnchor="middle" fontSize="10" className="font-mono fill-emerald-700">OPTIMIZED_OUTCOME</text>
    </g>
  </svg>
);

const ERA_VISUAL_COMPONENTS: Record<EraType, React.FC> = {
  [EraType.INTRO]: IntroVisual,
  [EraType.IMPORTANT_REALIZATION]: RealizationVisual,
  [EraType.MARKOV]: MarkovVisual,
  [EraType.SHANNON]: ShannonVisual,
  [EraType.PERCEPTRON]: PerceptronVisual,
  [EraType.AI_WINTER]: WinterVisual,
  [EraType.BACKPROP]: BackpropVisual,
  [EraType.LSTM]: LSTMVisual,
  [EraType.ATTENTION]: AttentionVisual,
  [EraType.TRANSFORMER]: TransformerVisual,
  [EraType.GENERALIZATION]: GeneralizationVisual,
  [EraType.HALLUCINATION]: HallucinationVisual,
  [EraType.GIT_HISTORY]: GitVisual,
  [EraType.BAD_APPROACH]: BadApproachVisual,
  [EraType.SOLUTION]: SolutionVisual,
  [EraType.MISSING_CONTEXT]: HappyPathVisual,
  [EraType.ACTION]: ActionVisual,
};


const CodeBlock = ({ code, lang = 'text' }: { code: string; lang?: string }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof Prism !== 'undefined') {
      // Re-highlight when code or language changes
      Prism.highlightElement(codeRef.current);
    }
  }, [code, lang]);

  return (
    <div className="w-full rounded-lg bg-[#2d2d2d] border border-slate-700 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto shadow-md relative group">
      <div className="absolute top-2 right-2 text-slate-500 text-[10px] uppercase tracking-wider select-none">{lang}</div>
      <pre className="!m-0 !p-0 !bg-transparent !text-sm scrollbar-thin scrollbar-thumb-slate-700">
        <code ref={codeRef} className={`language-${lang} !bg-transparent !shadow-none`}>
          {code}
        </code>
      </pre>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg"></div>
    </div>
  );
};

export const EraVisuals: React.FC<EraVisualsProps> = ({ era, isVisible, isActive }) => {
  const VisualComponent = ERA_VISUAL_COMPONENTS[era.id];

  return (
    <div className="relative w-full h-full flex flex-col gap-4">
      <div className="relative w-full flex-1 min-h-[250px] flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-inner group">
          
          {/* SVG Visual */}
          {VisualComponent && (
             <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative p-4">
                <div className={`w-full h-full transition-all duration-1000 ${isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-80'}`}>
                    <VisualComponent />
                </div>
                
                {/* Overlay Gradient for better text contrast if we had text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none"></div>

                {/* Technical Overlay Graphics (Optional Decoration) */}
                <div className="absolute inset-0 border-[0.5px] border-black/5 m-4 rounded pointer-events-none"></div>
                <div className="absolute top-6 right-6 flex gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                   <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                   <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                </div>
             </div>
          )}
      </div>

      {/* Code Snippet Display - Always visible if present */}
      {era.codeSnippet && (
         <div className="w-full relative z-10 animate-fade-in">
            <div className="absolute -top-2.5 left-4 bg-[#2d2d2d] text-[10px] text-slate-300 px-2 py-0.5 rounded shadow-sm font-mono border border-slate-600 uppercase tracking-wider z-20">
               {era.codeLanguage || 'Code'} Artifact
            </div>
            <CodeBlock code={era.codeSnippet} lang={era.codeLanguage} />
         </div>
      )}
    </div>
  );
};
