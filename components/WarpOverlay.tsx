import React from 'react';

interface WarpOverlayProps {
  isActive: boolean;
}

export const WarpOverlay: React.FC<WarpOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-white/90 backdrop-blur-md animate-fade-in">
       {/* Star Streaks - Dark on white */}
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200vw] h-[200vw] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,black_10deg,transparent_20deg)] animate-[spin_0.2s_linear_infinite] opacity-20"></div>
          <div className="w-[150vw] h-[150vw] rounded-full bg-[conic-gradient(from_180deg,transparent_0deg,#3b82f6_10deg,transparent_20deg)] animate-[spin_0.3s_linear_infinite_reverse] opacity-20"></div>
       </div>

       {/* Tunnel Effect - Light radial */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fff_100%)] animate-[pulse_0.2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
       
       {/* Flash */}
       <div className="absolute inset-0 bg-white animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
       
       {/* Glitch Overlay - Inverted */}
       <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'linear-gradient(rgba(200, 200, 200, 0) 50%, rgba(255, 255, 255, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
    </div>
  );
};