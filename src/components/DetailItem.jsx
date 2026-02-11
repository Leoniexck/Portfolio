export default function DetailItem({ label, value, accentColor = "#6254B6" }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 leading-relaxed border-b border-white/5 pb-4 last:border-0">
      <span 
        className="font-bold"
        style={{ color: accentColor }}
      >
        {label}
      </span>
      <span className="text-[#D4D4D4]">{value}</span>
    </div>
  );
}