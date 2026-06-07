type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, copy, dark }: SectionHeaderProps) {
  return (
    <div className={dark ? "text-paper" : "text-ink"}>
      <p className="inline-flex items-center font-mono uppercase" style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--brick)" }}>
        <span className="star mr-2">✦</span>
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 max-w-5xl font-medium leading-[1.02]" style={{ fontSize: "clamp(30px, 4.5vw, 56px)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {copy ? (
        <p className={dark ? "mt-6 max-w-2xl text-base leading-[1.65] text-paper/70 font-display italic" : "mt-6 max-w-2xl text-base leading-[1.65] text-ink/65 font-display italic"} style={{ fontSize: "clamp(17px, 1.5vw, 20px)" }}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
