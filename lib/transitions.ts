/** Shared ViewTransition names: identical names on two routes morph into each other. */
export function coverTransitionName(slug: string): string {
  return `cover-${slug}`;
}

export function titleTransitionName(slug: string): string {
  return `title-${slug}`;
}
