import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";
import { Img, staticFile } from "remotion";
import { displayFont, bodyFont } from "../fonts";

const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 14, suffix: "", label: "Years of craft" },
  { value: 12, suffix: "", label: "Countries served" },
];

const projectImages = [
  "images/proj-1.jpg",
  "images/proj-2.jpg",
  "images/proj-3.jpg",
  "images/proj-4.jpg",
  "images/proj-5.jpg",
  "images/proj-6.jpg",
];

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden">
      {/* Montage grid background */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-40">
        {projectImages.map((src, i) => {
          const delay = i * 6;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 18, stiffness: 140, mass: 1 },
          });
          const scale = interpolate(progress, [0, 1], [1.15, 1]);
          const opacity = progress;

          return (
            <div key={src} className="relative overflow-hidden" style={{ opacity }}>
              <Img
                src={staticFile(src)}
                alt={`project ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: `scale(${scale})` }}
              />
            </div>
          );
        })}
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-center mb-16"
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <div
            className="text-[#00d26a] text-sm uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: bodyFont, fontWeight: 600 }}
          >
            Track Record
          </div>
          <h2
            className="text-6xl text-[#f2f0eb]"
            style={{ fontFamily: displayFont }}
          >
            Built to be seen.
          </h2>
        </div>

        {/* Stats */}
        <div className="flex flex-row gap-24">
          {stats.map((stat, i) => {
            const delay = 20 + i * 10;
            const progress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 20, stiffness: 120, mass: 1 },
            });
            const count = Math.floor(progress * stat.value);
            const y = interpolate(progress, [0, 1], [40, 0]);
            const opacity = progress;

            return (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  transform: `translateY(${y}px)`,
                  opacity,
                }}
              >
                <div
                  className="text-7xl text-[#f2f0eb] mb-2"
                  style={{ fontFamily: displayFont }}
                >
                  {count}
                  {stat.suffix}
                </div>
                <div
                  className="text-sm uppercase tracking-widest text-white/50"
                  style={{ fontFamily: bodyFont }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
