import React, { useState, useEffect, useRef } from 'react';
import { TIME_MACHINE_DATA } from './constants';
import { EraVisuals } from './components/EraVisuals';
import { TimeDial } from './components/TimeDial';
import { WarpOverlay } from './components/WarpOverlay';
import { HeroVisual } from './components/HeroVisual';
import { Power, ArrowDown, Sparkles, ShieldCheck, Lock, Edit3, XCircle } from 'lucide-react';
import { EraType } from './types';

// Helper to parse content text and render triggers
const ContentParser = ({ text, onTrigger }: { text: string; onTrigger: (id: string) => void }) => {
  const parts = text.split(/(\[\[.*?\|.*?\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/\[\[(.*?)\|(.*?)\]\]/);
        if (match) {
          const [_, targetId, displayText] = match;
          return (
            <span
              key={i}
              onClick={() => onTrigger(targetId)}
              className="cursor-pointer border-b border-dashed border-amber-600/50 text-amber-700 hover:text-amber-900 hover:border-amber-600 transition-all duration-300 decoration-clone bg-amber-50 px-0.5 rounded"
              title="Reveal hidden context"
            >
              {displayText}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const DrawingCanvas = ({ enabled, onDisable }: { enabled: boolean; onDisable: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
      );
      if (context) {
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [context]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }
    
    const x = clientX + window.scrollX;
    const y = clientY + window.scrollY;
    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!enabled || !context) return;
    const { x, y } = getCoordinates(e);
    context.beginPath();
    context.moveTo(x, y);
    
    // Crayon colors
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    context.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    context.lineWidth = Math.random() * 6 + 4; // Crayon thickness
    context.globalAlpha = 0.8;
    
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    const { x, y } = getCoordinates(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if(context) context.closePath();
    setIsDrawing(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`absolute top-0 left-0 w-full h-full z-[100] transition-opacity duration-500 ${enabled ? 'opacity-100 pointer-events-auto cursor-crosshair' : 'opacity-0 pointer-events-none'}`}
        style={{ touchAction: 'none' }}
      />
      {enabled && (
        <div className="fixed top-24 right-4 z-[110] animate-bounce-in">
           <div className="bg-amber-100 border-2 border-amber-400 text-amber-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-mono text-sm font-bold">
              <Edit3 size={16} />
              <span>CRAYON MODE ACTIVE</span>
              <button onClick={onDisable} className="ml-2 hover:text-amber-950">
                 <XCircle size={16} />
              </button>
           </div>
        </div>
      )}
    </>
  );
};

const WallOverlay = ({ state }: { state: 'idle' | 'active' | 'complete' }) => {
  return (
    <div className={`fixed inset-0 z-[60] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${state === 'idle' ? 'opacity-0 delay-[1500ms]' : 'opacity-100'}`}>
        {/* Backdrop - White with blur */}
        <div className={`absolute inset-0 bg-white/90 backdrop-blur-sm transition-opacity duration-1000 ${state === 'active' ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* The Wall Boundary Lines */}
        <div className="absolute inset-4 md:inset-12">
            {/* Top Border - Draws Left to Right */}
            <div className={`absolute top-0 left-0 h-1 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-[800ms] ease-linear ${state !== 'idle' ? 'w-full' : 'w-0'}`}></div>
            
            {/* Right Border - Draws Top to Bottom */}
            <div className={`absolute top-0 right-0 w-1 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-[600ms] delay-[800ms] ease-linear ${state !== 'idle' ? 'h-full' : 'h-0'}`}></div>
            
            {/* Bottom Border - Draws Right to Left */}
            <div className={`absolute bottom-0 right-0 h-1 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-[800ms] delay-[1400ms] ease-linear ${state !== 'idle' ? 'w-full' : 'w-0'}`}></div>
            
            {/* Left Border - Draws Bottom to Top */}
            <div className={`absolute bottom-0 left-0 w-1 bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-[600ms] delay-[2200ms] ease-linear ${state !== 'idle' ? 'h-full' : 'h-0'}`}></div>

            {/* Corner Brackets */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-600 transition-opacity duration-300 ${state !== 'idle' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-600 transition-opacity duration-300 ${state !== 'idle' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-600 transition-opacity duration-300 ${state !== 'idle' ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-600 transition-opacity duration-300 ${state !== 'idle' ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>

        {/* Central HUD Content */}
        <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-500 ${state === 'active' ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
            <div className="mb-6 p-4 rounded-full border-2 border-emerald-600 bg-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse">
                <Lock className="w-16 h-16 text-emerald-600" />
            </div>
            <h2 className="text-4xl md:text-6xl font-digital text-emerald-700 tracking-widest drop-shadow-sm mb-2 uppercase text-center">
                Constructing Wall
            </h2>
            <div className="font-mono text-emerald-800 text-sm md:text-base tracking-[0.2em] animate-pulse text-center">
                {state === 'active' ? '>> DEFINING_CONSTRAINTS...' : '>> BOUNDARY_SECURED'}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 w-64 h-2 bg-emerald-100 rounded-full overflow-hidden border border-emerald-200">
                <div className={`h-full bg-emerald-600 transition-all duration-[2800ms] ease-linear ${state === 'active' ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [wallState, setWallState] = useState<'idle' | 'active' | 'complete'>('idle');
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<EraType[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visibleEras = React.useMemo(() => {
    return TIME_MACHINE_DATA.filter(era => !era.isSecret || discoveredSecrets.includes(era.id));
  }, [discoveredSecrets]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTraveling) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveEraIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleEras, isTraveling]);

  // Wall Construction Timer & Drawing Mode Trigger
  useEffect(() => {
    if (wallState === 'active') {
        const timer = setTimeout(() => {
            setWallState('complete');
        }, 3000); 
        return () => clearTimeout(timer);
    }
    if (wallState === 'complete') {
        const timer = setTimeout(() => {
            setWallState('idle');
            setIsDrawingEnabled(true);
        }, 1500); 
        return () => clearTimeout(timer);
    }
  }, [wallState]);

  const scrollToEra = (index: number) => {
    if (index >= 0 && index < visibleEras.length && sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTimeTravel = (targetId: string) => {
    if (isTraveling) return;
    const alreadyDiscovered = discoveredSecrets.includes(targetId as EraType);
    setIsTraveling(true);

    if (!alreadyDiscovered) {
      setDiscoveredSecrets(prev => [...prev, targetId as EraType]);
    }

    setTimeout(() => {
      setTimeout(() => {
        const newVisibleList = TIME_MACHINE_DATA.filter(era => !era.isSecret || [...discoveredSecrets, targetId as EraType].includes(era.id));
        const targetIndex = newVisibleList.findIndex(e => e.id === targetId);
        
        if (targetIndex !== -1 && sectionRefs.current[targetIndex]) {
            sectionRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setIsTraveling(false);
      }, 100); 
    }, 800);
  };

  const currentEra = visibleEras[activeEraIndex];
  const prevEra = visibleEras[activeEraIndex - 1];
  const nextEra = visibleEras[activeEraIndex + 1];

  const formatYear = (year: string | undefined) => year ? year.toUpperCase() : "----";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden pb-48 relative">
      
      {/* Background Grid */}
      <div className="fixed inset-0 retro-grid opacity-60 pointer-events-none z-0"></div>

      {/* Visual Effects */}
      <DrawingCanvas enabled={isDrawingEnabled} onDisable={() => setIsDrawingEnabled(false)} />
      <WarpOverlay isActive={isTraveling} />
      <WallOverlay state={wallState} />
      
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 overflow-x-auto no-scrollbar transition-all duration-300 shadow-sm">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-6 min-w-max">
            {visibleEras.map((era, index) => (
               <button
                  key={era.id}
                  onClick={() => scrollToEra(index)}
                  className={`flex items-baseline gap-2 text-xs uppercase tracking-wider transition-all duration-200 outline-none ${
                     activeEraIndex === index 
                        ? 'text-amber-600 border-b-2 border-amber-500 pb-0.5' 
                        : 'text-slate-400 hover:text-slate-900 pb-1'
                  }`}
               >
                  <span className={`font-digital text-[12px] font-bold ${activeEraIndex === index ? 'opacity-100' : 'opacity-60'}`}>{era.year}</span>
                  <span className="font-mono font-medium">{era.title}</span>
               </button>
            ))}
         </div>
      </nav>

      {/* Time Machine Interface */}
      <TimeDial 
        destinationYear={isTraveling ? "TARGET LOCKED" : formatYear(nextEra?.year)}
        presentYear={formatYear(currentEra?.year)}
        lastYear={formatYear(prevEra?.year)}
        isTraveling={isTraveling}
        onNext={() => scrollToEra(activeEraIndex + 1)}
        onPrev={() => scrollToEra(activeEraIndex - 1)}
        canGoNext={activeEraIndex < visibleEras.length - 1}
        canGoPrev={activeEraIndex > 0}
        eras={visibleEras}
        onSelectEra={handleTimeTravel}
      />

      {/* Hero / Header Section */}
      <header className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden perspective-container py-12">
         
         {/* The 3D Floor/Wall */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-[200vw] h-[100vh] wall-grid absolute bottom-[-20%] opacity-40"></div>
         </div>
         
         {/* Top Glow */}
         <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent -z-10 pointer-events-none"></div>

         <div className="max-w-5xl z-10 text-center px-4 mt-8 flex flex-col items-center">
            
            {/* Retro Badge */}
            <div className="inline-flex items-center gap-2 border border-amber-200 bg-amber-50/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-amber-800 font-mono text-xs tracking-[0.2em] mb-8 shadow-sm">
               <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
               TEMPORAL DISTORTION DETECTED
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter drop-shadow-sm font-digital uppercase leading-none">
               Crayons <span className="text-amber-500 mx-2">&</span> Walls
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
               A journey through the history of AI constraints.<br/>
               <span className="text-sm md:text-base font-mono text-slate-400 mt-2 block">We taught it to draw. We forgot to say where.</span>
            </p>

            {/* The Visual Hero Component */}
            <div className="mb-10 transform hover:scale-105 transition-transform duration-700">
               <HeroVisual />
            </div>

            {/* Central Ignition Button */}
            <div className="relative group cursor-pointer inline-flex flex-col items-center justify-center" onClick={() => scrollToEra(0)}>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:bg-amber-400/40 transition-all duration-500"></div>
               
               <button className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-slate-200 shadow-[0_10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:border-amber-500 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300">
                  <Power className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-amber-500 transition-colors" strokeWidth={2.5} />
               </button>
               
               <div className="mt-6 flex flex-col items-center space-y-2">
                  <span className="font-digital text-lg md:text-xl text-slate-800 tracking-widest uppercase group-hover:text-amber-700 transition-colors">
                     Enter Time Machine
                  </span>
                  <div className="flex items-center gap-2">
                      <span className="h-px w-8 bg-slate-300"></span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-[0.2em] uppercase">Initiate Sequence</span>
                      <span className="h-px w-8 bg-slate-300"></span>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="absolute bottom-8 animate-bounce opacity-30">
            <ArrowDown className="text-slate-900 w-6 h-6" />
         </div>
      </header>

      {/* Main Timeline Scroll */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-1/2 md:-translate-x-px">
          
          {visibleEras.map((era, index) => {
            const isActive = index === activeEraIndex;
            const isSecret = era.isSecret;

            // Styles based on state
            const activeGlow = isActive ? 'shadow-lg border-amber-200 ring-1 ring-amber-100' : 'border-slate-100 shadow-sm';
            const secretStyle = isSecret 
               ? "bg-blue-50/80 border-l-4 border-l-blue-400 rounded-r-xl my-12 backdrop-blur-sm" 
               : "";
            
            const dotColor = isSecret 
               ? 'bg-blue-500 border-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)]' 
               : isActive 
                  ? 'bg-amber-500 border-white shadow-[0_0_0_4px_rgba(245,158,11,0.2)] scale-125' 
                  : 'bg-white border-slate-300';

            return (
              <div 
                key={era.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                data-index={index}
                className={`group relative py-24 md:py-48 transition-all duration-500 ${secretStyle}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-24 md:top-48 left-[-23px] md:left-1/2 md:-ml-[7px] w-4 h-4 rounded-full border-2 transition-all duration-300 z-20 ${dotColor}`}></div>
                
                {/* Connector Line Highlight */}
                <div className={`absolute top-0 bottom-0 left-[-2px] md:left-1/2 md:-ml-[1px] w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                <div className={`flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-16 ${isSecret ? 'px-8 py-8' : ''}`}>
                   
                   {/* Text Content */}
                   <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'} pl-8 md:pl-0`}>
                      <div className={`inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-wider rounded border ${isSecret ? 'text-blue-700 border-blue-200 bg-blue-100' : 'text-amber-700 border-amber-200 bg-amber-50'}`}>
                         {era.year}
                      </div>
                      
                      <h2 className={`text-3xl md:text-5xl font-bold mb-3 ${isSecret ? 'text-blue-900' : 'text-slate-900'} font-digital uppercase tracking-tight`}>
                         {era.title}
                         {isActive && !isSecret && <span className="inline-block w-2 h-8 bg-amber-500 ml-2 animate-pulse align-middle"></span>}
                      </h2>
                      
                      <h3 className={`text-xl mb-8 font-mono ${isSecret ? 'text-blue-700' : 'text-slate-500'}`}>{era.subtitle}</h3>
                      
                      <div className={`space-y-6 leading-relaxed text-lg font-light ${isSecret ? 'text-blue-800' : 'text-slate-700'}`}>
                        {era.content.map((paragraph, i) => (
                           <p key={i} className={isActive ? 'text-slate-900' : ''}>
                             <ContentParser text={paragraph} onTrigger={handleTimeTravel} />
                           </p>
                        ))}
                      </div>
                   </div>

                   {/* Visuals */}
                   <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} pl-8 md:pl-0 flex justify-center`}>
                      <div className={`w-full max-w-md p-6 rounded-xl border bg-white backdrop-blur-sm transition-all duration-500 ${activeGlow}`}>
                         <EraVisuals era={era} isVisible={true} isActive={isActive} />
                      </div>
                   </div>
                </div>
              </div>
            );
          })}

        </div>
      </main>

      <footer className="py-24 text-center border-t border-slate-200 animate-fade-in relative z-10 bg-slate-100">
         <div className="max-w-2xl mx-auto px-6">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-digital uppercase tracking-widest">Draw The Wall</h2>
            <p className="text-slate-600 mb-10 text-lg">
               Pick one critical service today. Ask: "What must never change here?"
               If the answer is "in people's heads", your wall is imaginary.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button
                   onClick={() => {
                     if (isDrawingEnabled) {
                        setIsDrawingEnabled(false);
                     } else {
                        setWallState('active');
                     }
                   }}
                   className={`group px-8 py-4 ${isDrawingEnabled ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'} hover:scale-105 border rounded font-digital text-xl tracking-widest transition-all shadow-sm hover:shadow-md uppercase flex items-center gap-2`}
                >
                    {isDrawingEnabled ? (
                      <>
                        <Edit3 className="w-6 h-6" />
                        Done Drawing
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-6 h-6" />
                        Draw The Wall
                      </>
                    )}
                </button>
                <button 
                   onClick={() => {
                      setDiscoveredSecrets([]);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                   }}
                   className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 rounded font-mono text-sm tracking-widest transition-all uppercase"
                >
                   Reset Timeline
                </button>
            </div>
            
            <div className="mt-8 text-center">
                <a href="https://github.com/voku/llm_coding_constraints" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 text-sm font-mono border-b border-dashed border-slate-300 hover:border-slate-500 transition-colors">
                    Contribute on GitHub
                </a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;
