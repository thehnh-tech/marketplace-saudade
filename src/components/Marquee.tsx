type MarqueeProps = {
  items?: string[];
  dark?: boolean;
};

export function Marquee({
  items = ["Saudade 0024", "Night Access", "Picture me for better memories", "Ed. 0024"],
  dark
}: MarqueeProps) {
  const content = [...items, ...items, ...items, ...items];
  return (
    <div className={dark ? "relative overflow-hidden bg-ink py-3 text-paper" : "relative overflow-hidden bg-brick py-3 text-paper"}>
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap font-mono text-[10.5px] uppercase" style={{ letterSpacing: "0.32em" }}>
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-12">
            <span>{item}</span>
            <span className="text-paper/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
