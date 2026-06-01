"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

type PublicFeedPhoto = {
  id: number;
  imageUrl: string;
  secondaryImageUrl: string | null;
  createdAt: string;
  primaryLabel?: string;
  secondaryLabel?: string | null;
};

type PublicFeedResponse = {
  photos?: PublicFeedPhoto[];
  updatedAt?: string;
};

const fallbackPhotos: PublicFeedPhoto[] = [
  {
    id: -1,
    imageUrl: "/assets/bgback.png",
    secondaryImageUrl: "/assets/bgfront.png",
    createdAt: new Date().toISOString(),
    primaryLabel: "Rear",
    secondaryLabel: "Front"
  },
  {
    id: -2,
    imageUrl: "/assets/front.png",
    secondaryImageUrl: null,
    createdAt: new Date().toISOString(),
    primaryLabel: "Front",
    secondaryLabel: null
  }
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function PublicFeedPhone() {
  const [photos, setPhotos] = useState<PublicFeedPhoto[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadFeed() {
    try {
      const response = await fetch("/api/public-feed", { cache: "no-store" });
      if (!response.ok) throw new Error("Feed unavailable");
      const body = await response.json() as PublicFeedResponse;
      setPhotos(body.photos ?? []);
      setUpdatedAt(body.updatedAt ?? new Date().toISOString());
      setError("");
    } catch {
      setError("Live feed temporarily unavailable");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFeed();
    const timer = window.setInterval(() => void loadFeed(), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const visiblePhotos = useMemo(() => photos.length ? photos : fallbackPhotos, [photos]);
  const lastUpdated = updatedAt ? formatDate(updatedAt) : "Waiting";

  return (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[292px] rounded-[38px] border border-paper/15 bg-[#10100f] p-2 shadow-red sm:max-w-[330px] lg:max-w-[360px] lg:rounded-[44px] lg:p-2.5">
      <span className="pointer-events-none absolute -inset-px rounded-[38px] border border-red/15 lg:rounded-[44px]" />
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] border border-red/20 bg-night p-3 text-paper sm:p-4">
        <span className="pointer-events-none absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/15" />
        <div className="mb-3 mt-1 flex items-center justify-between text-[9px] uppercase text-paper/45">
          <span>SAUDADE</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-signal animate-pulseGlow" />
            Live
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold uppercase leading-none tracking-normal sm:text-xl">World Feed</p>
            <p className="mt-1 font-mono text-[8px] font-bold uppercase text-paper/45">Sticker scans</p>
          </div>
          <button
            type="button"
            onClick={() => void loadFeed()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-paper/10 bg-paper/5 text-paper/70 transition hover:border-red/55 hover:text-paper"
            aria-label="Refresh public feed"
            title="Refresh public feed"
          >
            <RefreshCw size={14} aria-hidden="true" className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-full border border-paper/10 bg-paper/5 px-3 py-2 font-mono text-[8px] font-bold uppercase text-paper/45">
          <span>{photos.length ? `${photos.length} captures` : "Preview mode"}</span>
          <span>{lastUpdated}</span>
        </div>

        {error ? <p className="mt-2 rounded-2xl border border-red/30 bg-red/10 px-3 py-2 text-[10px] font-bold text-red">{error}</p> : null}

        <div className="no-scrollbar mt-3 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {visiblePhotos.map((photo) => (
            <article key={photo.id} className="rounded-[22px] border border-paper/10 bg-paper/5 p-2.5">
              <div className="mb-2 flex items-center justify-between px-1 font-mono text-[8px] font-bold uppercase text-paper/45">
                <span>{photo.id > 0 ? `Capture #${photo.id}` : "Waiting for scans"}</span>
                <span>{formatDate(photo.createdAt)}</span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[19px] border border-paper/10 bg-night">
                <img src={photo.imageUrl} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-ink/75 px-2 py-1 font-mono text-[8px] font-bold uppercase text-paper">
                  {photo.primaryLabel ?? "Rear"}
                </span>
                {photo.secondaryImageUrl ? (
                  <div className="absolute right-2 top-2 h-[42%] w-[36%] overflow-hidden rounded-[15px] border-2 border-paper bg-night shadow-red">
                    <img src={photo.secondaryImageUrl} alt="" className="h-full w-full object-cover" />
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-ink/75 px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase text-paper">
                      {photo.secondaryLabel ?? "Front"}
                    </span>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between font-mono text-[8px] uppercase text-paper/35">
          <span>public feed</span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-signal animate-pulseGlow" />
            every minute
          </span>
        </div>
      </div>
    </div>
  );
}
