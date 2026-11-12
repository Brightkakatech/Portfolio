import { useState } from "react";
import { loadList, saveList } from "../services/storage";
import { isValidPost } from "../services/validators";
import starterPosts from "../data/posts";

// Name under which posts are saved in the browser
const STORAGE_KEY = "blog-posts";

// Turns "2026-09-28" into "28 September 2026"
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Blog() {
  const [posts, setPosts] = useState(() =>
    loadList(STORAGE_KEY, isValidPost, starterPosts),
  );
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Runs when the form is submitted
  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading

    // Ignore empty posts
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(), // unique number based on the current time
      title: title.trim(),
      date: new Date().toISOString().slice(0, 10), // today, e.g. 2026-09-28
      content: content.trim(),
    };

    const updated = [newPost, ...posts]; // newest post first

    if (!saveList(STORAGE_KEY, updated)) {
      setError("The post could not be saved in this browser.");
      return;
    }

    setError("");
    setPosts(updated);

    setTitle("");
    setContent("");
  }

  // Removes the post with the matching id
  function handleDelete(id) {
    const updated = posts.filter((post) => post.id !== id);
    saveList(STORAGE_KEY, updated);
    setPosts(updated);
  }

  return (
    <section>
      <h1>Blog</h1>
      <p className="page-intro">Thoughts, lessons and updates.</p>

      {/* ---------- Write a new post ---------- */}
      <form className="blog-form" onSubmit={handleSubmit}>
        <h2>Write a post</h2>

        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Post title"
        />

        <label htmlFor="post-content">Post</label>
        <textarea
          id="post-content"
          rows="5"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your post here..."
        />

        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </form>

      {error && (
        <p className="notice notice-error" role="alert">
          {error}
        </p>
      )}

      {/* ---------- List of posts ---------- */}
      <div className="blog-list">
        {posts.length === 0 ? (
          <p className="page-intro">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <article className="blog-post" key={post.id}>
              <h2>{post.title}</h2>
              <p className="blog-date">{formatDate(post.date)}</p>
              <p className="blog-content">{post.content}</p>
              <button
                className="btn-delete"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Blog;
