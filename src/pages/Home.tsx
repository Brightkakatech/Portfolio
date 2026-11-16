import { Link } from "react-router-dom";
import { useTypewriter } from "../hooks/useTypewriter";
import LiveClock from "../components/LiveClock";

// The roles typed out under the tagline. Kept outside the component so the
// typewriter doesn't restart each time the page re-renders.
const ROLES = [
  "Software Engineering student",
  "System Administrator",
  "React and TypeScript developer",
  "Problem solver",
] as const;

// Files in /public are served from the site's base address (/Portfolio/)
const CV_URL = `${import.meta.env.BASE_URL}cv/Bright-Amalahu-CV.pdf`;

/**
 * Landing page: name, tagline, a short introduction and a call to action
 * that leads visitors to the Messages page.
 * The name, tagline and button slide in using a small CSS animation (class
 * "hero-enter" in index.css) instead of GSAP. The introduction paragraph is
 * not animated: it is the largest text on the page, so showing it straight
 * away keeps the page fast (Largest Contentful Paint), and GSAP is no longer
 * downloaded on the first visit.
 * Under the tagline a typewriter line cycles through my roles. Screen
 * readers get the full list once instead (the moving text is hidden from
 * them), and visitors who prefer reduced motion see the first role only.
 * On wide screens a "Right now in Limerick" card (analogue clock and live
 * weather) sits on the left of the introduction; on phones it moves below it.
 */
function Home() {
  const role = useTypewriter(ROLES);

  return (
    <div className="home-layout">
      <section className="hero">
        <h1 className="hero-name hero-enter">Bright Amalahu</h1>
        <p className="hero-tagline hero-enter">
          Master's student in Software Engineering at the University of
          Limerick, Ireland.
        </p>

        <p className="hero-role hero-enter">
          <span className="sr-only">{ROLES.join(", ")}</span>
          <span aria-hidden="true">
            {role}
            <span className="caret" />
          </span>
        </p>

        <p className="hero-intro">
          Becoming a Software Engineer has been a long-standing dream of mine. I
          have always understood that achieving this goal would require
          dedication, perseverance, and a willingness to overcome significant
          challenges. However, I made a commitment to myself that, regardless of
          the difficulties I may encounter along the way, I will remain
          determined and continue working towards fulfilling this dream.
        </p>

        {/* Buttons that lead visitors to key pages */}
        <div className="hero-buttons hero-enter">
          <a href={CV_URL} className="btn btn-primary" download>
            Download CV
          </a>
          <Link to="/messages" className="btn btn-secondary">
            Get in touch
          </Link>
        </div>
      </section>

      {/* After the introduction in the page order, so the text (the largest
        item) still loads first; CSS moves the card to the left on wide screens */}
      <LiveClock />
    </div>
  );
}

export default Home;
