import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-12 max-w-3xl text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/85">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl dark:text-slate-100">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
