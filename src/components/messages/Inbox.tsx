import { useEffect, useState } from "react";
import { watchInbox, deleteMessage } from "../../services/messages";
import { formatTime } from "../../utils/format";
import { buildReplyLink } from "../../utils/contact";
import type { InboxMessage } from "../../types";

/**
 * The owner's private inbox: every message visitors have sent, newest first.
 * It updates live while open. Messages that include an email address get a
 * "Reply by email" button that opens the owner's email app. Only shown to the owner, and the security
 * rules stop anyone else reading the messages anyway.
 */
function Inbox() {
  const [messages, setMessages] = useState<InboxMessage[] | null>(null); // null until the first load
  const [error, setError] = useState("");

  // Start listening when the Inbox opens; watchInbox returns the function
  // that stops listening, which React calls when the Inbox closes
  useEffect(() => watchInbox(setMessages, setError), []);

  async function handleDelete(id: string) {
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
        messages.map((message) => {
          // A reply link only exists if the visitor left an email address
          const replyLink = buildReplyLink(message);

          return (
            <article className="inbox-item" key={message.id}>
              <p className="chat-meta">
                <strong>{message.name}</strong>
                {message.email && <> · {message.email}</>} ·{" "}
                {formatTime(message.time)}
              </p>
              <p className="chat-text">{message.text}</p>
              <div className="inbox-actions">
                {replyLink && (
                  <a className="btn-reply" href={replyLink}>
                    Reply by email
                  </a>
                )}
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}

export default Inbox;
