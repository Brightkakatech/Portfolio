import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { watchPosts, publishPost, deletePost } from "../services/posts";
import { formatDate } from "../utils/format";

/**
 * Community blog. Everyone can read the posts; signed-in users with a
 * verified email can publish. Authors can delete their own posts and the
 * owner can delete any. firestore.rules enforces the same rules on the server.
 */
function Blog() {
  const { user, isOwner } = useAuth();
  const [posts, setPosts] = useState(null); // null until the first load
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);

  // Listen for posts while the page is open, so new posts appear live
  useEffect(() => watchPosts(setPosts, setError), []);

  // Only signed-in users with a verified email may write
  const canWrite = user?.emailVerified;

  // Runs when the form is submitted: publishes the post unless the title or text is empty
  async function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading, so React can handle the post instead

    // Ignore empty posts
    if (!title.trim() || !content.trim()) return;

    setPublishing(true);
    const result = await publishPost(title.trim(), content.trim());
    setPublishing(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    setTitle("");
    setContent("");
  }

  // Authors may delete their own posts; the owner may delete any
  function canDelete(post) {
    return isOwner || post.authorId === user?.uid;
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    const result = await deletePost(id);
    if (!result.ok) setError(result.error);
  }

  return (
    <section>
      <h1>Blog</h1>
      <p className="page-intro">Thoughts, lessons and updates.</p>

      {/* ---------- Write a new post (signed-in, verified users only) ---------- */}
      {canWrite ? (
        <form className="blog-form" onSubmit={handleSubmit}>
          <h2>Write a post</h2>

          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Post title"
            maxLength={150}
          />

          <label htmlFor="post-content">Post</label>
          <textarea
            id="post-content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your post here..."
            maxLength={10000}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={publishing}
          >
            {publishing ? "Publishing…" : "Publish"}
          </button>
        </form>
      ) : (
        <p className="page-intro">
          <Link to="/signin">{user ? "Verify your email" : "Sign in"}</Link> to
          write a post.
        </p>
      )}

      {error && (
        <p className="notice notice-error" role="alert">
          {error}
        </p>
      )}

      {/* ---------- List of posts ---------- */}
      <div className="blog-list">
        {posts === null ? (
          <p className="page-intro">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="page-intro">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <article className="blog-post" key={post.id}>
              <h2>{post.title}</h2>
              <p className="blog-date">
                {formatDate(post.date)} · {post.authorName}
              </p>
              <p className="blog-content">{post.content}</p>
              {canDelete(post) && (
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Blog;
