export default function SectionSpacer({ accentColor = "#6254B6" }) {
  return (
    /* h-50 provides consistent vertical breathing room between content blocks */
    <div className="h-50 flex items-center justify-center opacity-20">
      
      {/* A single-pixel vertical line with a centered color glow */}
      <div 
        className="w-px h-15"
        style={{ 
          /* The transparent-color-transparent gradient makes the line feel "etched" into the UI */
          background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` 
        }} 
      />
    </div>
  );
}