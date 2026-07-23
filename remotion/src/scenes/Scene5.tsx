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

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 100, mass: 1 },
  });

  const ctaY = interpolate(ctaProgress, [0, 1], [50, 0]);
  const ctaOpacity = ctaProgress;

  const lineProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoProgress = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 20, stiffness: 150, mass: 1 },
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center px-20">
      {/* Massive headline */}
      <div
        className="text-center relative z-10"
        style={{
          transform: `translateY(${ctaY}px)`,
          opacity: ctaOpacity,
        }}
      >
        <h2
          className="text-8xl text-[#f2f0eb] leading-[0.95] mb-8"
          style={{ fontFamily: displayFont }}
        >
          Let’s build
          <br />
          something
          <br />
          <span className="text-[#00d26a]">extraordinary</span>.
        </h2>

        <div
          className="mx-auto h-[2px] bg-[#00d26a] mb-8"
          style={{ width: lineProgress * 240 }}
        />

        <div
          className="text-xl text-white/70 tracking-wide mb-4"
          style={{ fontFamily: bodyFont }}
        >
          +20 (122) 534-1205
        </div>
        <div
          className="text-lg text-white/50 tracking-wide"
          style={{ fontFamily: bodyFont }}
        >
          Artgraphegy3@gmail.com
        </div>
      </div>

      {/* Logo lockup bottom */}
      <div
        className="absolute bottom-12 flex items-center gap-4"
        style={{
          opacity: logoProgress,
          transform: `scale(${interpolate(logoProgress, [0, 1], [0.9, 1])})`,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          alt="ARTGRAPH"
          className="w-[180px] h-auto object-contain"
        />
      </div>
    </AbsoluteFill>
  );
};
