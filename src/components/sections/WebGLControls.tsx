import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { PRESETS } from './useHulyWebGL';

interface WebGLControlsProps {
  updateUniform: (key: string, value: any) => void;
  updateColor: (key: string, hex: string) => void;
  setPresetKey: (key: keyof typeof PRESETS) => void;
  currentPreset: keyof typeof PRESETS;
}

export const WebGLControls: React.FC<WebGLControlsProps> = ({ updateUniform, setPresetKey, currentPreset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggles, setToggles] = useState({ beam: true, bleed: true, scatter: true, funnel: true });
  const [perfLow, setPerfLow] = useState(false);

  const handleToggle = (key: string, stateKey: keyof typeof toggles) => {
    const newState = !toggles[stateKey];
    setToggles(prev => ({ ...prev, [stateKey]: newState }));
    updateUniform(key, newState ? 1.0 : 0.0);
  };

  const handlePerfToggle = () => {
    const newState = !perfLow;
    setPerfLow(newState);
    updateUniform('u_perf_low', newState ? 1 : 0);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-black/[0.05] hover:bg-white/80 backdrop-blur-md rounded-full border border-black/10 text-gray-900 transition-all shadow-lg"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed top-24 right-6 bottom-6 w-80 bg-white/80 backdrop-blur-xl border border-black/10 rounded-2xl p-6 z-50 overflow-y-auto text-sm text-gray-600 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs flex items-center space-x-2">
          <Settings className="w-4 h-4 text-[#FF5722]" />
          <span>Engine Controls</span>
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Presets */}
        <div>
          <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2 block">Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map(p => (
              <button
                key={p}
                onClick={() => setPresetKey(p)}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                  currentPreset === p 
                  ? 'bg-black/[0.05] border-[#FF5722]/50/50 text-[#FF5722]' 
                  : 'bg-transparent border-black/10 hover:border-black/20 text-gray-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div>
          <label className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2 block">Effects</label>
          <div className="space-y-2">
            {[
              { label: 'Core Beam', key: 'u_toggle_beam', state: 'beam' },
              { label: 'Refraction Bleed', key: 'u_toggle_bleed', state: 'bleed' },
              { label: 'Atmos Fog', key: 'u_toggle_scatter', state: 'scatter' },
              { label: 'Top Funnel', key: 'u_toggle_funnel', state: 'funnel' },
            ].map(item => (
              <div key={item.key} className="flex justify-between items-center p-2 rounded-lg bg-black/[0.03] border border-black/5">
                <span>{item.label}</span>
                <button 
                  onClick={() => handleToggle(item.key, item.state as any)}
                  className={`w-8 h-4 rounded-full relative transition-colors ${toggles[item.state as keyof typeof toggles] ? 'bg-[#FF5722]' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${toggles[item.state as keyof typeof toggles] ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Mode */}
        <div className="pt-4 border-t border-black/10 flex justify-between items-center">
          <div>
            <div className="font-semibold text-gray-900">Eco Mode</div>
            <div className="text-[10px] text-gray-400">Improves framerate</div>
          </div>
          <button 
            onClick={handlePerfToggle}
            className={`w-8 h-4 rounded-full relative transition-colors ${perfLow ? 'bg-[#FF5722]' : 'bg-gray-700'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${perfLow ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
