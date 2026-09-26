import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/education">Education</NavLink>
      <NavLink to="/knowledge">Professional Knowledge</NavLink>
      <NavLink to="/pictures">Pictures</NavLink>
      <NavLink to="/videos">Videos</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/messages">Messages</NavLink>
    </nav>
  );
}

export default Navbar;