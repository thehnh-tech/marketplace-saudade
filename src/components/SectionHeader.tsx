type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
};

export function SectionHeader({ eyebrow, title, copy, dark }: SectionHeaderProps) {
  return (
    <div className={dark ? "text-paper" : "text-ink"}>
      <p className="mb-5 inline-flex items-center font-mono text-xs font-bold uppercase tracking-[0.28em] text-red">
        <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-signal shadow-signal align-middle animate-pulseGlow" />
        {eyebrow}
      </p>
      <h2 className="soft-title max-w-5xl font-display text-4xl font-semibold uppercase leading-[0.94] sm:text-6xl lg:text-7xl xl:text-8xl">
        {title}
      </h2>
      {copy ? (
        <p className={dark ? "mt-6 max-w-2xl text-base leading-8 text-paper/65" : "mt-6 max-w-2xl text-base leading-8 text-ink/65"}>{copy}</p>
      ) : null}
    </div>
  );
}
