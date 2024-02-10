import React, { useRef, useCallback, useEffect } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  TonemapPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  GammaCorrectionPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
} from "webgi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation"; // Ensure correct path to your scroll animation function
gsap.registerPlugin(ScrollTrigger);

export default function WebgiViewer() {
  const canvasRef = useRef(null);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    // Add plugins
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    viewer.renderer.refreshPipeline();
    await manager.addFromPath("scene-black.glb");

    // Configure TonemapPlugin
    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    // Event listener for preFrame
    let needsUpdate = true;
    const onUpdate = () => {
      needsUpdate = true;
    };

    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        viewer.setDirty(); // Update the viewer after modifying camera properties
        needsUpdate = false;
      }
    });

    // Scroll animation
    scrollAnimation(position, target, onUpdate); // Ensure scrollAnimation function is correctly defined and implemented
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div id="webgi-canvas-container" className="">
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
}
