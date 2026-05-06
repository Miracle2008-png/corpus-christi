"use client";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function AntigravityHero({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // Trigger almost instantly
    const timer = setTimeout(() => {
      setTriggered(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!triggered || !containerRef.current) return;

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
        restitution: 0.6, // Bounciness
        friction: 0.1,
        frictionAir: 0.02,
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

    // Sync DOM elements with physics bodies
    const updateLoop = () => {
      bodyMap.forEach(({ body, el, width, height }) => {
        el.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(updateLoop);
    };
    requestAnimationFrame(updateLoop);

    return () => {
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [triggered]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      {children}
    </div>
  );
}
