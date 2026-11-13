import { useState, useEffect } from "react";
import ContactLinks from "../components/messages/ContactLinks";
import MessageList from "../components/messages/MessageList";
import MessageInput from "../components/messages/MessageInput";
import { loadList, saveList } from "../services/storage";
import { isValidMessage } from "../services/validators";

// Name under which chat messages are saved in the browser
const STORAGE_KEY = "chat-messages";

/**
 * Messages page: contact details and a simple chat.
 * This page owns the message list and the notices; the child
 * components only display information or collect input.
 */
function Messages() {
  const [messages, setMessages] = useState(() =>
    loadList(STORAGE_KEY, isValidMessage),
  );
  const [notice, setNotice] = useState(null);

  // Hide the notice automatically after 3 seconds
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  /**
   * Checks and saves a new message.
   * @param {string} name - The sender's name.
   * @param {string} text - The message.
   * @returns {boolean} True if the message was saved.
   */
  function handleSend(name, text) {
    if (!name.trim() || !text.trim()) {
      setNotice({
        type: "error",
        text: "Please enter your name and a message.",
      });
      return false;
    }

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      time: new Date().toISOString(),
    };
    const updated = [...messages, newMessage]; // newest message last

    if (!saveList(STORAGE_KEY, updated)) {
      setNotice({ type: "error", text: "Your message could not be saved." });
      return false;
    }

    setMessages(updated);
    setNotice({ type: "success", text: "Message saved in this browser." });
    return true;
  }

  // Deletes the whole conversation after asking for confirmation
  function handleClear() {
    if (window.confirm("Clear the whole conversation?")) {
      saveList(STORAGE_KEY, []);
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

      <h2 className="section-title">Contact details</h2>
      <ContactLinks />

      <h2 className="section-title">Instant messaging</h2>
      <div className="chat">
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />

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
