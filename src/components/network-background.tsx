"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./motion";

const BLUE = "0, 142, 255";

function noise(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

type NetworkPoint = { x: number; y: number; depth: number; glow: number };
type DataStream = { route: number[]; offset: number; speed: number };

function createStreams(columns: number, rows: number): DataStream[] {
  return Array.from({ length: columns < 30 ? 34 : 62 }, (_, index) => {
    const span = 3 + Math.floor(noise(index + 310) * 6);
    const rise = 2 + Math.floor(noise(index + 420) * 4);
    const col = 2 + Math.floor(noise(index + 530) * (columns - span - 4));
    const row = 3 + Math.floor(noise(index + 640) * (rows - rise - 6));
    const route: number[] = [];
    for (let step = 0; step <= span; step++)
      route.push(row * columns + col + step);
    for (let step = 1; step <= rise; step++)
      route.push((row + step) * columns + col + span);
    for (let step = 1; step <= span; step++)
      route.push((row + rise) * columns + col + span - step);
    for (let step = 1; step < rise; step++)
      route.push((row + rise - step) * columns + col);
    if (index % 2) route.reverse();
    return {
      route,
      offset: noise(index + 750) * route.length,
      speed: 5.5 + noise(index + 860) * 4,
    };
  });
}

function sampleStream(
  route: number[],
  progress: number,
  points: NetworkPoint[],
) {
  const wrapped = ((progress % route.length) + route.length) % route.length;
  const segment = Math.floor(wrapped);
  const amount = wrapped - segment;
  const from = points[route[segment]];
  const to = points[route[(segment + 1) % route.length]];
  return {
    x: from.x + (to.x - from.x) * amount,
    y: from.y + (to.y - from.y) * amount,
    depth: from.depth + (to.depth - from.depth) * amount,
  };
}

export function NetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const reduced = useMotionPreference();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    container.dataset.ready = "true";
    let width = 0,
      height = 0,
      frame = 0,
      previous = 0,
      visible = true;
    let streamColumns = 0;
    let streams: DataStream[] = [];

    function draw(time: number) {
      if (!ctx) return;
      if (!reduced && time - previous < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const elapsed = Math.min(time - previous, 50);
      previous = time;
      if (!reduced) phaseRef.current += elapsed * 0.00016;
      const phase = phaseRef.current;
      ctx.clearRect(0, 0, width, height);
      const columns = width < 600 ? 27 : 43;
      const rows = width < 600 ? 29 : 39;
      if (streamColumns !== columns) {
        streams = createStreams(columns, rows);
        streamColumns = columns;
      }
      const focal = Math.max(width * 0.52, height * 0.68);
      const points: NetworkPoint[] = [];

      for (let row = 0; row < rows; row++) {
        const depth = 2.3 + (row / (rows - 1)) * 33;
        for (let col = 0; col < columns; col++) {
          const seed = row * columns + col;
          const x =
            ((col / (columns - 1)) * 2 - 1) * 23 +
            (noise(seed + 2) - 0.5) * 0.65;
          const z = depth + (noise(seed + 19) - 0.5) * 0.45;
          const hill =
            4.9 * Math.exp(-((x * x) / 110 + ((z - 17) * (z - 17)) / 105));
          const wave = Math.sin(x * 0.43 + z * 0.35 + phase) * 0.18;
          const perspective = focal / (z + 5);
          points.push({
            x: width * 0.64 + x * perspective,
            y: height * 0.09 + (5.2 - hill + wave) * perspective,
            depth: z,
            glow: noise(seed + 77),
          });
        }
      }

      for (let row = rows - 1; row >= 0; row--) {
        for (let col = 0; col < columns; col++) {
          const index = row * columns + col;
          const point = points[index];
          if (point.x < -100 || point.x > width + 100 || point.y > height + 140)
            continue;
          const alpha = 0.09 + (1 - row / rows) * 0.2;
          ctx.strokeStyle = `rgba(${BLUE}, ${alpha})`;
          ctx.lineWidth = 0.45 + (1 - row / rows) * 0.3;
          for (const neighbor of [
            col < columns - 1 ? index + 1 : -1,
            row < rows - 1 ? index + columns : -1,
            col < columns - 1 && row < rows - 1 ? index + columns + 1 : -1,
          ]) {
            if (neighbor < 0) continue;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(points[neighbor].x, points[neighbor].y);
            ctx.stroke();
          }
          const radius = 0.65 + (1 - row / rows) * 1.05;
          if (point.glow > 0.91) {
            const pulse = 0.72 + Math.sin(phase * 1.5 + index) * 0.22;
            const glow = ctx.createRadialGradient(
              point.x,
              point.y,
              0,
              point.x,
              point.y,
              radius * 13,
            );
            glow.addColorStop(0, `rgba(${BLUE}, ${pulse * 0.85})`);
            glow.addColorStop(0.22, `rgba(${BLUE}, ${pulse * 0.25})`);
            glow.addColorStop(1, `rgba(${BLUE}, 0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius * 13, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#c9e7ff";
          } else ctx.fillStyle = `rgba(${BLUE}, ${0.25 + point.glow * 0.5})`;
          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            point.glow > 0.91 ? radius * 1.5 : radius * 0.65,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }

      // Each packet follows existing mesh edges, with a short luminous trail.
      for (const stream of streams) {
        const progress = phase * stream.speed + stream.offset;
        const head = sampleStream(stream.route, progress, points);
        if (
          head.x < -30 ||
          head.x > width + 30 ||
          head.y < -30 ||
          head.y > height + 30
        )
          continue;
        const tail = sampleStream(stream.route, progress - 0.6, points);
        const trail = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        trail.addColorStop(0, `rgba(${BLUE}, 0)`);
        trail.addColorStop(0.6, `rgba(${BLUE}, .55)`);
        trail.addColorStop(1, "rgba(185, 225, 255, .95)");
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        for (let step = 0; step <= 8; step++) {
          const point = sampleStream(
            stream.route,
            progress - 0.6 + (step / 8) * 0.6,
            points,
          );
          if (step === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
        const radius = 1.2 + Math.max(0, 1 - head.depth / 36) * 1.4;
        const halo = ctx.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          radius * 9,
        );
        halo.addColorStop(0, `rgba(${BLUE}, .8)`);
        halo.addColorStop(0.22, `rgba(${BLUE}, .3)`);
        halo.addColorStop(1, `rgba(${BLUE}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(head.x, head.y, radius * 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d5edff";
        ctx.beginPath();
        ctx.arc(head.x, head.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const particles = width < 600 ? 45 : 95;
      for (let i = 0; i < particles; i++) {
        const x = noise(i + 109) * width;
        const y =
          ((((noise(i + 417) - phase * 0.012) % 1) + 1) % 1) * height * 0.87;
        const radius = 0.6 + noise(i + 823) * 1.6;
        ctx.fillStyle = `rgba(${BLUE}, ${0.15 + noise(i + 71) * 0.55})`;
        ctx.shadowColor = "#008EFF";
        ctx.shadowBlur = i % 7 === 0 ? 12 : 0;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (!reduced && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(frame);
      previous = 0;
      frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      start();
    });
    resize.observe(container);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    observer.observe(container);
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div ref={containerRef} className="network-background" aria-hidden="true">
      <svg
        className="network-fallback"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="network-glow">
            <stop stopColor="#008EFF" stopOpacity=".2" />
            <stop offset="1" stopColor="#008EFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(0 -205)">
          <ellipse
            cx="920"
            cy="460"
            rx="560"
            ry="280"
            fill="url(#network-glow)"
          />
          <g fill="none" stroke="#008EFF" strokeOpacity=".28" strokeWidth=".8">
            {Array.from({ length: 14 }, (_, index) => (
              <path
                key={index}
                d={`M -100 ${500 + index * 28} Q 900 ${140 + index * 22} 1540 ${440 + index * 28}`}
              />
            ))}
            {Array.from({ length: 26 }, (_, index) => (
              <path
                key={index}
                d={`M ${index * 46 + 240} 340 Q ${index * 59 - 10} 480 ${index * 88 - 350} 800`}
              />
            ))}
          </g>
          {Array.from({ length: 38 }, (_, index) => (
            <circle
              key={index}
              cx={noise(index + 11) * 1440}
              cy={320 + noise(index + 27) * 430}
              r={1 + noise(index + 43) * 2.2}
              fill="#008EFF"
            />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} />
    </div>
  );
}
