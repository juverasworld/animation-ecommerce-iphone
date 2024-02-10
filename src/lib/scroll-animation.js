import gsap from "gsap";
import Jumbotron from "../components/Jumbotron";

export const scrollAnimation = (position, target, onUpdate)=>{
    const timeLine = gsap.timeline();

    timeLine
      .to(position, {
        x: -3.38,
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
      .to(".jumbotron-section", {
      opacity:0,
        scrollTrigger: {
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
      })

      .to(".sound-section-content", {
      opacity:1,
        scrollTrigger: {
          trigger: ".sound-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
        },
      });
}