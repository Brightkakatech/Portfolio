import { useState, useEffect } from "react";
import ContactLinks from "../components/messages/ContactLinks";
import MessageList from "../components/messages/MessageList";
import MessageInput from "../components/messages/MessageInput";
import Inbox from "../components/messages/Inbox";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../services/messages";
import { loadList, saveList } from "../services/storage";
import { isValidMessage } from "../services/validators";

// Name under which visitors' own sent messages are kept in their browser
const STORAGE_KEY = "chat-messages";

/**
 * Messages page: contact details, a form that sends messages privately to
 * the owner, and (for the owner only) the Inbox. Visitors see a copy of
 * their own sent messages, kept in their browser.
 */
function Messages() {
  const { isOwner } = useAuth();
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
   * Checks a new message, sends it to the owner, and keeps a copy here.
   * @param {string} name - The sender's name.
   * @param {string} text - The message.
   * @returns {Promise<boolean>} True if the message was sent.
   */
  async function handleSend(name, text) {
    if (!name.trim() || !text.trim()) {
      setNotice({
        type: "error",
        text: "Please enter your name and a message.",
      });
      return false;
    }

    const result = await sendMessage(name.trim(), text.trim());
    if (!result.ok) {
      setNotice({ type: "error", text: result.error });
      return false;
    }

    // Keep a copy so the visitor can see what they have sent.
    // If saving the copy fails, the message has still been sent.
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      time: new Date().toISOString(),
    };
    const updated = [...messages, newMessage];
    saveList(STORAGE_KEY, updated);
    setMessages(updated);

    setNotice({ type: "success", text: "Message sent. Thank you!" });
    return true;
  }

  // Removes the visitor's copy only; messages already sent are not affected
  function handleClear() {
    if (window.confirm("Remove your sent messages from this browser?")) {
      saveList(STORAGE_KEY, []);
      setMessages([]);
      setNotice({ type: "success", text: "Removed from this browser." });
    }
  }

  return (
    <section>
      <h1>Messages</h1>
      <p className="page-intro">
        Get in touch using my contact details, or send me a message below.
      </p>

      <h2 className="section-title">Contact details</h2>
      <ContactLinks />

      <h2 className="section-title">Send me a message</h2>
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
            Messages are sent privately to me. Only you can see your own
            messages here, in this browser.
          </p>
          {messages.length > 0 && (
            <button className="btn-delete" onClick={handleClear}>
              Clear from this browser
            </button>
          )}
        </div>
      </div>

      {isOwner && <Inbox />}
    </section>
  );
}

export default Messages;
