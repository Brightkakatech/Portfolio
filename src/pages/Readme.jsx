import Markdown from "react-markdown";
// "?raw" tells Vite to load the file's text exactly as it is written
import readmeText from "../../README.md?raw";

/**
 * Shows the project's README.md as a web page, so the README on GitHub and
 * the README page on the site always come from the same file.
 */

function Readme() {
  return (
    <section className="readme">
      <Markdown>{readmeText}</Markdown>
    </section>
  );
}

export default Readme;
