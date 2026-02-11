export default function ProjectFooter({ copyright = "© 2026 Leonie Kehlenbeck" }) {
  return (
    /* Top border acts as a subtle separator from the page content */
    <div className="border-t border-white/5 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           
           {/* Muted copyright string in a technical monospace font */}
           <span className="text-[#444] text-xs font-mono uppercase tracking-wider">
             {copyright}
           </span>

           {/* Functional "Back to Top" trigger with smooth scrolling */}
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest font-bold"
           >
             Back to Top
           </button>
        </div>
    </div>
  );
}