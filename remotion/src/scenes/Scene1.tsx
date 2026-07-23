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

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1 },
  });

  const lineProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [45, 75], [20, 0], {
    extrapolateRight: "clamp",
  });

  const accentWidth = interpolate(frame, [70, 110], [0, 320], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center">
      {/* Architectural drawing lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <line
          x1="200"
          y1="540"
          x2="860"
          y2="540"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="660"
          strokeDashoffset={660 - lineProgress * 660}
        />
        <line
          x1="1060"
          y1="540"
          x2="1720"
          y2="540"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="660"
          strokeDashoffset={660 - lineProgress * 660}
        />
        <line
          x1="960"
          y1="200"
          x2="960"
          y2="420"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="220"
          strokeDashoffset={220 - lineProgress * 220}
        />
        <line
          x1="960"
          y1="660"
          x2="960"
          y2="880"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="220"
          strokeDashoffset={220 - lineProgress * 220}
        />
      </svg>

      {/* Logo */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `scale(${interpolate(logoScale, [0, 1], [0.85, 1])})`,
          opacity: logoScale,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          alt="ARTGRAPH"
          className="w-[480px] h-auto object-contain"
        />

        <div
          className="mt-8 text-center tracking-[0.35em] text-sm uppercase"
          style={{
            fontFamily: bodyFont,
            color: "rgba(255,255,255,0.85)",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Creative Design & Production
        </div>
      </div>

      {/* Green accent bar */}
      <div
        className="absolute bottom-[260px] h-[2px] bg-[#00d26a]"
        style={{ width: accentWidth, opacity: accentWidth > 0 ? 1 : 0 }}
      />

      {/* Corner notation */}
      <div
        className="absolute bottom-12 left-12 text-xs tracking-widest uppercase text-white/30"
        style={{ fontFamily: bodyFont }}
      >
        Cairo • Dubai • Riyadh • London
      </div>
    </AbsoluteFill>
  );
};
