import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h1 className="hero-name">Bright Amalahu</h1>
      <p className="hero-tagline">[A Software Engineer masters student at University of Limerick, Ireland.]</p>

      <p className="hero-intro">
        Becoming a Software Engineer has been a long-standing dream of mine. I have always understood that achieving this goal would require dedication, perseverance, and a willingness to overcome significant challenges. However, I made a commitment to myself that, regardless of the difficulties I may encounter along the way, I will remain determined and continue working towards fulfilling this dream.

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