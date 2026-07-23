import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const slowDrift = interpolate(frame, [0, durationInFrames], [0, -80], {
    extrapolateRight: "clamp",
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 70%, rgba(5,5,5,1) 100%)",
        }}
      />

      {/* Animated vertical blueprint lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          transform: `translateX(${slowDrift}px)`,
        }}
      />

      {/* Horizontal accent lines */}
      <div
        className="absolute left-0 right-0 h-px bg-[#00d26a] opacity-20"
        style={{ top: "33%" }}
      />
      <div
        className="absolute left-0 right-0 h-px bg-white opacity-10"
        style={{ top: "66%" }}
      />
    </div>
  );
};
