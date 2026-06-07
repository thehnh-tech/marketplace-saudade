"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type FeedPhoto = {
  id: number;
  imageUrl: string;
  secondaryImageUrl: string | null;
  createdAt: string;
  primaryLabel?: string;
  secondaryLabel?: string | null;
};

type FeedResponse = {
  photos?: FeedPhoto[];
  updatedAt?: string;
};

const DIRECT_FEED_URL = "https://back-saudade.thehnh.tech/api/public-feed/photos?limit=24";

const COUNTRIES = [
  "Portugal", "United States", "France", "South Korea", "Japan", "Germany",
  "Nigeria", "Mexico", "Brazil", "United Kingdom", "Indonesia", "South Africa",
  "India", "Colombia", "Greece", "Canada", "Thailand", "Spain", "Italy", "Australia"
];

const REGIONS = [
  "after hours", "golden hour", "downtown", "the coast", "up north",
  "late night", "midday", "out west", "the old town", "the suburbs"
];

type SealedItem = {
  kind: "sealed";
  id: string;
  place: string;
  co: string;
  state: string;
  num: string;
  time: string;
};

type SharedItem = {
  kind: "shared";
  id: string;
  place: string;
  co: string;
  rear: string;
  front: string | null;
  cap: string;
  num: string;
  time: string;
  createdAt: string;
};

type FeedItem = SealedItem | SharedItem;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

let SEAL_SEQ = 873;
function makeSealed(): SealedItem {
  const states = ["developing…", "sealing…", "just scanned", "encrypting…"];
  const n = SEAL_SEQ++;
  return {
    kind: "sealed",
    id: `S-${n}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    place: pick(COUNTRIES),
    co: pick(REGIONS),
    state: pick(states),
    num: `№ ${String(900 + (n % 99)).padStart(4, "0")}`,
    time: "live"
  };
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "just now";
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "2-digit" }).format(date);
}

function FakeQR({ size = 42, color = "rgba(194,58,43,0.85)", seed = 7 }) {
  const cells = useMemo(() => {
    const out: number[][] = [];
    let s = seed * 1103 + 12345;
    for (let y = 0; y < 21; y++) {
      const r: number[] = [];
      for (let x = 0; x < 21; x++) {
        s = (s * 9301 + 49297) % 233280;
        r.push(s / 233280 > 0.46 ? 1 : 0);
      }
      out.push(r);
    }
    const f = (cx: number, cy: number) => {
      for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        const b = x === 0 || x === 6 || y === 0 || y === 6;
        const c = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        out[cy + y][cx + x] = b || c ? 1 : 0;
      }
    };
    f(0, 0); f(14, 0); f(0, 14);
    return out;
  }, [seed]);
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" shapeRendering="crispEdges" className="block">
      {cells.map((r, y) =>
        r.map((v, x) =>
          v ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null
        )
      )}
    </svg>
  );
}

function MemoryCard({ item, index, total, isNew }: { item: FeedItem; index: number; total: number; isNew: boolean }) {
  const indexLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  if (item.kind === "sealed") {
    return (
      <div
        className={
          "relative w-full max-w-[440px] aspect-[3/4.1] bg-black overflow-hidden shadow-editorial border border-black/50 " +
          (isNew ? "animate-drop" : "")
        }
      >
        <div className="sealed-bg" />
        <div className="sealed-grain" />
        <div
          className="scan-line"
          style={{ animation: "scan 3.4s ease-in-out infinite" }}
        />

        <div className="absolute top-4 left-4 w-[33%] aspect-[3/4] border-2 border-white/90 rounded-[9px] overflow-hidden shadow-lg z-[3]" style={{ background: "#15110d" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <FakeQR size={42} seed={index + 3} />
          </div>
          <div className="absolute bottom-1.5 left-1.5 font-mono text-[7px] uppercase text-white/90" style={{ letterSpacing: "0.14em" }}>
            front · sealed
          </div>
        </div>

        <div className="absolute top-[18px] right-4 left-[calc(33%+28px)] flex flex-col items-end gap-1.5 z-[3] text-right">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[8px] uppercase text-white/90 border border-white/30 backdrop-blur-[6px]" style={{ letterSpacing: "0.16em", background: "rgba(255,255,255,0.14)" }}>
            <span className="w-[5px] h-[5px] rounded-full bg-white live-dot" />
            Sealed
          </span>
          <span className="font-mono text-[8.5px] uppercase text-white/80" style={{ letterSpacing: "0.18em" }}>
            {indexLabel}
          </span>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 text-white/50 z-[2]">
          <div className="w-[34px] h-[34px] border border-white/40 flex items-center justify-center text-brick">✦</div>
          <div className="font-display italic text-[21px] text-white/85">{item.state}</div>
          <div className="font-mono text-[9px] uppercase text-center leading-[1.8]" style={{ letterSpacing: "0.26em" }}>
            Private to the wearer<br />{item.num}
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 p-5 z-[3] text-white">
          <div className="font-display font-medium text-[28px] leading-none">
            {item.place}
            <span className="text-white/60 text-[0.6em] italic ml-2">· {item.co}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-white/20 font-mono text-[8.5px] uppercase text-white/70" style={{ letterSpacing: "0.14em" }}>
            <span>captured · not shared</span>
            <span>private to the wearer</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "relative w-full max-w-[440px] aspect-[3/4.1] bg-black overflow-hidden shadow-editorial border border-black/50 " +
        (isNew ? "animate-drop" : "")
      }
    >
      <img src={item.rear} alt={item.place} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 scrim-bottom" />

      {item.front ? (
        <div className="absolute top-4 left-4 w-[33%] aspect-[3/4] border-2 border-white/90 rounded-[9px] overflow-hidden shadow-lg z-[3] bg-neutral-800">
          <img src={item.front} alt="front camera" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute bottom-1.5 left-1.5 font-mono text-[7px] uppercase text-white/90" style={{ letterSpacing: "0.14em" }}>
            front
          </div>
        </div>
      ) : null}

      <div className="absolute top-[18px] right-4 left-[calc(33%+28px)] flex flex-col items-end gap-1.5 z-[3] text-right">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[8px] uppercase text-white bg-brick" style={{ letterSpacing: "0.16em" }}>
          <span className="w-[5px] h-[5px] rounded-full bg-white live-dot" />
          {item.time === "just now" ? "Live · shared" : "Shared to the world"}
        </span>
        <span className="font-mono text-[8.5px] uppercase text-white/80" style={{ letterSpacing: "0.18em" }}>
          {indexLabel}
        </span>
      </div>

      <div className="absolute left-0 right-0 bottom-0 p-5 z-[3] text-white">
        <div className="font-display font-medium text-[28px] leading-none">
          {item.place}
          <span className="text-white/60 text-[0.6em] italic ml-2">· {item.co}</span>
        </div>
        <div className="mt-3 font-display italic text-[17px] leading-[1.35] text-white/95 max-w-[90%]">
          {item.cap}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-white/20 font-mono text-[8.5px] uppercase text-white/70" style={{ letterSpacing: "0.14em" }}>
          <span>{item.num}</span>
          <span>{item.time} · shared</span>
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const rows = useMemo(() => {
    const out: { c: string; t: string; shared: boolean }[] = [];
    for (let i = 0; i < COUNTRIES.length; i++) {
      const mm = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      const hh = String(Math.floor(Math.random() * 24)).padStart(2, "0");
      const shared = i % 6 === 2;
      out.push({ c: COUNTRIES[i], t: `${hh}:${mm}`, shared });
    }
    return out;
  }, []);
  const doubled = [...rows, ...rows];
  return (
    <div className="ticker-mask border-y border-[var(--line)] overflow-hidden relative" style={{ height: "min(46vh, 420px)" }}>
      <div className="flex flex-col animate-ticker">
        {doubled.map((r, i) => (
          <div key={i} className="flex items-baseline justify-between gap-3.5 py-2 border-b border-dotted border-[var(--line-2)]">
            <span className="font-display text-[18px] text-ink whitespace-nowrap" style={{ letterSpacing: "0.01em" }}>
              {r.c}
            </span>
            <span className="font-mono text-[9px] uppercase whitespace-nowrap" style={{ letterSpacing: "0.16em", color: r.shared ? "var(--brick)" : "var(--stone)" }}>
              {r.shared ? "shared" : "sealed"} · {r.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorldFeed() {
  const [counter, setCounter] = useState(14207);
  const [items, setItems] = useState<FeedItem[]>(() => {
    const arr: FeedItem[] = [];
    for (let i = 0; i < 8; i++) arr.push(makeSealed());
    return arr;
  });
  const [newId, setNewId] = useState<string | null>(null);
  const colRef = useRef<HTMLDivElement | null>(null);

  // lock body scroll on the immersive feed
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.feedPage = "true";
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.feedPage;
    };
  }, []);

  // counter
  useEffect(() => {
    const id = setInterval(() => setCounter((v) => v + 1 + Math.floor(Math.random() * 3)), 2400);
    return () => clearInterval(id);
  }, []);

  // load real shared captures from backend
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        let body: FeedResponse | null = null;
        try {
          const r = await fetch("/api/public-feed", { cache: "no-store" });
          if (r.ok) body = await r.json();
        } catch {
          body = null;
        }
        if (!body?.photos?.length) {
          try {
            const r = await fetch(DIRECT_FEED_URL, { cache: "no-store" });
            if (r.ok) body = await r.json();
          } catch {
            body = null;
          }
        }
        if (!mounted || !body?.photos?.length) return;
        const shared: SharedItem[] = body.photos.map((p, i) => ({
          kind: "shared",
          id: `R-${p.id}`,
          place: pick(COUNTRIES),
          co: pick(REGIONS),
          rear: p.imageUrl,
          front: p.secondaryImageUrl,
          cap: `“Captured live. № ${String(p.id).padStart(4, "0")}.”`,
          num: `№ ${String(p.id).padStart(4, "0")}`,
          time: formatTime(p.createdAt),
          createdAt: p.createdAt
        }));
        setItems((prev) => {
          const seals = prev.filter((x) => x.kind === "sealed");
          const merged: FeedItem[] = [];
          shared.forEach((s, i) => {
            merged.push(s);
            if (seals[i]) merged.push(seals[i]);
            if (seals[i + shared.length]) merged.push(seals[i + shared.length]);
          });
          while (merged.length < 12) merged.push(makeSealed());
          return merged.slice(0, 26);
        });
      } catch {
        /* ignore */
      }
    }
    void load();
    const timer = setInterval(load, 60_000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  // live drop-in of sealed items
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      const col = colRef.current;
      const nearTop = !col || col.scrollTop < 80;
      if (nearTop) {
        const next = makeSealed();
        setItems((arr) => [next, ...arr].slice(0, 26));
        setNewId(next.id);
      }
      tid = setTimeout(tick, 5600 + Math.random() * 3400);
    };
    tid = setTimeout(tick, 4600);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,clamp(360px,40vw,500px))_1fr] min-h-screen">
        {/* LEFT RAIL */}
        <aside className="hidden md:flex md:flex-col md:justify-center sticky top-0 h-screen px-[clamp(20px,2.4vw,46px)] py-24 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="eyebrow flex items-center gap-2">
              <span className="star">✦</span> Live · world feed
            </div>
            <h1 className="font-display font-medium mt-4" style={{ fontSize: "clamp(36px, 3.6vw, 60px)", lineHeight: "1.0", letterSpacing: "-0.02em" }}>
              Every tee<br />is <em className="italic-brick">watching</em><br />the world.
            </h1>
            <p className="mt-6 max-w-[310px] text-ink/75 text-[14.5px] leading-[1.65]">
              Somewhere right now, someone is scanning a Saudade. Most memories stay sealed — private to the wearer. A few are shared with all of us.
            </p>
            <div className="mt-7 flex items-center gap-2.5 text-stone font-mono text-[9.5px] uppercase" style={{ letterSpacing: "0.22em" }}>
              <span className="w-8 h-px bg-[var(--line-2)] relative overflow-hidden">
                <span className="absolute inset-0 w-[40%] bg-brick animate-scanLine" />
              </span>
              Scroll the stream
            </div>
          </div>
        </aside>

        {/* CENTER STREAM */}
        <main
          ref={colRef}
          className="relative overflow-y-auto feed-col-snap no-scrollbar md:border-x md:border-[var(--line)] bg-gradient-to-b from-[var(--paper-2)] to-paper md:h-screen h-[calc(100svh-56px-env(safe-area-inset-bottom))]"
        >
          {items.map((item, i) => (
            <section
              key={item.id}
              className="feed-snap-item md:min-h-screen min-h-[calc(100svh-56px-env(safe-area-inset-bottom))] flex items-center justify-center px-3 md:px-5 py-10 md:py-20"
            >
              <MemoryCard item={item} index={i} total={items.length} isNew={item.id === newId} />
            </section>
          ))}
        </main>

        {/* RIGHT RAIL */}
        <aside className="hidden md:flex md:flex-col md:justify-between sticky top-0 h-screen px-[clamp(20px,2.4vw,46px)] py-24 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="font-mono text-[9px] uppercase text-stone" style={{ letterSpacing: "0.24em" }}>
              Memories sealed today
            </div>
            <div className="font-display font-medium mt-1 flex items-baseline gap-2 text-ink" style={{ fontSize: "clamp(34px, 3.4vw, 52px)", letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>
              <span className="live-dot self-center" />
              {counter.toLocaleString()}
            </div>
          </div>

          <div className="pointer-events-auto w-full">
            <div className="flex justify-between font-mono text-[9px] uppercase text-stone mb-2.5" style={{ letterSpacing: "0.22em" }}>
              <span>Incoming</span>
              <span>worldwide</span>
            </div>
            <Ticker />
          </div>

          <div className="pointer-events-auto w-full">
            <div className="flex justify-between font-mono text-[9px] uppercase text-stone" style={{ letterSpacing: "0.22em" }}>
              <span>Picture me</span>
              <span>for better memories</span>
            </div>
            <Link
              href="/shop"
              className="btn-editorial btn-brick mt-3.5 w-full justify-center"
            >
              Get the tee <span className="arr">→</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
