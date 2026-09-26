import Link from "next/link";
import { RevealText } from "@/components/motion/reveal";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col justify-end pt-40">
      <p className="eyebrow">404</p>
      <RevealText as="h1" text="Lost in the leaves." immediate className="display mt-4 text-[clamp(3rem,10vw,8rem)] leading-[0.9]" />
      <p className="mt-6 max-w-md text-lg text-muted">This page blew away. The rest of the site is still here.</p>
      <Link href="/" className="mt-10 inline-flex h-12 w-fit items-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover">
        Back home
      </Link>
    </div>
  );
}
