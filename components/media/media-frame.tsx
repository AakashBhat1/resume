"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MediaSet } from "@/lib/media";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  media: MediaSet;
  alt: string;
  fallback: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Scroll-linked inner scale/drift, clipped by the frame. */
  parallax?: boolean;
}

type MediaContentProps = Omit<MediaFrameProps, "className" | "parallax">;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

interface NetworkInformationLike {
  saveData?: boolean;
}

/** True when the visitor has asked the browser to save data (Data Saver / Lite mode). */
function prefersSaveData(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  return connection?.saveData === true;
}

function LoopVideo({ media, alt }: Pick<MediaContentProps, "media" | "alt">) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (reduced || prefersSaveData()) {
      video.pause();
      return;
    }

    // Only decode while on screen: keeps scrolling smooth on low-end devices.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 size-full object-cover"
      poster={media.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    >
      {media.webm ? <source src={media.webm} type="video/webm" /> : null}
      {media.mp4 ? <source src={media.mp4} type="video/mp4" /> : null}
    </video>
  );
}

function MediaContent({ media, alt, fallback, sizes, priority }: MediaContentProps) {
  if (media.mp4 || media.webm) {
    return <LoopVideo media={media} alt={alt} />;
  }

  if (media.poster) {
    return (
      <Image
        src={media.poster}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return <>{fallback}</>;
}

export function MediaFrame({ className, parallax = false, ...contentProps }: MediaFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-0" style={parallax ? { scale, y } : undefined}>
        <MediaContent {...contentProps} />
      </motion.div>
    </div>
  );
}
