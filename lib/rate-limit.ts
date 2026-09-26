const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS = 3;
const submissions = new Map<string, { count: number; expiresAt: number }>();

// This is per-instance on serverless, which is sufficient for this portfolio.
// The deployment's trusted proxy must supply/overwrite x-forwarded-for.
export function allowContactSubmission(ip: string): boolean {
  const now = Date.now();

  // Discard expired entries so inactive visitors do not accumulate indefinitely.
  for (const [key, entry] of submissions) {
    if (entry.expiresAt <= now) submissions.delete(key);
  }

  const entry = submissions.get(ip);
  if (!entry) {
    submissions.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_SUBMISSIONS) return false;

  entry.count += 1;
  return true;
}
