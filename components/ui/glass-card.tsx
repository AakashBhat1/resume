import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = ComponentPropsWithoutRef<"div">;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return <div className={cn("glass-panel", className)} {...props} />;
}
