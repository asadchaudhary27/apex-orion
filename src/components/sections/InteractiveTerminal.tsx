import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Maximize2, Minus, X } from 'lucide-react';

interface TerminalOutput {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    { id: '1', type: 'output', content: 'Apex Orion OS v2.0.26 initialized.' },
    { id: '2', type: 'output', content: 'Type "help" to see available commands.' }
  ]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll internal container to bottom on new output
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const lowerCmd = trimmed.toLowerCase();
    
    // Add input to history
    setHistory(prev => [...prev, { id: Date.now().toString(), type: 'input', content: trimmed }]);
    
    if (!lowerCmd) return;

    let response = '';
    let isError = false;

    switch (lowerCmd) {
      case 'help':
        response = `Available commands:
  about      - Learn about Apex Orion
  services   - View our core capabilities
  projects   - View our latest works
  softwares  - View our SaaS products
  team       - Meet our leadership
  contact    - Get our contact details
  clear      - Clear terminal output
  sudo       - Execute command as superuser`;
        break;
      case 'about':
        response = 'Apex Orion is an elite software engineering agency based in Faisalabad, Pakistan. We specialize in high-performance web applications, custom POS systems, and premium UI/UX design. We build what others can\'t compile.';
        break;
      case 'services':
        response = `Core Capabilities:
  [1] Web Development (React, Next.js)
  [2] Mobile Apps (Flutter, React Native)
  [3] Custom POS Systems
  [4] UI/UX & Brand Design
  [5] 3D Modeling & WebGL
  [6] SaaS Solutions
  [7] Social Media Management
  [8] SEO Guest Posting`;
        break;
      case 'projects':
        response = `Recent Deployments:
  - Zarco Star (zarcostar.ae): Next.js global platform for HR solutions.
  - Tech Team Designs: Interactive 3D WebGL experience.
  - Chicken Mashwi POS: Custom Arabic food point-of-sale system in Lahore.
  - Crypto Trading Dashboard: Real-time React dashboard with WebSockets.`;
        break;
      case 'softwares':
        response = `SaaS Products:
  - Enterprise POS Manager: Offline-first retail management.
  - SocialFlow: Automated social media campaign manager.
  - SEO Analytics Pro: Custom reporting dashboard.`;
        break;
      case 'team':
        response = `Leadership:
  - Asad Qaisar: Founder & CEO. Visionary leader behind Apex Orion.
  - Elite engineering team across Pakistan.`;
        break;
      case 'contact':
        response = `Email: hello@apexorion.com
Location: Faisalabad, Pakistan
Status: Accepting new projects. Use the form below to reach out.`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
      case 'sudo su':
        response = 'Nice try. This incident will be reported to Alpha.';
        isError = true;
        break;
      case 'pwd':
        response = '/home/user/apex-orion';
        break;
      case 'whoami':
        response = 'visionary_client';
        break;
      case 'ls':
        response = 'about.txt  services.sh  contact.json  portfolio/';
        break;
      default:
        response = `Command not found: ${trimmed}. Type 'help' for available commands.`;
        isError = true;
    }

    setHistory(prev => [...prev, { 
      id: (Date.now() + 1).toString(), 
      type: isError ? 'error' : 'output', 
      content: response 
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-white tracking-tight">
          System <span className="text-[#FF5722]">Access</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
          Interact with our mainframe directly. Type <code className="text-[#FF5722] bg-white/5 px-2 py-0.5 rounded">help</code> to get started.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden bg-[#050505]/90 border border-white/10 shadow-[0_0_50px_rgba(255,87,34,0.1)] backdrop-blur-xl group transition-all duration-300 hover:border-[#FF5722]/30 hover:shadow-[0_0_50px_rgba(255,87,34,0.2)]" onClick={() => inputRef.current?.focus()}>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 cursor-pointer transition-colors" />
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>guest@apex-orion: ~</span>
          </div>
          <div className="flex space-x-3 text-gray-500">
            <Minus className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <X className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollContainerRef}
          className="p-4 sm:p-6 h-[400px] overflow-y-auto font-mono text-sm sm:text-base scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        >
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="whitespace-pre-wrap leading-relaxed">
                {item.type === 'input' && (
                  <div className="flex text-gray-300">
                    <span className="text-[#FF5722] mr-3 flex-shrink-0">guest@apex-orion:~$</span>
                    <span>{item.content}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <div className="text-gray-400 pl-4 border-l-2 border-[#FF5722]/30 my-2 py-1">{item.content}</div>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400 pl-4 border-l-2 border-red-500/50 my-2 py-1">{item.content}</div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center text-gray-300 mt-3 relative">
            <span className="text-[#FF5722] mr-3 flex-shrink-0">guest@apex-orion:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white border-none focus:ring-0 p-0"
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div className="h-4" />
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
