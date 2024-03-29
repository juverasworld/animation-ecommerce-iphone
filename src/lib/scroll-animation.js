import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import ScrollTrigger separately if you're using GSAP version 3 or above

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

export const scrollAnimation = (position, target, onUpdate) => {
  const tl = gsap.timeline();

  // Animation for first section
  tl.to(position, {
    x: -1.38,
    y: -10.74,
    z: -5.93,
    scrollTrigger: {
      trigger: ".sound-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      x: 1.52,
      y: 0.77,
      z: 1.08,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".jumbotron-section", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })
    .to(".sound-section-content", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".sound-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });

  // Animation for second section
  tl.to(position, {
    x: 1.56,
    y: 5.0,
    z: 0.01,
    scrollTrigger: {
      trigger: ".display-section",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  })

    .to(target, {
      x: -0.55,
      y: 0.32,
      z: 0.0,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    })

    .to(".display-section", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".display-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });
};
