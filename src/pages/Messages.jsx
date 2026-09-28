import { useState, useEffect, useRef } from "react";
import contact from "../data/contact";

// Name under which chat messages are saved in the browser
const STORAGE_KEY = "chat-messages";

// Load saved messages if there are any; otherwise start empty
function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Turns a saved time into e.g. "28 Sept, 14:05"
function formatTime(time) {
  return new Date(time).toLocaleString("en-IE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Messages() {
  const [messages, setMessages] = useState(loadMessages);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [notice, setNotice] = useState(null);

  // A direct handle on the message list, used for auto-scrolling
  const listRef = useRef(null);

  // Save messages to the browser whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll to the newest message whenever the list changes
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  // Hide the notice automatically after 3 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  // Runs when Send is clicked or Enter is pressed
  function handleSend(event) {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      setNotice({ type: "error", text: "Please enter your name and a message." });
      return;
    }

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      time: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]); // newest message last, like a chat
    setText(""); // clear the message box but keep the name
    setNotice({ type: "success", text: "Message sent." });
  }

  // Deletes the whole conversation after asking for confirmation
  function handleClear() {
    if (window.confirm("Clear the whole conversation?")) {
      setMessages([]);
      setNotice({ type: "success", text: "Conversation cleared." });
    }
  }

  return (
    <section>
      <h1>Messages</h1>
      <p className="page-intro">
        Get in touch using my contact details, or leave a message below.
      </p>

      {/* ---------- Contact details ---------- */}
      <h2 className="section-title">Contact details</h2>
      <div className="contact-grid">
        {contact.email && (
          <a className="contact-card" href={`mailto:${contact.email}`}>
            <span className="contact-label">Email</span>
            <span className="contact-value">{contact.email}</span>
          </a>
        )}
        {contact.github && (
          <a
            className="contact-card"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-label">GitHub</span>
            <span className="contact-value">View my repositories</span>
          </a>
        )}
        {contact.linkedin && (
          <a
            className="contact-card"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-label">LinkedIn</span>
            <span className="contact-value">View my profile</span>
          </a>
        )}
      </div>

      {/* ---------- Instant messaging ---------- */}
      <h2 className="section-title">Instant messaging</h2>
      <div className="chat">
        <div className="chat-messages" ref={listRef}>
          {messages.length === 0 ? (
            <p className="chat-empty">No messages yet. Say hello!</p>
          ) : (
            messages.map((message) => (
              <div className="chat-bubble" key={message.id}>
                <p className="chat-meta">
                  <strong>{message.name}</strong> · {formatTime(message.time)}
                </p>
                <p className="chat-text">{message.text}</p>
              </div>
            ))
          )}
        </div>

        <form className="chat-form" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            aria-label="Your name"
          />
          <input
            type="text"
            className="chat-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type a message and press Enter"
            aria-label="Message"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>

        {notice && (
          <p className={`notice notice-${notice.type}`} role="status">
            {notice.text}
          </p>
        )}

        <div className="chat-footer">
          <p className="chat-note">
            Messages are currently stored in this browser only.
          </p>
          {messages.length > 0 && (
            <button className="btn-delete" onClick={handleClear}>
              Clear conversation
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Messages;