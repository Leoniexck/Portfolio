export default function SectionSpacer({ accentColor = "#6254B6" }) {
  return (
    <div className="h-[200px] flex items-center justify-center opacity-20">
      <div 
        className="w-[1px] h-[60px]"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${accentColor}, transparent)` 
        }} 
      />
    </div>
  );
}