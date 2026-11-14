import { useJsonData } from "../hooks/useJsonData";
import { useRevealOnScroll } from "../hooks/useAnimations";
import DataStatus from "../components/DataStatus";

/**
 * Education page: one card per qualification, read from data/education.json.
 * Cards fade in as they scroll into view.
 */
function Education() {
  const { data: education, error } = useJsonData("education");
  // Fade each card in as it scrolls into view (runs again once the data arrives)
  const listRef = useRevealOnScroll(".edu-card", [education]);
  if (!education) return <DataStatus error={error} />;

  return (
    <section ref={listRef}>
      <h1>Education</h1>
      <p className="page-intro">My academic background and qualifications.</p>

      <div className="timeline">
        {/* Build one card for each item in the education list */}
        {education.map((item) => (
          <article className="edu-card" key={item.qualification}>
            <span className="edu-years">{item.years}</span>
            <h2>{item.qualification}</h2>
            <p className="edu-institution">
              {item.institution} · {item.location}
            </p>

            {/* Only show the details list if this item has details */}
            {item.details && (
              <ul className="edu-details">
                {item.details.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
