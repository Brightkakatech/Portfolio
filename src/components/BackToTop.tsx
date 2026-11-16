import { useEffect, useState } from "react";

/**
 * A round "back to top" button that appears once the visitor has scrolled
 * down a long page. Smooth scrolling is skipped for visitors who prefer
 * reduced motion.
 */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600);
    }
    // passive: tells the browser this listener never blocks scrolling
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  function scrollUp() {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button className="back-to-top" onClick={scrollUp} aria-label="Back to top">
      ↑
    </button>
  );
}

export default BackToTop;
