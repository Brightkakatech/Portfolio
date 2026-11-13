import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animations only run for visitors who have NOT asked their device to
// reduce motion (an accessibility setting for people sensitive to movement)
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Slides elements in one after another when a page opens.
 * useGSAP removes the animation automatically when the page closes.
 * @param {string} selector - Which elements to animate, inside the container.
 * @returns {import("react").RefObject} Attach to the container element.
 */
export function useEntrance(selector) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(gsap.utils.toArray(selector, containerRef.current), {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15, // each element starts 0.15s after the previous one
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return containerRef;
}

/**
 * Fades elements up as they scroll into view, using GSAP's ScrollTrigger.
 * Each element animates once, the first time it appears.
 * @param {string} selector - Which elements to animate, inside the container.
 * @param {Array} [dependencies=[]] - Values that, when they change, mean new
 *   elements have appeared (e.g. data that has just loaded), so it runs again.
 * @returns {import("react").RefObject} Attach to the container element.
 */
export function useRevealOnScroll(selector, dependencies = []) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils
          .toArray(selector, containerRef.current)
          .forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%", // when the top of the card is 90% down the screen
                once: true,
              },
            });
          });
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies },
  );

  return containerRef;
}
