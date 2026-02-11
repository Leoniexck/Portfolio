export default function PageBackground({ accentColor = "#6254B6" }) {
  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
      <div 
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15 blur-[180px] rounded-full pointer-events-none z-0" 
        style={{ backgroundColor: accentColor }}
      />
    </>
  );
}