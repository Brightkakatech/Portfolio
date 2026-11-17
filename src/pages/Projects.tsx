import GitHubRepos from "../components/GitHubRepos";

/**
 * Projects page: my latest GitHub projects, loaded live from the GitHub API,
 * with the language filter. Added after the walkthrough, where two testers
 * looked for a Projects link in the menu and could not find one (they were
 * only at the bottom of Professional Knowledge).
 */
function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <p className="page-intro">
        My latest work on GitHub, updated automatically. Pick a language to
        filter, or open a project to see its code.
      </p>
      <GitHubRepos />
    </section>
  );
}

export default Projects;
