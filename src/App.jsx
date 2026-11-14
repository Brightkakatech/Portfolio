import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy loading: each page's code is downloaded only when the page is first
// opened, so the first visit is faster. The Blog and Messages pages also
// bring in the database code, which other pages never need.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const ProfessionalKnowledge = lazy(
  () => import("./pages/ProfessionalKnowledge"),
);
const PictureGallery = lazy(() => import("./pages/PictureGallery"));
const VideoGallery = lazy(() => import("./pages/VideoGallery"));
const Blog = lazy(() => import("./pages/Blog"));
const Messages = lazy(() => import("./pages/Messages"));
const Readme = lazy(() => import("./pages/Readme"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Search = lazy(() => import("./pages/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Root component: the shared layout (Navbar, current page, Footer) and the routes.
 * HashRouter is used because GitHub Pages only serves static files. With
 * "#/about" style addresses, refreshing a page never asks the server for a
 * file that does not exist, so visitors never see GitHub's 404 page.
 * Suspense shows "Loading…" for the moment a page's code is downloading.
 */
function App() {
  return (
    <HashRouter>
      {/* The wrapper lets the footer sit at the bottom of the screen */}
      <div className="app">
        <Navbar />
        <main>
          <Suspense fallback={<p className="page-intro">Loading…</p>}>
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
              <Route path="/search" element={<Search />} />
              {/* Any other address shows the 404 page; this must stay last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
