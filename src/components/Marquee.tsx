type MarqueeProps = {
  items?: string[];
  dark?: boolean;
};

export function Marquee({
  items = ["SAUDADE 0024", "NIGHT ACCESS", "PICTURE ME FOR BETTER MEMORIES", "SCAN TO ENTER"],
  dark
}: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className={dark ? "relative overflow-hidden bg-ink py-3 text-paper" : "relative overflow-hidden bg-red py-3 text-paper"}>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/70 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-paper/40 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.42em]">
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="text-paper/80">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}
