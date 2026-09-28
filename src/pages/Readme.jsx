import Markdown from "react-markdown";
// "?raw" tells Vite to load the file's text exactly as it is written
import readmeText from "../../README.md?raw";

function Readme() {
  return (
    <section className="readme">
      <Markdown>{readmeText}</Markdown>
    </section>
  );
}

export default Readme;