"use client";

import { useEffect, useRef, useState } from "react";
import type * as Three from "three";

const layers = [
  { name: "Interface", stack: "React / TypeScript / Accessibility", description: "Clear interfaces, accessible interactions, and data visualizations that help people use the product." },
  { name: "API & data", stack: ".NET / NestJS / PostgreSQL", description: "Reliable application services, deliberate API contracts, and integration with existing systems." },
  { name: "Infrastructure", stack: "AWS / Azure / Observability", description: "Repeatable delivery and production visibility, with care for reliability and sensitive data." },
];
interface Controls { select: (index: number) => void; pause: (value: boolean) => void; reset: () => void; rotate: (axis: "x" | "y", direction: number) => void }

export function SystemLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useRef<Controls | null>(null);
  const selection = useRef(0);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let renderer: Three.WebGLRenderer | undefined;
    const geometries = new Set<Three.BufferGeometry>();
    const materials = new Set<Three.Material>();
    const dispose = () => { geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); renderer?.dispose(); };

    async function initialize() {
      try {
        const THREE = await import("three");
        if (cancelled || !canvas) return;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
        camera.position.set(8, 6, 9);
        camera.lookAt(0, 0, 0);
        const assembly = new THREE.Group();
        assembly.rotation.y = -0.3;
        scene.add(assembly);
        scene.add(new THREE.AmbientLight(0xd9dcff, 2));
        const key = new THREE.DirectionalLight(0xf19aff, 5);
        key.position.set(3, 6, 4);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0x73efda, 4);
        fill.position.set(-4, 1, -3);
        scene.add(fill);

        const ownGeometry = <T extends Three.BufferGeometry>(geometry: T): T => { geometries.add(geometry); return geometry; };
        const ownMaterial = <T extends Three.Material>(material: T): T => { materials.add(material); return material; };
        const panelGeometry = ownGeometry(new THREE.BoxGeometry(3.9, 0.12, 3.1));
        const edgeGeometry = ownGeometry(new THREE.EdgesGeometry(panelGeometry));
        const colors = [0xd69bff, 0xff99de, 0x86e8de];
        const panels: { group: Three.Group; material: Three.MeshStandardMaterial; edge: Three.LineBasicMaterial; light: Three.MeshStandardMaterial }[] = [];
        const chipGeometry = ownGeometry(new THREE.BoxGeometry(0.65, 0.17, 0.65));
        for (let i = 0; i < 3; i++) {
          const group = new THREE.Group();
          group.position.y = 1.75 - i * 1.75;
          const material = ownMaterial(new THREE.MeshStandardMaterial({ color: 0x18202e, metalness: 0.65, roughness: 0.3, transparent: true, opacity: 0.92 }));
          const edge = ownMaterial(new THREE.LineBasicMaterial({ color: colors[i], transparent: true, opacity: 0.65 }));
          const light = ownMaterial(new THREE.MeshStandardMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.6, metalness: 0.3, roughness: 0.3 }));
          group.add(new THREE.Mesh(panelGeometry, material), new THREE.LineSegments(edgeGeometry, edge));
          for (let n = 0; n < 6; n++) {
            const chip = new THREE.Mesh(chipGeometry, light);
            chip.position.set((n % 3 - 1) * 1.05, 0.17, (Math.floor(n / 3) - 0.5) * 1.25);
            group.add(chip);
          }
          const railGeometry = ownGeometry(new THREE.BoxGeometry(2.9, 0.025, 0.025));
          for (const z of [-1.15, 1.15]) { const rail = new THREE.Mesh(railGeometry, light); rail.position.set(0, 0.085, z); group.add(rail); }
          assembly.add(group);
          panels.push({ group, material, edge, light });
        }
        const connectorMaterial = ownMaterial(new THREE.LineBasicMaterial({ color: 0x798da9, transparent: true, opacity: 0.4 }));
        for (const x of [-1.55, 1.55]) for (const z of [-1.1, 1.1]) {
          const geometry = ownGeometry(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -1.7, z), new THREE.Vector3(x, 1.75, z)]));
          assembly.add(new THREE.Line(geometry, connectorMaterial));
        }
        const core = new THREE.Mesh(ownGeometry(new THREE.IcosahedronGeometry(0.55, 0)), ownMaterial(new THREE.MeshStandardMaterial({ color: 0xe6ddff, emissive: 0x7753c2, emissiveIntensity: 0.35, metalness: 0.7, roughness: 0.15 })));
        core.position.y = 0.85;
        assembly.add(core);
        const ring = new THREE.Mesh(ownGeometry(new THREE.TorusGeometry(3.1, 0.018, 6, 100)), ownMaterial(new THREE.MeshBasicMaterial({ color: 0xc689e8, transparent: true, opacity: 0.8 })));
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -2;
        assembly.add(ring);
        const halo = new THREE.Mesh(ownGeometry(new THREE.TorusGeometry(3.45, 0.014, 6, 100)), ownMaterial(new THREE.MeshBasicMaterial({ color: 0xec8acd, transparent: true, opacity: 0.6 })));
        halo.rotation.set(Math.PI / 2.6, 0.3, 0.25);
        assembly.add(halo);

        let frame = 0;
        let visible = true;
        let manualPause = false;
        let lost = false;
        let dragging = false;
        let pointerX = 0;
        let pointerY = 0;
        let previousTime = 0;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const render = () => { if (!cancelled && !lost) renderer?.render(scene, camera); };
        const canAnimate = () => !cancelled && !lost && visible && !document.hidden && !motion.matches && !manualPause;
        const animate = (time: number) => {
          frame = 0;
          if (!canAnimate()) return;
          const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
          previousTime = time;
          if (!dragging) assembly.rotation.y += delta * 0.09;
          core.rotation.y += delta * 0.18;
          render();
          frame = requestAnimationFrame(animate);
        };
        const sync = () => { if (frame) cancelAnimationFrame(frame); frame = 0; previousTime = 0; if (canAnimate()) frame = requestAnimationFrame(animate); else render(); };
        const select = (index: number) => { panels.forEach((panel, i) => { panel.edge.opacity = i === index ? 1 : 0.25; panel.light.emissiveIntensity = i === index ? 1.1 : 0.15; panel.material.color.setHex(i === index ? 0x33324f : 0x151b28); }); render(); };
        controls.current = {
          select,
          pause: value => { manualPause = value; sync(); },
          reset: () => { assembly.rotation.set(0, -0.3, 0); core.rotation.set(0, 0, 0); render(); },
          rotate: (axis, direction) => {
            if (axis === "x") assembly.rotation.x = THREE.MathUtils.clamp(assembly.rotation.x + direction * 0.15, -0.4, 0.4);
            else assembly.rotation.y += direction * 0.3;
            render();
          },
        };
        select(selection.current);
        const resize = () => { if (!renderer || !canvas) return; const { width, height } = canvas.getBoundingClientRect(); if (!width || !height) return; renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); render(); };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.05 });
        observer.observe(canvas);
        const onMotion = () => { setReducedMotion(motion.matches); sync(); };
        const onDown = (event: PointerEvent) => { if (event.pointerType === "touch" || event.button !== 0) return; dragging = true; pointerX = event.clientX; pointerY = event.clientY; canvas.setPointerCapture(event.pointerId); };
        const onMove = (event: PointerEvent) => { if (!dragging) return; assembly.rotation.y += (event.clientX - pointerX) * 0.008; assembly.rotation.x = THREE.MathUtils.clamp(assembly.rotation.x + (event.clientY - pointerY) * 0.004, -0.4, 0.4); pointerX = event.clientX; pointerY = event.clientY; render(); };
        const onUp = () => { dragging = false; };
        const onLost = (event: Event) => { event.preventDefault(); lost = true; sync(); setStatus("fallback"); };
        const onRestored = () => { lost = false; resize(); setStatus("ready"); sync(); };
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("lostpointercapture", onUp);
        canvas.addEventListener("webglcontextlost", onLost);
        canvas.addEventListener("webglcontextrestored", onRestored);
        document.addEventListener("visibilitychange", sync);
        motion.addEventListener("change", onMotion);
        cleanup = () => { if (frame) cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect(); motion.removeEventListener("change", onMotion); document.removeEventListener("visibilitychange", sync); canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerup", onUp); canvas.removeEventListener("lostpointercapture", onUp); canvas.removeEventListener("webglcontextlost", onLost); canvas.removeEventListener("webglcontextrestored", onRestored); controls.current = null; dispose(); };
        resize();
        setReducedMotion(motion.matches);
        setStatus("ready");
        sync();
      } catch { dispose(); if (!cancelled) setStatus("fallback"); }
    }
    void initialize();
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return <div className="system-lab">
    <div className="lab-heading"><span className="eyebrow">The full-stack perspective</span><span className="lab-index">FIG. 01</span></div>
    <div className={`lab-stage ${status === "ready" ? "is-ready" : ""}`}>
      <div className="lab-cross cross-top" aria-hidden="true">+</div><div className="lab-cross cross-bottom" aria-hidden="true">+</div>
      <div className={`static-system selected-${selected}`} aria-hidden="true"><div className="static-orbit" /><div className="static-panel panel-interface"><span>INTERFACE</span><i /><i /><i /></div><div className="static-panel panel-api"><span>API & DATA</span><i /><i /><i /></div><div className="static-panel panel-infra"><span>INFRASTRUCTURE</span><i /><i /><i /></div></div>
      <canvas ref={canvasRef} aria-hidden="true" className="lab-canvas" />
      <span className="scene-note">{status === "ready" ? "Use the buttons below to explore the view" : "Interface → API → Infrastructure"}</span>
    </div>
    <div className="layer-buttons" role="group" aria-label="Explore system layers">{layers.map((layer, index) => <button key={layer.name} type="button" aria-pressed={selected === index} onClick={() => { selection.current = index; setSelected(index); controls.current?.select(index); }}><span>0{index + 1}</span>{layer.name}</button>)}</div>
    <div className="layer-description" aria-live="polite"><p className="layer-stack">{layers[selected].stack}</p><p>{layers[selected].description}</p></div>
    <div className="view-controls" role="group" aria-label="Adjust the 3D view without dragging">
      <button type="button" disabled={status !== "ready"} onClick={() => controls.current?.rotate("y", -1)}>Rotate left</button>
      <button type="button" disabled={status !== "ready"} onClick={() => controls.current?.rotate("y", 1)}>Rotate right</button>
      <button type="button" disabled={status !== "ready"} onClick={() => controls.current?.rotate("x", -1)}>Tilt up</button>
      <button type="button" disabled={status !== "ready"} onClick={() => controls.current?.rotate("x", 1)}>Tilt down</button>
    </div>
    <div className="scene-controls"><span className="lab-index">One system. Multiple perspectives.</span><div><button type="button" disabled={status !== "ready" || reducedMotion} aria-pressed={paused} onClick={() => { const value = !paused; setPaused(value); controls.current?.pause(value); }}>{reducedMotion ? "Motion off" : paused ? "Resume" : "Pause"}</button><button type="button" disabled={status !== "ready"} onClick={() => controls.current?.reset()}>Reset</button></div></div>
  </div>;
}
