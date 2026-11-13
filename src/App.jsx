import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import ProfessionalKnowledge from "./pages/ProfessionalKnowledge";
import PictureGallery from "./pages/PictureGallery";
import VideoGallery from "./pages/VideoGallery";
import Blog from "./pages/Blog";
import Messages from "./pages/Messages";
import Readme from "./pages/Readme";
import SignIn from "./pages/SignIn";

/**
 * Root component: the shared layout (Navbar, current page, Footer) and the routes.
 * HashRouter is used because GitHub Pages only serves static files. With
 * "#/about" style addresses, refreshing a page never asks the server for a
 * file that does not exist, so visitors never see GitHub's 404 page.
 */

function App() {
  return (
    <HashRouter>
      {/* The wrapper lets the footer sit at the bottom of the screen */}
      <div className="app">
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
            <Route path="/readme" element={<Readme />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
