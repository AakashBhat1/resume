import fs from "node:fs";
import path from "node:path";

/**
 * Resolves optional media assets from /public/media at build time.
 * Components fall back to generated artwork when nothing exists yet,
 * so assets can be dropped in later without code changes.
 */
export type MediaSet = {
  poster?: string;
  mp4?: string;
  webm?: string;
};

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXTENSIONS = ["avif", "webp", "jpg", "png"] as const;

function publicPathIfExists(relativePath: string): string | undefined {
  return fs.existsSync(path.join(PUBLIC_DIR, relativePath)) ? `/${relativePath}` : undefined;
}

function resolveMedia(base: string): MediaSet {
  const poster = IMAGE_EXTENSIONS.map((ext) => publicPathIfExists(`${base}.${ext}`)).find(Boolean);

  return {
    poster,
    mp4: publicPathIfExists(`${base}.mp4`),
    webm: publicPathIfExists(`${base}.webm`),
  };
}

export function getHeroMedia(): MediaSet {
  return resolveMedia("media/hero/hero");
}

export function getProjectMedia(slug: string): MediaSet {
  return resolveMedia(`media/work/${slug}`);
}
