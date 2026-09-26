import education from "../data/education";

function Education() {
  return (
    <section>
      <h1>Education</h1>
      <p className="page-intro">
        My academic background and qualifications.
      </p>

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