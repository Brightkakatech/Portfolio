import { Link } from "react-router-dom";
import { useJsonData } from "../hooks/useJsonData";
import { useRevealOnScroll } from "../hooks/useAnimations";
import DataStatus from "../components/DataStatus";
import type { Knowledge } from "../types";

/**
 * Skills, experience and live GitHub projects. Skills and experience are
 * read from data/knowledge.json and reuse the Education card styles so both
 * pages look consistent. Cards fade in as they scroll into view.
 * Each skill is a link to the site search, so a visitor can see everywhere
 * that skill appears (experience, education, blog posts).
 */
function ProfessionalKnowledge() {
  const { data: knowledge, error } = useJsonData<Knowledge>("knowledge");
  // Fade the skill groups and experience cards in as they scroll into view
  const pageRef = useRevealOnScroll(".skill-group, .edu-card", [knowledge]);
  if (!knowledge) return <DataStatus error={error} />;

  // knowledge.json holds two lists: skill groups and work experience
  const { skillGroups, experience } = knowledge;

  return (
    <section ref={pageRef}>
      <h1>Professional Knowledge</h1>
      <p className="page-intro">
        The skills I have developed and the experience I have gained.
      </p>

      {/* ---------- Skills ---------- */}
      <h2 className="section-title">Skills</h2>
      <p className="page-hint">
        Tip: click a skill to see where I have used it.
      </p>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul className="skill-tags">
              {group.items.map((skill) => (
                <li className="skill-tag" key={skill}>
                  <Link
                    to={`/search?q=${encodeURIComponent(skill)}`}
                    className="skill-link"
                  >
                    {skill}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ---------- Experience ---------- */}
      {/* Reuses the Education card styles for a consistent look */}
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {experience.map((job) => (
          <article className="edu-card" key={job.role + job.organisation}>
            <span className="edu-years">{job.years}</span>
            <h2>{job.role}</h2>
            <p className="edu-institution">
              {job.organisation} · {job.location}
            </p>
            <ul className="edu-details">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* My GitHub projects have their own page (added after the walkthrough) */}
      <p className="page-hint">
        See my latest GitHub projects on the{" "}
        <Link to="/projects">Projects page</Link>.
      </p>
    </section>
  );
}

export default ProfessionalKnowledge;
