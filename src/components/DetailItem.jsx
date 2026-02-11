export default function DetailItem({ label, value, accentColor = "#6254B6" }) {
  return (
    /* Grid layout with a fixed label width (140px) and a bottom border for all but the last item */
    <div className="grid grid-cols-[140px_1fr] gap-4 leading-relaxed border-b border-white/5 pb-4 last:border-0">
      
      {/* Label uses the dynamic accent color prop */}
      <span 
        className="font-bold"
        style={{ color: accentColor }}
      >
        {label}
      </span>

      {/* Value content rendered in a muted off-white */}
      <span className="text-[#D4D4D4]">{value}</span>
    </div>
  );
}