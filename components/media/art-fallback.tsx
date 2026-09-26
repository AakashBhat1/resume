import { cn } from "@/lib/utils";

const TONES = ["primary", "marigold", "cranberry", "moss"] as const;
type Tone = (typeof TONES)[number];

const PALETTES: ReadonlyArray<readonly [Tone, Tone]> = [
  ["primary", "marigold"],
  ["cranberry", "marigold"],
  ["moss", "marigold"],
  ["primary", "cranberry"],
  ["marigold", "moss"],
  ["cranberry", "primary"],
];

export const MAPLE_PATH =
  "M0 -24 L5 -12 L14 -16 L11 -5 L22 -2 L12 4 L15 14 L4 9 L0 22 L-4 9 L-15 14 L-12 4 L-22 -2 L-11 -5 L-14 -16 L-5 -12 Z";
const OVAL_PATH = "M0 -22 C14 -10 14 10 0 22 C-14 10 -14 -10 0 -22 Z";

function hash(seed: string): number {
  let value = 5381;
  for (let index = 0; index < seed.length; index += 1) {
    value = ((value << 5) + value + seed.charCodeAt(index)) | 0;
  }
  return Math.abs(value);
}

/** Deterministic pseudo-random sequence so server and client markup match. */
function sequence(seed: string, count: number): number[] {
  let state = hash(seed) || 1;
  return Array.from({ length: count }, () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  });
}

interface ArtFallbackProps {
  seed: string;
  label?: string;
  className?: string;
}

/** Generated autumn still-life used until real media lands in /public/media. */
export function ArtFallback({ seed, label, className }: ArtFallbackProps) {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length];
  const rand = sequence(seed, 64);
  const leaves = Array.from({ length: 14 }, (_, index) => ({
    x: 10 + rand[index * 4] * 380,
    y: 10 + rand[index * 4 + 1] * 230,
    rotate: rand[index * 4 + 2] * 360,
    scale: 0.3 + rand[index * 4 + 3] * 0.45,
    shape: index % 3 === 0 ? OVAL_PATH : MAPLE_PATH,
    tone: TONES[index % TONES.length],
  }));

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden bg-surface", className)}
      style={{
        backgroundImage: `radial-gradient(110% 90% at ${Math.round(15 + rand[60] * 30)}% 10%, rgb(var(--${a}) / 0.85), transparent 62%), radial-gradient(90% 80% at ${Math.round(60 + rand[61] * 30)}% 100%, rgb(var(--${b}) / 0.8), transparent 66%)`,
      }}
    >
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {leaves.map((leaf, index) => (
          <g
            key={index}
            transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.rotate.toFixed(1)}) scale(${leaf.scale.toFixed(2)})`}
          >
            <path d={leaf.shape} fill={`rgb(var(--${leaf.tone}) / 0.4)`} />
          </g>
        ))}
      </svg>
      {label ? (
        <span className="display absolute bottom-2 right-5 select-none text-[clamp(4rem,11vw,9rem)] italic leading-none text-foreground/25">
          {label}
        </span>
      ) : null}
    </div>
  );
}
