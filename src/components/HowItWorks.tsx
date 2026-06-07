"use client";

import { useMemo, useState } from "react";

const STEPS: { n: string; title: string; copy: string }[] = [
  { n: "01", title: "Scan the back", copy: "Point any phone camera at the QR printed on the back of the tee. No app to download." },
  { n: "02", title: "Enter Saudade", copy: "The garment opens a private space tied to that exact piece — and only that piece." },
  { n: "03", title: "Leave a memory", copy: "Take a dual-camera photo, the way the moment really looked. Send it to the wearer." },
  { n: "04", title: "Sealed or shared", copy: "It lands in the wearer's private archive. With one tap, they can share it to the World Feed." }
];

function FakeQR({ size = 140, color = "var(--ink)", seed = 9 }) {
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

function PhScan() {
  return (
    <div className="px-4 pt-11 pb-4 h-full flex flex-col">
      <div className="font-mono text-center text-stone" style={{ fontSize: "8.5px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        Saudade · camera
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="relative border border-ink p-3.5">
          <FakeQR size={140} seed={9} />
          <div className="scan-line top-3.5" style={{ left: 14, right: 14, animation: "scan 3.4s ease-in-out infinite" }} />
        </div>
        <div className="text-center">
          <div className="font-mono uppercase text-brick" style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}>● scanning</div>
          <div className="font-display italic mt-1" style={{ fontSize: "17px" }}>Hold steady…</div>
        </div>
      </div>
    </div>
  );
}

function PhEnter() {
  return (
    <div className="px-5 pt-11 pb-5 h-full flex flex-col gap-3">
      <div className="font-mono uppercase text-brick" style={{ fontSize: "8.5px", letterSpacing: "0.18em" }}>✦ access granted</div>
      <div className="font-display font-semibold uppercase text-brick" style={{ fontSize: "26px", letterSpacing: "0.18em" }}>Saudade</div>
      <div className="h-px bg-[var(--line)]" />
      <div className="font-display leading-[1.05]" style={{ fontSize: "26px" }}>You found<br />someone's tee.</div>
      <div className="text-ink/75 text-[12.5px] leading-[1.6]">Leave them a photo. It stays tied to this exact garment — forever.</div>
      <div className="mt-auto py-3 bg-ink text-paper text-center font-mono uppercase" style={{ fontSize: "9.5px", letterSpacing: "0.22em" }}>
        Leave a memory
      </div>
    </div>
  );
}

function PhCapture() {
  return (
    <div className="h-full relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
      <div className="absolute top-3 left-3 w-[34%] aspect-[3/4] border-2 border-white rounded-lg overflow-hidden bg-neutral-700" />
      <div className="absolute top-12 right-3.5 font-mono uppercase text-brick" style={{ fontSize: "8px", letterSpacing: "0.18em" }}>● REC 00:14</div>
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <div className="w-[54px] h-[54px] rounded-full border-[3px] border-white flex items-center justify-center">
          <div className="w-[42px] h-[42px] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

function PhSealed() {
  return (
    <div className="px-4 pt-11 pb-4 h-full flex flex-col">
      <div className="font-mono uppercase text-stone" style={{ fontSize: "8.5px", letterSpacing: "0.2em" }}>your tee · №0142</div>
      <div className="font-display mt-1" style={{ fontSize: "19px" }}>Memory received</div>
      <div className="h-px bg-[var(--line)] my-3" />
      <div className="grid grid-cols-2 gap-1.5">
        <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-rose-300" />
        <div className="aspect-[3/4] bg-gradient-to-br from-neutral-700 to-neutral-900" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <div className="flex-1 py-2.5 bg-brick text-white text-center font-mono uppercase" style={{ fontSize: "8.5px", letterSpacing: "0.16em" }}>
          Share to world
        </div>
        <div className="flex-1 py-2.5 border border-[var(--line-2)] text-center font-mono uppercase" style={{ fontSize: "8.5px", letterSpacing: "0.16em" }}>
          Keep sealed
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [step, setStep] = useState(0);
  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-[clamp(30px,5vw,80px)] items-start">
      <div className="flex flex-col">
        {STEPS.map((s, i) => (
          <button
            key={s.n}
            className={
              "py-7 border-t border-[var(--line)] text-left transition " +
              (i === step ? "opacity-100" : "opacity-40")
            }
            onClick={() => setStep(i)}
          >
            <div className="font-mono uppercase text-brick" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>{s.n}</div>
            <h3 className="font-display font-medium mt-2 mb-2" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>{s.title}</h3>
            <p className="text-ink/75 text-[14.5px] leading-[1.6] max-w-[440px]">{s.copy}</p>
          </button>
        ))}
        <div className="border-b border-[var(--line)] mb-8" />
      </div>

      <div className="lg:sticky lg:top-32 flex justify-center">
        <div
          className="relative bg-ink p-2.5 shadow-editorial mx-auto"
          style={{
            width: "clamp(240px, 26vw, 300px)",
            aspectRatio: "9 / 19",
            borderRadius: "38px"
          }}
        >
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[34%] h-[22px] bg-black rounded-b-[14px] z-[5]" />
          <div className="w-full h-full rounded-[30px] overflow-hidden bg-paper relative">
            {step === 0 && <PhScan />}
            {step === 1 && <PhEnter />}
            {step === 2 && <PhCapture />}
            {step === 3 && <PhSealed />}
          </div>
        </div>
      </div>
    </div>
  );
}
