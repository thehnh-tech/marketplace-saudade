import Image from "next/image";

type AppPhoneProps = {
  title?: string;
  mode?: "capture" | "feed";
};

const feedItems = [
  { time: "03:24", place: "Backstage", tone: "from-red/70 via-red/30 to-paper/10" },
  { time: "02:11", place: "Red Room", tone: "from-red/55 via-ink/40 to-paper/10" },
  { time: "01:48", place: "After Club", tone: "from-ink/60 via-red/40 to-paper/10" }
];

export function AppPhone({ title = "Night Access", mode = "capture" }: AppPhoneProps) {
  return (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[260px] rounded-[34px] border border-paper/15 bg-[#10100f] p-2 shadow-red sm:max-w-[280px] lg:max-w-[300px] lg:rounded-[40px] lg:p-2.5">
      <span className="pointer-events-none absolute -inset-px rounded-[34px] border border-red/15 lg:rounded-[40px]" />
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-red/20 bg-night p-3 text-paper sm:rounded-[30px] sm:p-3.5 lg:rounded-[32px]">
        <span className="pointer-events-none absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/15" />
        <div className="mb-3 mt-1 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-paper/45">
          <span>SAUDADE</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-signal animate-pulseGlow" />
            0024
          </span>
        </div>
        <p className="font-display text-lg font-semibold uppercase tracking-[-0.04em] sm:text-xl">{title}</p>
        <p className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-paper/45">
          {mode === "capture" ? "Live capture" : "Private archive"}
        </p>

        {mode === "capture" ? <CaptureBody /> : <FeedBody />}

        <div className="mt-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.22em] text-paper/35">
          <span>v0.24</span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-signal animate-pulseGlow" />
            secure
          </span>
        </div>
      </div>
    </div>
  );
}

function CaptureBody() {
  return (
    <div className="mt-3 flex flex-1 flex-col">
      <div className="relative flex-1 overflow-hidden rounded-[20px] border border-red/35 bg-paper text-red">
        <div className="absolute inset-0 grid place-items-center">
          <Image src="/assets/bgfront.png" alt="Scan preview" width={190} height={250} className="w-[58%] opacity-95" priority />
        </div>
        <div className="scan-line absolute inset-x-0 top-0 h-12 animate-scan" />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-red">
          <span className="h-1 w-1 rounded-full bg-signal animate-pulseGlow" />
          Scan
        </span>
        <span className="absolute right-2 top-2 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-red/80">100%</span>
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-ink/85 px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.24em] text-paper">
          <span>QR locked</span>
          <span className="text-signal">●</span>
        </div>
      </div>
      <button
        type="button"
        className="mt-2.5 w-full rounded-full bg-red py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper transition hover:bg-signal"
      >
        Capture moment
      </button>
    </div>
  );
}

function FeedBody() {
  return (
    <div className="mt-3 flex flex-1 flex-col gap-1.5 overflow-hidden">
      {feedItems.map((item) => (
        <div
          key={item.time}
          className="flex flex-1 items-stretch gap-2 rounded-2xl border border-paper/10 bg-paper/5 p-1.5"
        >
          <div className={`aspect-square w-12 shrink-0 rounded-xl bg-gradient-to-br ${item.tone}`} />
          <div className="flex flex-1 flex-col justify-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[-0.02em]">{item.place}</p>
            <p className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-paper/55">
              {item.time} · received
            </p>
          </div>
          <span className="self-center text-signal">●</span>
        </div>
      ))}
    </div>
  );
}
