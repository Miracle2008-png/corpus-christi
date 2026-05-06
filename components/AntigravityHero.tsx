"use client";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function AntigravityHero({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount instantly without delay
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // === 1. MATTER.JS PHYSICS ===
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    const world = engine.world;

    const container = containerRef.current;
    
    // We target anything with the class "ag-element" to fall
    const elements = Array.from(container.querySelectorAll(".ag-element")) as HTMLElement[];
    if (elements.length === 0) return;

    const width = document.documentElement.scrollWidth;
    const height = document.documentElement.scrollHeight; // Floor is at the absolute bottom of the entire page
    const scrollY = 0;

    // Allow scrolling so the user can follow the elements down!

    // Create boundaries to keep things on screen
    const wallThickness = 100;
    const ground = Bodies.rectangle(width / 2, scrollY + height + wallThickness/2 - 10, width * 2, wallThickness, { isStatic: true });
    const leftWall = Bodies.rectangle(-wallThickness/2, scrollY + height / 2, wallThickness, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + wallThickness/2, scrollY + height / 2, wallThickness, height * 2, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, scrollY - 1000, width * 2, wallThickness, { isStatic: true });

    World.add(world, [ground, leftWall, rightWall, ceiling]);

    // 1. Measure all elements first before modifying DOM to avoid reflow shifts
    const measuredElements = elements.map(el => {
      const rect = el.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      return {
        el,
        width: rect.width,
        height: rect.height,
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
      };
    });

    const bodyMap: { body: Matter.Body, el: HTMLElement, width: number, height: number }[] = [];

    // 2. Create physics bodies and style the elements for absolute positioning
    measuredElements.forEach(data => {
      const { el, width, height, x, y } = data;

      const body = Bodies.rectangle(x, y, width, height, {
        restitution: 0.8, // More bounciness for snappy feel
        friction: 0.1,
        frictionAir: 0.01, // Less air friction so they fall faster
        density: 0.005,
      });

      // Prepare element for physics mapping
      el.style.position = "absolute";
      el.style.left = "0px";
      el.style.top = "0px";
      el.style.margin = "0";
      // Lock width/height so text doesn't reflow when bouncing
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.transformOrigin = "center center";

      // Add a tiny random spin and velocity so they don't fall rigidly
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: -2 });

      // Initial transform
      el.style.transform = `translate(${x - width / 2}px, ${y - height / 2}px) rotate(0rad)`;

      World.add(world, body);
      bodyMap.push({ body, el, width, height });
    });

    // Add mouse control so user can throw elements around
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(world, mouseConstraint);

    // Keep the mouse in sync with scrolling
    const anyMouse = mouseConstraint.mouse as any;
    if (anyMouse.mousewheel) {
      anyMouse.element.removeEventListener("mousewheel", anyMouse.mousewheel);
      anyMouse.element.removeEventListener("DOMMouseScroll", anyMouse.mousewheel);
    }

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // === 2. MOUSE PARTICLE TRAIL ===
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    let particles: { x: number, y: number, r: number, color: string, vx: number, vy: number, life: number }[] = [];
    const colors = ['#C9A84C', '#F0D060', '#A07830', '#FFFFFF', '#8B1A1A'];
    
    if (canvas) {
      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;
      ctx = canvas.getContext('2d');
    }

    const onMouseMove = (e: MouseEvent) => {
      // Add multiple particles per mouse move for a dense trail
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: e.pageX + (Math.random() - 0.5) * 10,
          y: e.pageY + (Math.random() - 0.5) * 10,
          r: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 + 1, // Fall down slightly
          life: 1.0
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Sync DOM elements with physics bodies & draw particles
    const updateLoop = () => {
      bodyMap.forEach(({ body, el, width, height }) => {
        el.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`;
      });

      // Render Particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02; // Fade out

          if (p.life <= 0) {
            particles.splice(i, 1);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      requestAnimationFrame(updateLoop);
    };
    requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [mounted]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", opacity: mounted ? 1 : 0, transition: "opacity 0.1s" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999 }} />
      <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}
