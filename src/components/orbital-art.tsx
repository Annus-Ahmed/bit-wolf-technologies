"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./motion";

type Point = { x: number; y: number; z: number };
type Face = { points: Point[]; normal: Point };

function surface(u: number, v: number): Point {
  const radius = 1.32 + v * Math.cos(u / 2);
  return {
    x: radius * Math.cos(u),
    y: radius * Math.sin(u),
    z: v * Math.sin(u / 2),
  };
}

function makeFaces(length = 112, width = 16): Face[] {
  const faces: Face[] = [];
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
      const u = (i / length) * Math.PI * 2;
      const nextU = ((i + 1) / length) * Math.PI * 2;
      const v = -0.61 + (j / width) * 1.22;
      const nextV = -0.61 + ((j + 1) / width) * 1.22;
      const a = surface(u, v),
        b = surface(nextU, v),
        c = surface(nextU, nextV),
        d = surface(u, nextV);
      const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
      const ad = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z };
      const normal = {
        x: ab.y * ad.z - ab.z * ad.y,
        y: ab.z * ad.x - ab.x * ad.z,
        z: ab.x * ad.y - ab.y * ad.x,
      };
      const magnitude = Math.hypot(normal.x, normal.y, normal.z) || 1;
      faces.push({
        points: [a, b, c, d],
        normal: {
          x: normal.x / magnitude,
          y: normal.y / magnitude,
          z: normal.z / magnitude,
        },
      });
    }
  }
  return faces;
}

export function OrbitalArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const reduced = useMotionPreference();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    container.dataset.ready = "true";
    const compact = container.clientWidth < 600;
    const faces = makeFaces(compact ? 72 : 112, compact ? 12 : 16);
    let frame = 0,
      angle = rotation.current,
      lastFrame = 0,
      width = 0,
      height = 0;
    let visible = true;

    function draw(timestamp: number) {
      if (!context || !canvas) return;
      if (!reduced && timestamp - lastFrame < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const elapsed = Math.min(timestamp - lastFrame, 50);
      lastFrame = timestamp;
      if (!reduced) {
        angle += elapsed * 0.000065;
        rotation.current = angle;
      }
      context.clearRect(0, 0, width, height);
      const ax = 0.83 + pointer.current.y * 0.12;
      const ay = angle + 0.25 + pointer.current.x * 0.16;
      const az = -0.48;
      const cosX = Math.cos(ax),
        sinX = Math.sin(ax);
      const cosY = Math.cos(ay),
        sinY = Math.sin(ay);
      const cosZ = Math.cos(az),
        sinZ = Math.sin(az);
      function rotate(point: Point): Point {
        const x1 = point.x * cosY + point.z * sinY;
        const z1 = -point.x * sinY + point.z * cosY;
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        return {
          x: x1 * cosZ - y2 * sinZ,
          y: x1 * sinZ + y2 * cosZ,
          z: z2,
        };
      }
      const scale = Math.min(width, height) * 0.268;
      const rendered = faces
        .map((face) => {
          const points = face.points.map(rotate);
          return {
            points,
            normal: rotate(face.normal),
            depth: points.reduce((sum, point) => sum + point.z, 0) / 4,
          };
        })
        .sort((a, b) => b.depth - a.depth);
      for (const face of rendered) {
        const light = Math.abs(
          face.normal.x * -0.35 + face.normal.y * -0.6 + face.normal.z * 0.72,
        );
        const shade = Math.round(36 + light * 118 + Math.pow(light, 12) * 91);
        context.beginPath();
        face.points.forEach((point, index) => {
          const perspective = 4 / (4 + point.z);
          const x = width * 0.5 + point.x * scale * perspective;
          const y = height * 0.49 + point.y * scale * perspective;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.fillStyle = `rgb(${shade},${shade + 2},${shade + 3})`;
        context.fill();
        context.strokeStyle = `rgba(220,230,235,${0.035 + light * 0.1})`;
        context.lineWidth = 0.45;
        context.stroke();
      }
      if (!reduced && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(frame);
      lastFrame = 0;
      frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      start();
    });
    resize.observe(container);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    visibility.observe(container);
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="orbital-art"
      aria-hidden="true"
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <svg className="orbital-fallback" viewBox="0 0 700 700">
        <defs>
          <linearGradient id="metal">
            <stop stopColor="#252729" />
            <stop offset=".48" stopColor="#c3c5c6" />
            <stop offset=".7" stopColor="#55585a" />
            <stop offset="1" stopColor="#171a1c" />
          </linearGradient>
        </defs>
        <ellipse
          cx="350"
          cy="350"
          rx="230"
          ry="150"
          transform="rotate(-38 350 350)"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="85"
        />
      </svg>
      <canvas ref={canvasRef} />
      <div className="art-orbit orbit-a" />
      <div className="art-orbit orbit-b" />
      <span className="art-coordinate">OPEN POSSIBILITIES</span>
    </div>
  );
}
