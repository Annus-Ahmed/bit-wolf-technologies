"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./motion";

type Point = { x: number; y: number };
type LandGeometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};
type LandData = { features: { geometry: LandGeometry }[] };
type Route = {
  end: Point;
  control: Point;
  color: string;
  speed: number;
  offset: number;
};

const PAKISTAN = { longitude: 69.3, latitude: 30.4 };
const COLORS = [
  "45, 212, 240",
  "69, 185, 255",
  "163, 125, 255",
  "57, 221, 199",
  "240, 181, 103",
];
// Illustrative routes from Pakistan; these do not represent client locations.
const DESTINATIONS = [
  [-74, 40.7],
  [-122.4, 37.8],
  [-118.2, 34],
  [-79.4, 43.7],
  [-99.1, 19.4],
  [-46.6, -23.6],
  [-58.4, -34.6],
  [-0.1, 51.5],
  [2.4, 48.9],
  [13.4, 52.5],
  [18.1, 59.3],
  [28.9, 41],
  [37.6, 55.8],
  [31.2, 30],
  [3.4, 6.5],
  [28, -26.2],
  [55.3, 25.2],
  [46.7, 24.7],
  [77.2, 28.6],
  [103.8, 1.4],
  [116.4, 39.9],
  [139.7, 35.7],
  [127, 37.6],
  [151.2, -33.9],
  [144.9, -37.8],
  [174.8, -36.8],
  [106.8, -6.2],
  [-6.3, 53.3],
  [-9.1, 38.7],
  [-3.7, 40.4],
  [12.5, 41.9],
  [21, 52.2],
  [24.9, 60.2],
  [23.7, 38],
  [36.8, -1.3],
  [-7.6, 33.6],
  [38.8, 9],
  [90.4, 23.8],
  [85.3, 27.7],
  [79.9, 6.9],
  [101.7, 3.1],
  [100.5, 13.8],
  [105.8, 21],
  [121, 14.6],
  [71.4, 51.2],
  [69.2, 41.3],
  [51.4, 35.7],
];

function noise(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function sampleRoute(start: Point, route: Route, t: number): Point {
  const remaining = 1 - t;
  return {
    x:
      remaining * remaining * start.x +
      2 * remaining * t * route.control.x +
      t * t * route.end.x,
    y:
      remaining * remaining * start.y +
      2 * remaining * t * route.control.y +
      t * t * route.end.y,
  };
}

export function WorldNetworkBackground() {
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

    const base = document.createElement("canvas");
    const baseCtx = base.getContext("2d");
    const hitCtx = document.createElement("canvas").getContext("2d");
    const controller = new AbortController();
    let data: LandData | undefined;
    let width = 0,
      height = 0,
      ratio = 1,
      frame = 0,
      previous = 0;
    let visible = true;
    let hub: Point = { x: 0, y: 0 };
    let routes: Route[] = [];

    function project(longitude: number, latitude: number): Point {
      const mapWidth = width < 640 ? Math.max(width * 1.4, 650) : width * 0.99;
      const mapHeight = mapWidth * 0.49;
      const left = width * 0.68 - ((PAKISTAN.longitude + 180) / 360) * mapWidth;
      const top = width < 640 ? height * 0.46 : height * 0.07;
      return {
        x: left + ((longitude + 180) / 360) * mapWidth,
        y: top + ((83 - latitude) / 180) * mapHeight,
      };
    }

    function prepare() {
      if (!width || !height || !baseCtx || !hitCtx) return;
      base.width = canvas!.width;
      base.height = canvas!.height;
      baseCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
      hub = project(PAKISTAN.longitude, PAKISTAN.latitude);
      routes = DESTINATIONS.map(([longitude, latitude], index) => {
        const end = project(longitude, latitude);
        const distance = Math.hypot(end.x - hub.x, end.y - hub.y);
        return {
          end,
          control: {
            x: (hub.x + end.x) / 2,
            y: Math.min(hub.y, end.y) - Math.min(distance * 0.23, height * 0.2),
          },
          color: COLORS[index % COLORS.length],
          speed: 0.65 + noise(index + 40) * 0.5,
          offset: noise(index + 90),
        };
      });
      if (!data) return;

      const land = new Path2D();
      for (const feature of data.features) {
        const polygons =
          feature.geometry.type === "Polygon"
            ? [feature.geometry.coordinates as number[][][]]
            : (feature.geometry.coordinates as number[][][][]);
        for (const polygon of polygons) {
          if (polygon[0].every(([, latitude]) => latitude < -60)) continue;
          for (const ring of polygon) {
            ring.forEach(([longitude, latitude], index) => {
              const point = project(longitude, latitude);
              if (index === 0) land.moveTo(point.x, point.y);
              else land.lineTo(point.x, point.y);
            });
            land.closePath();
          }
        }
      }

      baseCtx.fillStyle = "rgba(0, 108, 180, .16)";
      baseCtx.fill(land, "evenodd");
      baseCtx.strokeStyle = "rgba(43, 178, 244, .88)";
      baseCtx.lineWidth = 0.7;
      baseCtx.stroke(land);
      baseCtx.save();
      baseCtx.clip(land, "evenodd");
      const spacing = width < 640 ? 12 : 15;
      const nodes = new Map<string, Point>();
      const columns = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const seed = row * columns + col;
          const point = {
            x: col * spacing + (noise(seed + 5) - 0.5) * spacing * 0.65,
            y: row * spacing + (noise(seed + 11) - 0.5) * spacing * 0.65,
          };
          if (hitCtx.isPointInPath(land, point.x, point.y, "evenodd"))
            nodes.set(`${row}:${col}`, point);
        }
      }
      for (const [key, point] of nodes) {
        const [row, col] = key.split(":").map(Number);
        const color = COLORS[(row + col) % COLORS.length];
        baseCtx.strokeStyle = `rgba(${color}, .44)`;
        baseCtx.lineWidth = 0.55;
        for (const neighbor of [
          nodes.get(`${row}:${col + 1}`),
          nodes.get(`${row + 1}:${col}`),
          nodes.get(`${row + 1}:${col + 1}`),
        ]) {
          if (!neighbor) continue;
          baseCtx.beginPath();
          baseCtx.moveTo(point.x, point.y);
          baseCtx.lineTo(neighbor.x, neighbor.y);
          baseCtx.stroke();
        }
        baseCtx.fillStyle = `rgba(${color}, .72)`;
        baseCtx.beginPath();
        baseCtx.arc(point.x, point.y, 0.65, 0, Math.PI * 2);
        baseCtx.fill();
      }
      baseCtx.restore();

      // Cache the map and route lines; only the traveling packets redraw.
      for (const route of routes) {
        baseCtx.beginPath();
        baseCtx.moveTo(hub.x, hub.y);
        baseCtx.quadraticCurveTo(
          route.control.x,
          route.control.y,
          route.end.x,
          route.end.y,
        );
        baseCtx.strokeStyle = `rgba(${route.color}, .32)`;
        baseCtx.lineWidth = 0.7;
        baseCtx.stroke();
        baseCtx.fillStyle = `rgba(${route.color}, .75)`;
        baseCtx.beginPath();
        baseCtx.arc(route.end.x, route.end.y, 1.5, 0, Math.PI * 2);
        baseCtx.fill();
      }
    }

    function draw(time: number) {
      if (!ctx || !width || !height) return;
      if (!reduced && previous && time - previous < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      if (!reduced && previous)
        phaseRef.current += Math.min(time - previous, 80) * 0.00014;
      previous = time;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(base, 0, 0, width, height);

      for (const [index, route] of routes.entries()) {
        const packetCount = width < 640 ? 1 : 2;
        for (let packet = 0; packet < packetCount; packet++) {
          const progress =
            (phaseRef.current * route.speed +
              route.offset +
              packet / packetCount) %
            1;
          const head = sampleRoute(hub, route, progress);
          const tail = sampleRoute(hub, route, Math.max(0, progress - 0.045));
          const trail = ctx.createLinearGradient(
            tail.x,
            tail.y,
            head.x,
            head.y,
          );
          trail.addColorStop(0, `rgba(${route.color}, 0)`);
          trail.addColorStop(1, `rgba(${route.color}, .65)`);
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.stroke();
          ctx.fillStyle = `rgba(${route.color}, .85)`;
          ctx.beginPath();
          ctx.arc(head.x, head.y, index % 4 === 0 ? 1.7 : 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const glow = ctx.createRadialGradient(hub.x, hub.y, 1, hub.x, hub.y, 34);
      glow.addColorStop(0, "rgba(65, 222, 255, .48)");
      glow.addColorStop(1, "rgba(0, 142, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 34, 0, Math.PI * 2);
      ctx.fill();
      const pulse = (phaseRef.current * 0.65) % 1;
      ctx.strokeStyle = `rgba(86, 220, 255, ${(1 - pulse) * 0.45})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 14 + pulse * 18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(108, 232, 255, .9)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#d5fbff";
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, 4, 0, Math.PI * 2);
      ctx.fill();
      const labelX = width < 640 ? hub.x - 177 : hub.x + 21;
      ctx.fillStyle = "rgba(3, 20, 33, .88)";
      ctx.fillRect(labelX, hub.y - 34, 156, 41);
      ctx.strokeStyle = "rgba(89, 208, 255, .5)";
      ctx.lineWidth = 0.7;
      ctx.strokeRect(labelX, hub.y - 34, 156, 41);
      ctx.font = "700 13px Arial, sans-serif";
      ctx.fillStyle = "#e1faff";
      ctx.fillText("PAKISTAN", labelX + 10, hub.y - 17);
      ctx.font = "9px Arial, sans-serif";
      ctx.fillStyle = "#81cee8";
      ctx.fillText("GLOBAL NETWORK HUB", labelX + 10, hub.y - 3);

      if (!reduced && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      prepare();
      start();
    });
    resize.observe(container);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    intersection.observe(container);
    const visibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };
    document.addEventListener("visibilitychange", visibility);
    fetch("/data/world-land.geojson", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Map outlines unavailable");
        return response.json() as Promise<LandData>;
      })
      .then((land) => {
        data = land;
        prepare();
        start();
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          console.error("Unable to load world map", error);
      });
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="network-background world-network-background"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
