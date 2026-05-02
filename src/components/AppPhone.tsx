import Image from "next/image";

type AppPhoneProps = {
  title?: string;
  mode?: "capture" | "feed";
};

const feedItems = [
  { time: "03:24", place: "Backstage", front: "/assets/bgfront.png", back: "/assets/bgback.png" },
  { time: "02:11", place: "Red Room", front: "/assets/front.png", back: "/assets/back.png" },
  { time: "01:48", place: "After Club", front: "/assets/bginner.png", back: "/assets/bgouter.png" }
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
        <p className="font-display text-lg font-semibold uppercase tracking-normal sm:text-xl">{title}</p>
        <p className="mt-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-paper/45">
          {mode === "capture" ? "BeReal capture" : "Private archive"}
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
    <div className="mt-3 flex flex-1 flex-col gap-2.5">
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-red/35 bg-paper text-red">
          <Image src="/assets/bgback.png" alt="Rear preview" fill className="object-cover" priority />
          <div className="absolute left-2 top-2 rounded-full bg-ink/85 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-paper">
            Rear
          </div>
          <div className="scan-line absolute inset-x-0 top-0 h-12 animate-scan" />
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-red/35 bg-paper text-red">
          <Image src="/assets/bgfront.png" alt="Front preview" fill className="object-cover" priority />
          <div className="absolute left-2 top-2 rounded-full bg-ink/85 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-paper">
            Front
          </div>
          <div className="scan-line absolute inset-x-0 top-0 h-12 animate-scan" />
        </div>
      </div>
      <div className="rounded-[18px] border border-paper/10 bg-paper/5 p-2.5">
        <p className="font-display text-xs font-semibold uppercase tracking-normal">Auto pair</p>
        <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-paper/55">
          One shot each side, then review together.
        </p>
      </div>
      <button
        type="button"
        className="w-full rounded-full bg-red py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper transition hover:bg-signal"
      >
        Capture pair
      </button>
    </div>
  );
}

function FeedBody() {
  return (
    <div className="mt-3 flex flex-1 flex-col gap-1.5 overflow-hidden">
      {feedItems.map((item) => (
        <div key={item.time} className="rounded-2xl border border-paper/10 bg-paper/5 p-1.5">
          <div className="flex items-center justify-between px-1 pb-1 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-paper/45">
            <span>{item.place}</span>
            <span>{item.time}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
              <Image src={item.back} alt={`${item.place} rear`} fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
              <Image src={item.front} alt={`${item.place} front`} fill className="object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
