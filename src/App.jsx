import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import ProfessionalKnowledge from "./pages/ProfessionalKnowledge";
import PictureGallery from "./pages/PictureGallery";
import VideoGallery from "./pages/VideoGallery";
import Blog from "./pages/Blog";
import Messages from "./pages/Messages";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/knowledge" element={<ProfessionalKnowledge />} />
          <Route path="/pictures" element={<PictureGallery />} />
          <Route path="/videos" element={<VideoGallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;