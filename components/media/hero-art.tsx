import type { CSSProperties } from "react";
import { MAPLE_PATH } from "@/components/media/art-fallback";

type Tone = "primary" | "marigold" | "cranberry" | "moss";

interface FallingLeaf {
  left: string;
  delay: string;
  duration: string;
  drift: string;
  spin: string;
  size: number;
  tone: Tone;
}

const BEAD_COUNT = 15;

const LEAVES: readonly FallingLeaf[] = [
  { left: "12%", delay: "0s", duration: "15s", drift: "60px", spin: "280deg", size: 22, tone: "primary" },
  { left: "28%", delay: "-6s", duration: "18s", drift: "-40px", spin: "-320deg", size: 16, tone: "marigold" },
  { left: "46%", delay: "-2s", duration: "13s", drift: "30px", spin: "360deg", size: 26, tone: "cranberry" },
  { left: "63%", delay: "-9s", duration: "17s", drift: "-70px", spin: "-240deg", size: 18, tone: "marigold" },
  { left: "78%", delay: "-4s", duration: "16s", drift: "50px", spin: "300deg", size: 20, tone: "primary" },
  { left: "90%", delay: "-11s", duration: "19s", drift: "-30px", spin: "-360deg", size: 14, tone: "moss" },
];

interface GarlandProps {
  top: number;
  sag: number;
  offset: number;
}

function beadTone(index: number, offset: number): Tone {
  if ((index + offset) % 3 === 0) {
    return "cranberry";
  }
  return index % 2 ? "marigold" : "primary";
}

function Garland({ top, sag, offset }: GarlandProps) {
  const beads = Array.from({ length: BEAD_COUNT }, (_, index) => {
    const t = index / (BEAD_COUNT - 1);
    return {
      x: 30 + t * 340,
      // Quadratic curve matching the string path below.
      y: top + 2 * t * (1 - t) * (sag * 2),
      tone: beadTone(index, offset),
    };
  });

  return (
    <g>
      <path d={`M30 ${top} Q200 ${top + sag * 2} 370 ${top}`} fill="none" stroke="rgb(43 30 22 / 0.35)" strokeWidth="1" />
      {beads.map((bead, index) => (
        <circle key={index} cx={bead.x.toFixed(1)} cy={bead.y.toFixed(1)} r={index % 2 ? 7 : 9} fill={`rgb(var(--${bead.tone}))`} />
      ))}
    </g>
  );
}

/** Festive hero artwork: late-afternoon glow, marigold garlands and drifting leaves. */
export function HeroArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 45% at 62% 40%, rgb(255 226 160 / 0.95), transparent 70%), linear-gradient(180deg, rgb(var(--marigold) / 0.6) 0%, rgb(var(--primary) / 0.9) 58%, rgb(var(--cranberry)) 100%)",
        }}
      />

      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMin slice" className="garland absolute inset-x-0 top-0 w-full">
        <Garland top={110} sag={40} offset={0} />
        <Garland top={96} sag={80} offset={1} />
      </svg>

      {LEAVES.map((leaf, index) => (
        <div
          key={index}
          className="leaf absolute -top-10"
          style={
            {
              left: leaf.left,
              "--leaf-delay": leaf.delay,
              "--leaf-duration": leaf.duration,
              "--leaf-drift": leaf.drift,
              "--leaf-spin": leaf.spin,
            } as CSSProperties
          }
        >
          <svg width={leaf.size * 2} height={leaf.size * 2} viewBox="-26 -26 52 52">
            <path d={MAPLE_PATH} fill={`rgb(var(--${leaf.tone}))`} opacity="0.9" />
          </svg>
        </div>
      ))}

      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/4 w-full">
        <path d="M0 70 C80 40 140 90 220 60 C300 30 340 70 400 50 L400 120 L0 120 Z" fill="rgb(var(--cranberry) / 0.6)" />
        <path d="M0 95 C90 70 170 110 260 85 C330 66 370 90 400 80 L400 120 L0 120 Z" fill="rgb(26 20 17 / 0.5)" />
      </svg>
    </div>
  );
}
