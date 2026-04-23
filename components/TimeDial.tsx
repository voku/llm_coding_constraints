import React, { useEffect, useState, useRef } from 'react';
import { ChevronUp, ChevronDown, List, X, Crosshair, Clock } from 'lucide-react';
import { Era } from '../types';

interface TimeDialProps {
  destinationYear: string;
  presentYear: string;
  lastYear: string;
  isTraveling?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  eras?: Era[];
  onSelectEra?: (id: string) => void;
}

const CircuitRow = ({ 
  label, 
  value, 
  colorClass, 
  glowColor,
  isScrambling = false,
  onClick,
  disabled = false,
  showIcon = false,
  iconType = 'none'
}: { 
  label: string; 
  value: string; 
  colorClass: string;
  glowColor: string;
  isScrambling?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
  iconType?: 'up' | 'down' | 'none';
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isScrambling) {
      setDisplayValue(value);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const interval = setInterval(() => {
      let randomVal = "";
      for (let i = 0; i < Math.min(value.length, 8); i++) {
        randomVal += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setDisplayValue(randomVal);
    }, 50);

    return () => clearInterval(interval);
  }, [isScrambling, value]);

  const interactClass = onClick && !disabled 
    ? "cursor-pointer hover:brightness-110 active:scale-[0.99] transition-transform" 
    : "";
  
  const disabledClass = disabled ? "opacity-50 grayscale pointer-events-none" : "";

  return (
    <div className={`mb-3 last:mb-0 relative ${disabledClass}`}>
      {/* DYMO Label Style */}
      <div className="flex justify-center mb-1 relative z-10">
         <div className="bg-[#1a1a1a] px-2 py-0.5 border border-zinc-600 shadow-md transform -rotate-1 rounded-[1px]">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#e0e0e0] uppercase font-sans drop-shadow-[0_1px_0_rgba(0,0,0,1)]">
               {label}
            </span>
         </div>
      </div>
      
      {/* Display Case */}
      <button 
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        className={`w-full bg-[#111] p-1.5 rounded border-[3px] border-[#4a4a4a] shadow-[inset_0_5px_15px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-between group overflow-hidden relative ${interactClass}`}
      >
         {/* Metal screw corners */}
         <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-inner"></div>
         <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-inner"></div>
         <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-inner"></div>
         <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-inner"></div>

         {/* Navigation Icons (styled as buttons/indicators) */}
         <div className="w-6 flex justify-center">
            {showIcon && !disabled && iconType === 'up' && (
               <div className="bg-zinc-700 rounded-full p-0.5 shadow-sm border border-zinc-600 group-hover:bg-zinc-600">
                  <ChevronUp size={12} className="text-zinc-300" />
               </div>
            )}
         </div>

         {/* The LED Screen */}
         <div className="flex-1 bg-black px-2 py-2 md:py-3 mx-1 relative overflow-hidden rounded-[2px]">
            {/* Gloss Reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none h-2/3 rounded-[2px] z-20"></div>
            
            {/* LED Segments Background (Inactive segments) */}
            <div className={`absolute inset-0 flex items-center justify-center font-digital text-2xl md:text-3xl tracking-[0.15em] opacity-10 blur-[0.5px] z-0 ${colorClass}`}>
               88888888
            </div>

            {/* Active Text */}
            <div 
               className={`relative z-10 font-digital text-2xl md:text-3xl text-center tracking-[0.15em] leading-none ${colorClass}`}
               style={{ 
                  textShadow: `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`,
                  filter: 'contrast(1.2) brightness(1.1)'
               }}
            >
               {displayValue}
            </div>
            
            {/* Scanlines / Mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-30 opacity-40"></div>
         </div>

         <div className="w-6 flex justify-center">
             {showIcon && !disabled && iconType === 'down' && (
               <div className="bg-zinc-700 rounded-full p-0.5 shadow-sm border border-zinc-600 group-hover:bg-zinc-600">
                  <ChevronDown size={12} className="text-zinc-300" />
               </div>
            )}
         </div>
      </button>
    </div>
  );
};

export const TimeDial: React.FC<TimeDialProps> = ({ 
  destinationYear, 
  presentYear, 
  lastYear, 
  isTraveling = false,
  onNext,
  onPrev,
  canGoNext = false,
  canGoPrev = false,
  eras = [],
  onSelectEra
}) => {
  const [showMap, setShowMap] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMap(false);
      }
    };
    if (showMap) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMap]);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
      
      {/* Floating Action Button (Visible when minimized) */}
      <button
        onClick={() => setIsMinimized(false)}
        className={`
            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) absolute bottom-0 right-0
            w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-800 border-2 border-zinc-500 shadow-xl text-zinc-200
            flex items-center justify-center hover:bg-zinc-700 hover:scale-110 hover:text-white hover:border-zinc-300
            z-20 overflow-hidden group
            ${isMinimized ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}
        `}
        aria-label="Open Time Machine"
      >
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 mix-blend-multiply"></div>
         <Clock size={24} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Main UI Container with slide transition */}
      <div className={`
          flex flex-col items-end transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) origin-bottom-right
          ${isMinimized ? 'opacity-0 translate-y-20 scale-75 pointer-events-none' : 'opacity-100 translate-y-0 scale-90 md:scale-100 pointer-events-auto'}
      `}>
        {/* Time Map Menu (Popup) */}
        <div 
           ref={menuRef}
           className={`pointer-events-auto absolute bottom-[105%] right-0 w-64 md:w-72 bg-[#f0f0f0] border-4 border-[#d4d4d4] rounded shadow-2xl transition-all duration-300 origin-bottom-right transform ${showMap ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'} overflow-hidden flex flex-col text-slate-900 font-mono`}
           style={{ maxHeight: '60vh' }}
        >
           {/* Blue Header like a technical manual */}
           <div className="bg-[#0044aa] p-2 flex justify-between items-center shadow-md z-10 border-b-2 border-[#003388]">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse border border-red-700"></div>
                 <span className="text-[10px] font-bold text-white tracking-widest uppercase">Temporal Log</span>
              </div>
              <button 
                 onClick={() => setShowMap(false)}
                 className="text-white/70 hover:text-white transition-colors"
              >
                 <X size={14} />
              </button>
           </div>
           
           {/* Graph Paper Background for List */}
           <div className="overflow-y-auto p-2 space-y-1 bg-white custom-scrollbar relative">
               <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#0099ff 1px, transparent 1px), linear-gradient(90deg, #0099ff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              {eras.map((era) => (
                 <button
                    key={era.id}
                    onClick={() => {
                       if (onSelectEra) onSelectEra(era.id);
                       setShowMap(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 group flex items-center justify-between transition-all relative z-10"
                 >
                    <div className="flex flex-col">
                       <span className={`text-[10px] font-bold uppercase tracking-wider ${era.id === 'PRESENT' ? 'text-green-600' : 'text-slate-500'}`}>
                          {era.year}
                       </span>
                       <span className="text-xs font-bold text-slate-800 truncate max-w-[160px]">
                          {era.title}
                       </span>
                    </div>
                    <Crosshair size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                 </button>
              ))}
           </div>
        </div>

        {/* Main Casing - Brushed Aluminum/Metal Look */}
        <div className="pointer-events-auto bg-gradient-to-br from-[#999] via-[#ccc] to-[#888] p-3 md:p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] border-t border-white/50 border-b-4 border-b-[#555] border-r-4 border-r-[#555] w-64 md:w-80 relative group">
          
          {/* Metal Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-30 rounded-xl pointer-events-none mix-blend-multiply"></div>

          {/* Minimize / Close Button attached to casing */}
          <button
            onClick={() => {
                setIsMinimized(true);
                setShowMap(false);
            }}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-500 text-zinc-300 shadow-lg flex items-center justify-center hover:bg-red-900 hover:text-white hover:border-red-500 transition-all z-50 hover:scale-110 active:scale-95"
            title="Minimize Time Machine"
          >
            <X size={16} strokeWidth={3} />
          </button>

          {/* Screws */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-[1px_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-[1px_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-[1px_1px_2px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-[1px_1px_2px_rgba(0,0,0,0.5)]"></div>

          <div className="relative z-10 space-y-4 pt-2">
              <CircuitRow 
              label="DESTINATION TIME" 
              value={destinationYear} 
              colorClass="text-[#ff0000]" 
              glowColor="#ff3333" 
              onClick={onNext}
              disabled={!canGoNext || isTraveling}
              showIcon={true}
              iconType="down"
              />
              <CircuitRow 
              label="PRESENT TIME" 
              value={presentYear} 
              colorClass="text-[#00ff00]" 
              glowColor="#33ff33" 
              isScrambling={isTraveling} 
              />
              <CircuitRow 
              label="LAST TIME DEPARTED" 
              value={lastYear} 
              colorClass="text-[#ffaa00]" 
              glowColor="#ffcc33" 
              onClick={onPrev}
              disabled={!canGoPrev || isTraveling}
              showIcon={true}
              iconType="up"
              />
          </div>

          {/* Bottom Panel */}
          <div className="mt-5 flex justify-center relative z-10">
              <button 
                 onClick={() => setShowMap(!showMap)}
                 className="bg-zinc-800 hover:bg-zinc-700 text-white text-[9px] font-bold tracking-widest uppercase py-1 px-4 rounded border border-zinc-600 shadow-md flex items-center gap-2 transition-all active:translate-y-[1px]"
              >
                 <List size={10} />
                 <span>View Logs</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};