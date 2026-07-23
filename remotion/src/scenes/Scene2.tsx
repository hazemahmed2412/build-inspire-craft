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

const materials = [
  { label: "Wood", img: "images/material-wood.jpg" },
  { label: "Aluminum", img: "images/service-cladding.jpg" },
  { label: "Glass", img: "images/service-glass.jpg" },
  { label: "Acrylic", img: "images/service-signage.jpg" },
];

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-row items-center overflow-hidden">
      {/* Left: material panels */}
      <div className="w-1/2 h-full flex flex-row">
        {materials.map((m, i) => {
          const delay = i * 10;
          const panelProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 22, stiffness: 180, mass: 1 },
          });
          const y = interpolate(panelProgress, [0, 1], [120, 0]);
          const opacity = panelProgress;

          return (
            <div
              key={m.label}
              className="relative flex-1 h-full overflow-hidden border-r border-white/10"
              style={{
                transform: `translateY(${y}px)`,
                opacity,
              }}
            >
              <Img
                src={staticFile(m.img)}
                alt={m.label}
                className="absolute inset-0 w-full h-full object-cover grayscale"
                style={{ opacity: 0.6 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute bottom-10 left-6 text-2xl uppercase tracking-widest text-white"
                style={{ fontFamily: displayFont }}
              >
                {m.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: typography manifesto */}
      <div className="w-1/2 h-full flex flex-col justify-center px-24 relative">
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <div
            className="text-[#00d26a] text-sm uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: bodyFont, fontWeight: 600 }}
          >
            Materials
          </div>
          <h2
            className="text-7xl leading-[1.05] text-[#f2f0eb] mb-8"
            style={{ fontFamily: displayFont }}
          >
            Selected.
            <br />
            Engineered.
            <br />
            Finished.
          </h2>
          <p
            className="text-lg text-white/60 max-w-md leading-relaxed"
            style={{ fontFamily: bodyFont }}
          >
            From raw timber to anodized aluminum, every surface is chosen for
            durability, presence, and brand impact.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
