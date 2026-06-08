"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FeedPhotoMetadata = {
  country?: string | null;
  region?: string | null;
  locale?: string | null;
  city?: string | null;
  publicFeedSource?: string | null;
  [key: string]: unknown;
};

type FeedPhoto = {
  id: number;
  garmentId?: number;
  imageUrl: string;
  secondaryImageUrl: string | null;
  createdAt: string;
  captureMode?: string;
  primaryLabel?: string;
  secondaryLabel?: string | null;
  metadata?: FeedPhotoMetadata | null;
};

type FeedResponse = {
  photos?: FeedPhoto[];
  updatedAt?: string;
};

const DIRECT_FEED_URL = "https://back-saudade.thehnh.tech/api/public-feed/photos?limit=24";

type SharedItem = {
  id: string;
  photoId: number;
  place: string;
  rear: string;
  front: string | null;
  num: string;
  time: string;
  createdAt: string;
};

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "just now";
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "2-digit" }).format(date);
}

function placeFromPhoto(photo: FeedPhoto): string {
  const meta = photo.metadata ?? {};
  const fromCountry = typeof meta.country === "string" ? meta.country.trim() : "";
  if (fromCountry) return fromCountry;
  const fromCity = typeof meta.city === "string" ? meta.city.trim() : "";
  if (fromCity) return fromCity;
  const fromRegion = typeof meta.region === "string" ? meta.region.trim() : "";
  if (fromRegion) return fromRegion;
  const fromLocale = typeof meta.locale === "string" ? meta.locale.trim() : "";
  if (fromLocale) {
    try {
      const region = new Intl.Locale(fromLocale).region;
      if (region) {
        const display = new Intl.DisplayNames(["en"], { type: "region" }).of(region);
        if (display) return display;
      }
    } catch {
      /* ignore unparseable locale */
    }
  }
  return "Worldwide";
}

function toSharedItem(photo: FeedPhoto): SharedItem {
  return {
    id: `R-${photo.id}`,
    photoId: photo.id,
    place: placeFromPhoto(photo),
    rear: photo.imageUrl,
    front: photo.secondaryImageUrl,
    num: `№ ${String(photo.id).padStart(4, "0")}`,
    time: formatTime(photo.createdAt),
    createdAt: photo.createdAt
  };
}

function MemoryCard({ item, index, total, isNew }: { item: SharedItem; index: number; total: number; isNew: boolean }) {
  const indexLabel = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
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
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-white/20 font-mono text-[8.5px] uppercase text-white/70" style={{ letterSpacing: "0.14em" }}>
          <span>{item.num}</span>
          <span>{item.time} · shared</span>
        </div>
      </div>
    </div>
  );
}

function EmptyMemoryCard() {
  return (
    <div className="relative w-full max-w-[440px] aspect-[3/4.1] bg-bone border border-[var(--line)] overflow-hidden flex flex-col items-center justify-center text-center px-8">
      <div className="eyebrow flex items-center gap-2">
        <span className="star">✦</span> Standing by
      </div>
      <div className="font-display italic mt-4 text-[28px] leading-[1.15] text-ink">
        The world is quiet,<br />for now.
      </div>
      <p className="mt-4 max-w-[280px] text-ink/65 text-[14px] leading-[1.65]">
        No photos have been shared with the world feed yet. Scan a sticker, capture a moment, and it lands here in real time.
      </p>
    </div>
  );
}

function RecentList({ items }: { items: SharedItem[] }) {
  if (items.length === 0) {
    return (
      <div className="border-y border-[var(--line)] py-10 text-center" style={{ height: "min(46vh, 420px)" }}>
        <div className="eyebrow flex items-center gap-2 justify-center">
          <span className="star">✦</span> Awaiting first capture
        </div>
        <p className="mt-3 max-w-[260px] mx-auto text-stone text-[13px] leading-[1.6]">
          The world feed lights up as soon as the first sticker is scanned.
        </p>
      </div>
    );
  }
  return (
    <div className="ticker-mask border-y border-[var(--line)] overflow-hidden relative" style={{ height: "min(46vh, 420px)" }}>
      <div className="flex flex-col">
        {items.slice(0, 24).map((item) => (
          <div key={item.id} className="flex items-baseline justify-between gap-3.5 py-2 border-b border-dotted border-[var(--line-2)]">
            <span className="font-display text-[18px] text-ink whitespace-nowrap" style={{ letterSpacing: "0.01em" }}>
              {item.place}
            </span>
            <span className="font-mono text-[9px] uppercase whitespace-nowrap text-brick" style={{ letterSpacing: "0.16em" }}>
              shared · {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorldFeed() {
  const [items, setItems] = useState<SharedItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [newId, setNewId] = useState<string | null>(null);
  const colRef = useRef<HTMLDivElement | null>(null);
  const knownIdsRef = useRef<Set<number>>(new Set());

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
            /* ignore */
          }
        }
        if (!mounted) return;
        const photos = body?.photos ?? [];
        const next = photos.map(toSharedItem);

        // detect newly arrived top photo for the drop-in animation
        const previousKnown = knownIdsRef.current;
        const fresh = next.find((s) => !previousKnown.has(s.photoId));
        knownIdsRef.current = new Set(next.map((s) => s.photoId));
        setItems(next);
        if (fresh && previousKnown.size > 0) {
          setNewId(fresh.id);
          window.setTimeout(() => setNewId((current) => (current === fresh.id ? null : current)), 1200);
        }
        setHydrated(true);
      } catch {
        if (mounted) setHydrated(true);
      }
    }
    void load();
    const timer = setInterval(load, 30_000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const totalCount = items.length;

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
              {totalCount > 0 ? "Scroll the stream" : "Stream standing by"}
            </div>
          </div>
        </aside>

        {/* CENTER STREAM */}
        <main
          ref={colRef}
          className="relative overflow-y-auto feed-col-snap no-scrollbar md:border-x md:border-[var(--line)] bg-gradient-to-b from-[var(--paper-2)] to-paper md:h-screen h-[calc(100svh-56px-env(safe-area-inset-bottom))]"
        >
          {hydrated && items.length === 0 ? (
            <section className="feed-snap-item md:min-h-screen min-h-[calc(100svh-56px-env(safe-area-inset-bottom))] flex items-center justify-center px-3 md:px-5 py-10 md:py-20">
              <EmptyMemoryCard />
            </section>
          ) : (
            items.map((item, i) => (
              <section
                key={item.id}
                className="feed-snap-item md:min-h-screen min-h-[calc(100svh-56px-env(safe-area-inset-bottom))] flex items-center justify-center px-3 md:px-5 py-10 md:py-20"
              >
                <MemoryCard item={item} index={i} total={items.length} isNew={item.id === newId} />
              </section>
            ))
          )}
        </main>

        {/* RIGHT RAIL */}
        <aside className="hidden md:flex md:flex-col md:justify-between sticky top-0 h-screen px-[clamp(20px,2.4vw,46px)] py-24 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="font-mono text-[9px] uppercase text-stone" style={{ letterSpacing: "0.24em" }}>
              Shared with the world
            </div>
            <div className="font-display font-medium mt-1 flex items-baseline gap-2 text-ink" style={{ fontSize: "clamp(34px, 3.4vw, 52px)", letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>
              <span className="live-dot self-center" />
              {String(totalCount).padStart(2, "0")}
            </div>
            <p className="mt-2 text-stone text-[12px] leading-[1.55] max-w-[260px]">
              Every photo the wearers chose to release into the world.
            </p>
          </div>

          <div className="pointer-events-auto w-full">
            <div className="flex justify-between font-mono text-[9px] uppercase text-stone mb-2.5" style={{ letterSpacing: "0.22em" }}>
              <span>Recent</span>
              <span>worldwide</span>
            </div>
            <RecentList items={items} />
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
