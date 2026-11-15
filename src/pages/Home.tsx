import { Link } from "react-router-dom";

/**
 * Landing page: name, tagline, a short introduction and a call to action
 * that leads visitors to the Messages page.
 * The name, tagline and button slide in using a small CSS animation (class
 * "hero-enter" in index.css) instead of GSAP. The introduction paragraph is
 * not animated: it is the largest text on the page, so showing it straight
 * away keeps the page fast (Largest Contentful Paint), and GSAP is no longer
 * downloaded on the first visit.
 */
function Home() {
  return (
    <section className="hero">
      <h1 className="hero-name hero-enter">Bright Amalahu</h1>
      <p className="hero-tagline hero-enter">
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
      <div className="hero-buttons hero-enter">
        <Link to="/messages" className="btn btn-secondary">
          Get in touch
        </Link>
      </div>
    </section>
  );
}

export default Home;
