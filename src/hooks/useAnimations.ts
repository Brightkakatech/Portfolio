import { useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animations only run for visitors who have NOT asked their device to
// reduce motion (an accessibility setting for people sensitive to movement)
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Fades elements up as they scroll into view, using GSAP's ScrollTrigger.
 * Each element animates once, the first time it appears.
 * @param selector - Which elements to animate, inside the container.
 * @param dependencies - Values that, when they change, mean new elements
 *   have appeared (e.g. data that has just loaded), so it runs again.
 * @returns A ref to attach to the container element.
 */
export function useRevealOnScroll<E extends HTMLElement = HTMLElement>(
  selector: string,
  dependencies: DependencyList = [],
): RefObject<E | null> {
  const containerRef = useRef<E>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils
          .toArray<Element>(selector, containerRef.current)
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
    { scope: containerRef, dependencies: [...dependencies] },
  );

  return containerRef;
}
