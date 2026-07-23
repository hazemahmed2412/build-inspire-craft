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

const services = [
  { title: "Exhibition Booths", img: "images/service-booth.jpg" },
  { title: "Custom Wood Manufacturing", img: "images/mfg-wood.jpg" },
  { title: "Aluminum Cladding", img: "images/service-cladding.jpg" },
  { title: "Structural Glass Facades", img: "images/service-glass.jpg" },
  { title: "Acrylic Signage", img: "images/service-signage.jpg" },
  { title: "Interior Fit-Out", img: "images/service-office.jpg" },
  { title: "Turnkey Construction", img: "images/service-turnkey.jpg" },
];

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col justify-center px-20 overflow-hidden">
      <div
        className="mb-10"
        style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
      >
        <div
          className="text-[#00d26a] text-sm uppercase tracking-[0.3em] mb-3"
          style={{ fontFamily: bodyFont, fontWeight: 600 }}
        >
          Capabilities
        </div>
        <h2
          className="text-6xl text-[#f2f0eb]"
          style={{ fontFamily: displayFont }}
        >
          Seven disciplines. One studio.
        </h2>
      </div>

      {/* Services strip */}
      <div className="flex flex-row gap-4 h-[480px]">
        {services.map((s, i) => {
          const delay = i * 8;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 20, stiffness: 160, mass: 1 },
          });
          const x = interpolate(progress, [0, 1], [60, 0]);
          const opacity = progress;
          const width = interpolate(progress, [0, 1], [80, 220]);

          return (
            <div
              key={s.title}
              className="relative h-full overflow-hidden rounded-sm"
              style={{
                width,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              <Img
                src={staticFile(s.img)}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.5 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                }}
              />
              <div
                className="absolute bottom-8 left-5 right-5 text-white text-xl leading-tight"
                style={{ fontFamily: displayFont }}
              >
                {s.title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
