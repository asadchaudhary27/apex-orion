import React from 'react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
    </div>
  );
};

export default LoadingFallback;
