import React, { useRef, useCallback, useEffect } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  TonemapPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  GammaCorrectionPlugin, // Add GammaCorrectionPlugin here
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
} from "webgi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
export default function WebgiViewer() {
  const canvasRef = useRef(null);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);
    // adding the plugins individ ually
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
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

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    window.scrollTo(0, 0);
    let needsUpdate = true
    viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
            
            camera.positionTargetUpdated(true);
            needsUpdate= false
        }
    });
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
