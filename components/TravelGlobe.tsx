"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import Section from "./Section";
import { travel } from "@/lib/data";

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Interactive Three.js globe: dot-sphere, glowing markers for
// visited countries (blue) and dream destinations (amber).
export default function TravelGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      const t = setTimeout(() => setWebglOk(false), 0);
      return () => clearTimeout(t);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5.6;

    const size = () => Math.min(mount.clientWidth, 560);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(size(), size());
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    // dot sphere (Fibonacci distribution)
    const R = 2;
    const DOTS = 1400;
    const pos = new Float32Array(DOTS * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos[i * 3] = Math.cos(th) * rad * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dots = new THREE.Points(
      dotGeo,
      new THREE.PointsMaterial({ color: 0x4a6a95, size: 0.03, transparent: true, opacity: 0.95 })
    );
    globe.add(dots);

    // faint wireframe sphere for depth
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.99, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x18263a, wireframe: true, transparent: true, opacity: 0.18 })
    );
    globe.add(wire);

    // atmosphere glow (backside sphere)
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.12, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x4da3ff, transparent: true, opacity: 0.05, side: THREE.BackSide })
    );
    globe.add(glow);

    // soft radial texture for marker halos
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 64;
    const hctx = haloCanvas.getContext("2d")!;
    const hg = hctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    hg.addColorStop(0, "rgba(255,255,255,0.9)");
    hg.addColorStop(0.35, "rgba(255,255,255,0.25)");
    hg.addColorStop(1, "rgba(255,255,255,0)");
    hctx.fillStyle = hg;
    hctx.fillRect(0, 0, 64, 64);
    const haloTex = new THREE.CanvasTexture(haloCanvas);

    // markers
    const addMarker = (lat: number, lon: number, color: number, s: number) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(s, 12, 12),
        new THREE.MeshBasicMaterial({ color })
      );
      m.position.copy(latLonToVec3(lat, lon, R * 1.01));
      globe.add(m);
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          color,
          transparent: true,
          opacity: 0.45,
          map: haloTex,
          depthWrite: false,
        })
      );
      halo.scale.setScalar(s * 7);
      halo.position.copy(m.position);
      globe.add(halo);
      return m;
    };
    travel.visited.forEach((c) => addMarker(c.lat, c.lon, 0x4da3ff, 0.045));
    travel.dreams.forEach((c) => addMarker(c.lat, c.lon, 0xf5c153, 0.038));

    // interaction: drag to rotate, auto-rotate otherwise
    let dragging = false;
    let px = 0, py = 0;
    let vx = 0, vy = 0.0022; // idle spin
    let rx = 0.35, ry = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX; py = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      vx = (e.clientY - py) * 0.0025;
      vy = (e.clientX - px) * 0.0025;
      px = e.clientX; py = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const el = renderer.domElement;
    el.style.cursor = "grab";
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let raf = 0;
    const animate = () => {
      if (!dragging) {
        vy += (0.0022 - vy) * 0.02; // ease back to idle spin
        vx += (0 - vx) * 0.04;
      }
      ry += vy;
      rx += vx;
      rx = Math.max(-1.2, Math.min(1.2, rx));
      globe.rotation.set(rx, ry, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      const s = size();
      renderer.setSize(s, s);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerdown", onDown);
      renderer.dispose();
      dotGeo.dispose();
      mount.removeChild(el);
    };
  }, []);

  return (
    <Section
      id="travel"
      kicker="Travel Map"
      title="Different countries, different test environments."
      intro="Drag the globe. Blue markers are visited. Amber markers are queued."
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="glass-deep edge-glow flex items-center justify-center overflow-hidden rounded-3xl p-4">
          {webglOk ? (
            <div ref={mountRef} className="flex w-full items-center justify-center" />
          ) : (
            <div className="p-16 text-center text-sm text-muted">
              WebGL unavailable — imagine a very cool globe here.
            </div>
          )}
        </div>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              <span className="h-2 w-2 rounded-full bg-accent" style={{ boxShadow: "0 0 8px var(--glow)" }} />
              Visited — {travel.visited.length} countries
            </div>
            <div className="flex flex-wrap gap-2">
              {travel.visited.map((c) => (
                <span key={c.name} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-fg">
                  {c.name}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              <span className="h-2 w-2 rounded-full bg-[#f5c153]" style={{ boxShadow: "0 0 8px rgba(245,193,83,0.5)" }} />
              Dream destinations — queued
            </div>
            <div className="flex flex-wrap gap-2">
              {travel.dreams.map((c) => (
                <span key={c.name} className="rounded-full border border-[#f5c15333] bg-[#f5c1530d] px-3 py-1 text-xs text-[#f5c153]">
                  {c.name}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs text-dim"
          >
            {"// aspiration: work from three continents. relocation options under evaluation."}
          </motion.p>
        </div>
      </div>
    </Section>
  );
}
