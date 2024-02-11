import React, {
  useRef,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useEffect,
  useState,
} from "react";
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
  mobileAndTabletCheck,
} from "webgi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation"; // Ensure correct path to your scroll animation function
gsap.registerPlugin(ScrollTrigger);
const WebgiViewer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [viewerRef, setupViewerRef] = useState(null);
  const [targetRef, setupTargetRef] = useState(null);
  const [cameraRef, setupCameraRef] = useState(null);
  const [positionRef, setupPositionRef] = useState(null);
  const canvasContainerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerPreview() {
      canvasContainerRef.current.style.pointerEvents = "all";
      props.contentRef.current.style.opacity = "0";

      gsap.to(positionRef, {
        x: 13.04,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });

      viewerRef.scene.activeCamera.setCameraOptions({controlsEnabled: true})
    },
  }));
  const memoizedScrollAnimation = useCallback((position, target, onUpdate) => {
    if (position && target && onUpdate) {
      scrollAnimation(position, target, onUpdate);
    }
  }, []);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });
    setupViewerRef(viewer);
    const manager = await viewer.addPlugin(AssetManagerPlugin);
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    setupCameraRef(camera);
    setupPositionRef(position);
    setupTargetRef(target);
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

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    window.scrollTo(0, 0);

    let needsUpdate = true;
    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate = false;
      }
    });
    memoizedScrollAnimation(position, target, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer(); // Call setupViewer when the component mounts
  }, []); // Empty dependency array ensures setupViewer is only called once when the component mounts

  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container" className="">
      {/* Assign canvasRef to the canvas element */}
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
});

export default WebgiViewer;
