import { useJsonData } from "../hooks/useJsonData";
import DataStatus from "../components/DataStatus";
import GitHubRepos from "../components/GitHubRepos";

/**
 * Skills and experience, read from data/knowledge.json. Reuses the Education
 * card styles so both pages look consistent.
 */
function ProfessionalKnowledge() {
  const { data: knowledge, error } = useJsonData("knowledge");
  if (!knowledge) return <DataStatus error={error} />;

  // knowledge.json holds two lists: skill groups and work experience
  const { skillGroups, experience } = knowledge;

  return (
    <section>
      <h1>Professional Knowledge</h1>
      <p className="page-intro">
        The skills I have developed and the experience I have gained.
      </p>

      {/* ---------- Skills ---------- */}
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul className="skill-tags">
              {group.items.map((skill) => (
                <li className="skill-tag" key={skill}>
                  {skill}
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
      {/* ---------- Live projects from the GitHub API ---------- */}
      <GitHubRepos />
    </section>
  );
}

export default ProfessionalKnowledge;
