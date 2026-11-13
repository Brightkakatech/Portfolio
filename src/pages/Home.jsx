import { Link } from "react-router-dom";
import { useEntrance } from "../hooks/useAnimations";

/**
 * Landing page: name, tagline, a short introduction and a call to action
 * that leads visitors to the Messages page. The content slides in when
 * the page opens (skipped for visitors who prefer reduced motion).
 */
function Home() {
  // Slide the name, tagline, introduction and button in one after another
  const heroRef = useEntrance(":scope > *");

  return (
    <section className="hero" ref={heroRef}>
      <h1 className="hero-name">Bright Amalahu</h1>
      <p className="hero-tagline">
        Master's student in Software Engineering at the University of Limerick,
        Ireland.
      </p>

      <p className="hero-intro">
        Becoming a Software Engineer has been a long-standing dream of mine. I
        have always understood that achieving this goal would require
        dedication, perseverance, and a willingness to overcome significant
        challenges. However, I made a commitment to myself that, regardless of
        the difficulties I may encounter along the way, I will remain determined
        and continue working towards fulfilling this dream.
      </p>

      {/* Buttons that lead visitors to key pages */}
      <div className="hero-buttons">
        <Link to="/messages" className="btn btn-secondary">
          Get in touch
        </Link>
      </div>
    </section>
  );
}

export default Home;
