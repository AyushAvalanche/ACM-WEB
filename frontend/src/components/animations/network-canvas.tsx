"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  layer: number; // 0 = back, 1 = mid, 2 = front
  pulseOffset: number;
}

interface NetworkCanvasProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
}

const PALETTE = [
  "0, 102, 255",   // blue
  "139, 92, 246",  // purple
  "6, 214, 160",   // cyan
  "59, 130, 246",  // lighter blue
  "236, 72, 153",  // pink
];

export function NetworkCanvas({
  className = "",
  nodeCount = 60,
  interactive = true,
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initNodes = useCallback(
    (width: number, height: number) => {
      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => {
        const layer = i < nodeCount * 0.3 ? 0 : i < nodeCount * 0.7 ? 1 : 2;
        const speed = layer === 0 ? 0.12 : layer === 1 ? 0.2 : 0.3;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1.2,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          alpha: layer === 0 ? 0.12 : layer === 1 ? 0.22 : 0.35,
          layer,
          pulseOffset: Math.random() * Math.PI * 2,
        };
      });
    },
    [nodeCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) initNodes(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    if (interactive) canvas.addEventListener("mousemove", handleMouse);

    const connectionDistance = 130;
    const mouseRadius = 160;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      timeRef.current += 0.01;
      const time = timeRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        if (interactive) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            // Attraction for front layer, repulsion for back
            const force = ((mouseRadius - dist) / mouseRadius) * 0.6;
            if (node.layer === 2) {
              node.x += (dx / dist) * force * 0.3;
              node.y += (dy / dist) * force * 0.3;
            } else {
              node.x -= (dx / dist) * force;
              node.y -= (dy / dist) * force;
            }
          }
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i].layer - nodes[j].layer) > 1) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.08;
            const nearMouse =
              interactive &&
              (Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y) < mouseRadius ||
                Math.hypot(mouse.x - nodes[j].x, mouse.y - nodes[j].y) < mouseRadius);

            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(${nodes[i].color}, ${nearMouse ? opacity * 3 : opacity})`);
            gradient.addColorStop(1, `rgba(${nodes[j].color}, ${nearMouse ? opacity * 3 : opacity})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = nearMouse ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with pulse glow
      for (const node of nodes) {
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 0.7;
        const nearMouse =
          interactive && Math.hypot(mouse.x - node.x, mouse.y - node.y) < mouseRadius;
        const glowAlpha = nearMouse ? node.alpha * 2 : node.alpha * pulse;

        // Glow
        if (node.layer === 2 || nearMouse) {
          const glow = ctx.createRadialGradient(
            node.x, node.y, 0, node.x, node.y, node.radius * 8
          );
          glow.addColorStop(0, `rgba(${node.color}, ${glowAlpha * 0.3})`);
          glow.addColorStop(1, `rgba(${node.color}, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (nearMouse ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${nearMouse ? 0.8 : glowAlpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (interactive) canvas.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [initNodes, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
