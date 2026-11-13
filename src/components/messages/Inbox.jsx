import { useEffect, useState } from "react";
import { watchInbox, deleteMessage } from "../../services/messages";
import { formatTime } from "../../utils/format";

/**
 * The owner's private inbox: every message visitors have sent, newest first.
 * It updates live while open. Only shown to the owner, and the security
 * rules stop anyone else reading the messages anyway.
 */
function Inbox() {
  const [messages, setMessages] = useState(null); // null until the first load
  const [error, setError] = useState("");

  // Start listening when the Inbox opens; watchInbox returns the function
  // that stops listening, which React calls when the Inbox closes
  useEffect(() => watchInbox(setMessages, setError), []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;
    const result = await deleteMessage(id);
    if (!result.ok) setError(result.error);
  }

  return (
    <div className="inbox">
      <h2 className="section-title">Inbox</h2>

      {error && (
        <p className="notice notice-error" role="alert">
          {error}
        </p>
      )}

      {messages === null ? (
        <p className="chat-empty">Loading messages…</p>
      ) : messages.length === 0 ? (
        <p className="chat-empty">No messages yet.</p>
      ) : (
        messages.map((message) => (
          <article className="chat-bubble" key={message.id}>
            <p className="chat-meta">
              <strong>{message.name}</strong> · {formatTime(message.time)}
            </p>
            <p className="chat-text">{message.text}</p>
            <button
              className="btn-delete"
              onClick={() => handleDelete(message.id)}
            >
              Delete
            </button>
          </article>
        ))
      )}
    </div>
  );
}

export default Inbox;
