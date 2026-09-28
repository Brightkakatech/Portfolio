import about from "../data/about";

// The site's base address – keeps the photo path working after deployment
const base = import.meta.env.BASE_URL;

function About() {
  return (
    <section>
      <h1>About Me</h1>

      {/* ---------- Photo and story ---------- */}
      <div className="about-layout">
        {/* Only show the photo if one is set in about.js */}
        {about.photo && (
          <div className="about-photo">
            <img src={`${base}images/${about.photo}`} alt="Portrait of Bright Amalahu" />
          </div>
        )}

        <div className="about-text">
          <p className="about-intro">{about.intro}</p>
          {about.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* ---------- Quick facts ---------- */}
      <h2 className="section-title">At a glance</h2>
      <div className="highlights-grid">
        {about.highlights.map((item) => (
          <div className="highlight-card" key={item.title}>
            <span className="highlight-title">{item.title}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* ---------- Interests ---------- */}
      {/* Reuses the pill-shaped tags from Professional Knowledge */}
      <h2 className="section-title">Interests</h2>
      <ul className="skill-tags">
        {about.interests.map((interest) => (
          <li className="skill-tag" key={interest}>
            {interest}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default About;